import os
import yt_dlp 
from moviepy.editor import VideoFileClip
from googletrans import Translator
from transformers import pipeline
from gtts import gTTS
from jiwer import wer
import torch
from IPython.display import Audio, display
from IndicTransToolkit import IndicProcessor
from transformers import AutoModelForSeq2SeqLM, BitsAndBytesConfig, AutoTokenizer

BATCH_SIZE = 4
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
translator = Translator()

def download_youtube_video(youtube_url, output_path="output"):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(youtube_url, download=True)
        audio_file = ydl.prepare_filename(info_dict).replace('.webm', '.wav').replace('.m4a', '.wav')

    return audio_file

def translate_text_google(text, src_lang, dest_lang):
    translated = translator.translate(text, src=src_lang, dest=dest_lang)
    return translated.text

def get_asr_output(audio_file):
    whisper = pipeline("automatic-speech-recognition", model="openai/whisper-medium", device=DEVICE)
    asr_output = whisper(audio_file)['text']
    return asr_output

def show_translation_google(asr_output, source_lang, target_lang):
    if source_lang != target_lang:
        translated_text = translate_text_google(asr_output, src_lang=source_lang, dest_lang=target_lang)
        print(f"Translated to {target_lang}: {translated_text}")
    else:
        translated_text = asr_output
    return translated_text

def initialize_model_and_tokenizer(ckpt_dir, quantization=None):
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
        batch = input_sentences[i: i + BATCH_SIZE]

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

def main():
    youtube_url = 'https://www.youtube.com/watch?v=XALBGkjkUPQ'
    audio_file = download_youtube_video(youtube_url, output_path='output')

    # ASR Output (Transcription)
    asr_text = get_asr_output(audio_file)
    print(f"ASR Output: {asr_text}")

    # Google Translate Output
    translated_text_hi_google = show_translation_google(asr_text, 'en', 'hi')
    tts = gTTS(translated_text_hi_google, lang='hi')
    tts.save("outputhi.mp3")
    display(Audio("outputhi.mp3"))

    # IndicTrans Model Translation
    en_indic_ckpt_dir = "ai4bharat/indictrans2-en-indic-1B"
    en_indic_tokenizer, en_indic_model = initialize_model_and_tokenizer(en_indic_ckpt_dir)

    ip = IndicProcessor(inference=True)
    en_sents = [asr_text]
    src_lang, tgt_lang = "eng_Latn", "hin_Deva"
    hi_translations = batch_translate(en_sents, src_lang, tgt_lang, en_indic_model, en_indic_tokenizer, ip)

    print(f"\n{src_lang} - {tgt_lang}")
    for input_sentence, translation in zip(en_sents, hi_translations):
        print(f"{src_lang}: {input_sentence}")
        print(f"{tgt_lang}: {translation}")

    # Save the IndicTrans model's output
    result = ' '.join(hi_translations)
    tts = gTTS(result, lang='hi')
    tts.save("outputhi2.mp3")
    display(Audio("outputhi2.mp3"))

if __name__ == "__main__":
    main()
