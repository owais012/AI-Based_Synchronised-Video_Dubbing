# app.py
from flask import Flask, request, jsonify
from model import process_video

app = Flask(__name__)

@app.route('/dub-video', methods=['POST'])
def dub_video():
    try:
        data = request.json
        youtube_url = data.get('youtube_url')
        src_lang = data.get('src_lang')
        tgt_lang = data.get('tgt_lang')

        if not youtube_url or not src_lang or not tgt_lang:
            return jsonify({"error": "Missing parameters. Provide 'youtube_url', 'src_lang', and 'tgt_lang'."}), 400

        output_file = process_video(youtube_url, src_lang, tgt_lang)
        return jsonify({"message": "Translation and dubbing complete.", "output_file": output_file})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
