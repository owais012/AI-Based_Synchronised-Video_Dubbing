import os
import yt_dlp
from moviepy.editor import VideoFileClip
from transformers import pipeline, AutoModelForSeq2SeqLM, BitsAndBytesConfig, AutoTokenizer
from gtts import gTTS
from IPython.display import Audio, display
from jiwer import wer
import sacrebleu
import torch
from IndicTransToolkit.IndicTransToolkit.processor import IndicProcessor

BATCH_SIZE = 4
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
quantization = None

def download_youtube_video(youtube_url, output_path="input"):
    # Create input folder if it doesn't exist
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    # Get the next available audio filename in input folder (audio1.wav, audio2.wav, etc.)
    audio_files = [f for f in os.listdir(output_path) if f.endswith('.wav')]
    next_audio_number = len(audio_files) + 1
    audio_filename = f"audio{next_audio_number}"
    audio_file_path = os.path.join(output_path, audio_filename)

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': audio_file_path,
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'socket_timeout': 60
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(youtube_url, download=True)
        audio_file = ydl.prepare_filename(info_dict).replace('.webm', '.wav').replace('.m4a', '.wav')
    return audio_file

def get_asr_output(audio_file):
    whisper = pipeline("automatic-speech-recognition", model="openai/whisper-medium", device=DEVICE)
    asr_output = whisper(audio_file, return_timestamps=True)
    return asr_output['text']

def initialize_model_and_tokenizer(ckpt_dir, quantization):
    if quantization == "4-bit":
        qconfig = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_compute_dtype=torch.bfloat16,
        )
    elif quantization == "8-bit":
        qconfig = BitsAndBytesConfig(
            load_in_8bit=True,
            bnb_8bit_use_double_quant=True,
            bnb_8bit_compute_dtype=torch.bfloat16,
        )
    else:
        qconfig = None

    tokenizer = AutoTokenizer.from_pretrained(ckpt_dir, trust_remote_code=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(
        ckpt_dir,
        trust_remote_code=True,
        low_cpu_mem_usage=True,
        quantization_config=qconfig,
    )

    if qconfig is None:
        model = model.to(DEVICE)
        if DEVICE == "cuda":
            model.half()

    model.eval()

    return tokenizer, model

def batch_translate(input_sentences, src_lang, tgt_lang, model, tokenizer, ip):
    translations = []
    for i in range(0, len(input_sentences), BATCH_SIZE):
        batch = input_sentences[i : i + BATCH_SIZE]
        batch = ip.preprocess_batch(batch, src_lang=src_lang, tgt_lang=tgt_lang)

        inputs = tokenizer(
            batch,
            truncation=True,
            padding="longest",
            return_tensors="pt",
            return_attention_mask=True,
        ).to(DEVICE)

        with torch.no_grad():
            generated_tokens = model.generate(
                **inputs,
                use_cache=True,
                min_length=0,
                max_length=256,
                num_beams=5,
                num_return_sequences=1,
            )

        with tokenizer.as_target_tokenizer():
            generated_tokens = tokenizer.batch_decode(
                generated_tokens.detach().cpu().tolist(),
                skip_special_tokens=True,
                clean_up_tokenization_spaces=True,
            )

        translations += ip.postprocess_batch(generated_tokens, lang=tgt_lang)
        del inputs
        torch.cuda.empty_cache()

    return translations

if _name_ == "_main_":
    # Download the video and extract audio
    audio_file = download_youtube_video('https://www.youtube.com/watch?v=1aA1WGON49E', output_path='input')
    audio_file = audio_file + '.wav'
    print(audio_file)
    # Get ASR output
    asr_text = get_asr_output(audio_file)
    print(asr_text)

    # Initialize IndicTrans model and translate ASR output
    en_indic_ckpt_dir = "ai4bharat/indictrans2-en-indic-1B"
    en_indic_tokenizer, en_indic_model = initialize_model_and_tokenizer(en_indic_ckpt_dir, quantization)

    ip = IndicProcessor(inference=True)
    en_sents = [asr_text]
    src_lang, tgt_lang = "eng_Latn", "hin_Deva"
    hi_translations = batch_translate(en_sents, src_lang, tgt_lang, en_indic_model, en_indic_tokenizer, ip)
    print(f"\n{src_lang} - {tgt_lang}")
    for input_sentence, translation in zip(en_sents, hi_translations):
        print(f"{src_lang}: {input_sentence}")
        print(f"{tgt_lang}: {translation}")

    # Save IndicTrans translation to audio in the output folder
    if not os.path.exists("output"):
        os.makedirs("output")
        
    # Get the next available number for output audio file
    output_files = [f for f in os.listdir("output") if f.endswith('.mp3')]
    next_output_number = len(output_files) + 1
    output_filename = f"audio{next_output_number}.mp3"
    output_file_path = os.path.join("output", output_filename)

    result = ' '.join(hi_translations)
    tts = gTTS(result, lang='hi')
    tts.save(output_file_path)
    display(Audio(output_file_path))

    # Free the GPU memory
    del en_indic_tokenizer, en_indic_model