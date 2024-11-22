import os
import yt_dlp
from transformers import pipeline, AutoModelForSeq2SeqLM, BitsAndBytesConfig, AutoTokenizer
from gtts import gTTS
import torch
from IndicTransToolkit.IndicTransToolkit.processor import IndicProcessor
import ffmpeg

# Constants
BATCH_SIZE = 4
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
quantization = None

# Paths
INPUT_AUDIO_PATH = "input_audio"
INPUT_VIDEO_PATH = "input_video"
OUTPUT_AUDIO_PATH = "output_audio"
OUTPUT_VIDEO_PATH = "output_video"

# Create directories if not exist
for path in [INPUT_AUDIO_PATH, INPUT_VIDEO_PATH, OUTPUT_AUDIO_PATH, OUTPUT_VIDEO_PATH]:
    if not os.path.exists(path):
        os.makedirs(path)


def download_youtube_audio(youtube_url):
    audio_filename = "audio"  # Constant filename
    input_audio_path = os.path.join(INPUT_AUDIO_PATH, audio_filename)
    print(input_audio_path, "hellooooo")

    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': input_audio_path,  # Save in the input_audio folder
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'socket_timeout': 60
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([youtube_url])
    print(input_audio_path, "hellooooo")

    audio_filename = "audio.wav"  # Constant filename
    input_audio_path = os.path.join(INPUT_AUDIO_PATH, audio_filename)
    print(input_audio_path, "hellooooo")

    return input_audio_path  # Return the full path to the file




def get_asr_output(audio_file):
    whisper = pipeline("automatic-speech-recognition", model="openai/whisper-medium", device=DEVICE)
    asr_output = whisper(audio_file, return_timestamps=True)
    return asr_output['text']


def initialize_model_and_tokenizer(ckpt_dir, quantization):
    if quantization == "4-bit":
        qconfig = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_compute_dtype=torch.bfloat16)
    elif quantization == "8-bit":
        qconfig = BitsAndBytesConfig(load_in_8bit=True, bnb_8bit_compute_dtype=torch.bfloat16)
    else:
        qconfig = None

    tokenizer = AutoTokenizer.from_pretrained(ckpt_dir, trust_remote_code=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(
        ckpt_dir, trust_remote_code=True, low_cpu_mem_usage=True, quantization_config=qconfig
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
        batch = input_sentences[i:i+BATCH_SIZE]
        batch = ip.preprocess_batch(batch, src_lang=src_lang, tgt_lang=tgt_lang)

        inputs = tokenizer(
            batch,
            truncation=True,
            padding="longest",
            return_tensors="pt"
        ).to(DEVICE)

        with torch.no_grad():
            generated_tokens = model.generate(**inputs, num_beams=5, max_length=256)

        with tokenizer.as_target_tokenizer():
            generated_tokens = tokenizer.batch_decode(generated_tokens, skip_special_tokens=True)

        translations += ip.postprocess_batch(generated_tokens, lang=tgt_lang)
        torch.cuda.empty_cache()

    return translations


def lipsync(input_video_path, input_audio_path):
    if not os.path.isfile('AI-Based_Synchronised-Video_Dubbing/flask-api/model/Wav2Lip/checkpoints/wav2lip_gan.pth'):
        raise FileNotFoundError("Wav2Lip model checkpoint not found.")
    os.system(
        f'python AI-Based_Synchronised-Video_Dubbing/flask-api/model/Wav2Lip/inference.py --checkpoint_path "AI-Based_Synchronised-Video_Dubbing/flask-api/model/Wav2Lip/checkpoints/wav2lip_gan.pth" '
        f'--face "{input_video_path}" --audio "{input_audio_path}" --nosmooth --resize_factor 1'
    )
    

def download_and_trim_video(youtube_url, start, end):
    trimmed_video_filename = "video.mp4"  # Constant filename
    output_video_path = os.path.join(INPUT_VIDEO_PATH, trimmed_video_filename)

    # Download video
    os.system(f'yt-dlp -f "bestvideo[ext=mp4]" --output "youtube.mp4" {youtube_url}')

    # Trim the video
    interval = end - start
    os.system(f'ffmpeg -y -i youtube.mp4 -ss {start} -t {interval} -async 1 {output_video_path}')

    return output_video_path


def process_video(youtube_url, src_lang, tgt_lang, start, end):
    # Download and trim video
    input_audio_path = download_youtube_audio(youtube_url)
    

    input_video_path = download_and_trim_video(youtube_url, start, end)

    # Get ASR output
    asr_text = get_asr_output(input_audio_path)

    # Translate ASR output
    en_indic_ckpt_dir = "ai4bharat/indictrans2-en-indic-1B"
    en_indic_tokenizer, en_indic_model = initialize_model_and_tokenizer(en_indic_ckpt_dir, quantization)
    ip = IndicProcessor(inference=True)
    translations = batch_translate([asr_text], src_lang, tgt_lang, en_indic_model, en_indic_tokenizer, ip)

    # Generate translated audio
    translated_audio_filename = f"audio_translated.mp3"
    output_audio_path = os.path.join(OUTPUT_AUDIO_PATH, translated_audio_filename)
    tts = gTTS(' '.join(translations), lang='hi')  # Change `lang` for other target languages
    tts.save(output_audio_path)
    print(input_video_path, output_audio_path)
    # Perform lip-sync with translated audio
    lipsync(input_video_path, output_audio_path)

    # Move final lip-synced video to output directory
    result_video_path = 'AI-Based_Synchronised-Video_Dubbing/flask-api/model/Wav2Lip/results/result_voice.mp4'
    # os.rename("AI-Based_Synchronised-Video_Dubbing/flask-api/model/Wav2Lip/results/result_voice.mp4", result_video_path)

    return result_video_path  
