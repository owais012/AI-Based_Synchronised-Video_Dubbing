from flask import Flask, request, jsonify
from model import process_video
import traceback

app = Flask(__name__)

@app.route('/dub-video', methods=['POST'])
def dub_video():
    try:
        data = request.json
        youtube_url = data.get('youtube_url')
        src_lang = data.get('src_lang')
        tgt_lang = data.get('tgt_lang')
        start = data.get('start')
        end = data.get('end')

        # Validate input
        if not youtube_url or not src_lang or not tgt_lang:
            return jsonify({"error": "Missing parameters. Provide 'youtube_url', 'src_lang', and 'tgt_lang'."}), 400
        if start is None or end is None:
            return jsonify({"error": "Missing parameters. Provide 'start' and 'end' times."}), 400
        if not isinstance(start, (int, float)) or not isinstance(end, (int, float)) or start >= end:
            return jsonify({"error": "Invalid 'start' or 'end' time. Ensure they are numbers and 'start' < 'end'."}), 400

        # Process video
        output_file = process_video(youtube_url, src_lang, tgt_lang, start=start, end=end)
        return jsonify({"message": "Translation and dubbing complete.", "output_file": output_file})

    except Exception as e:
        error_message = traceback.format_exc()  # Capture full traceback
        print(error_message)  # Log traceback for debugging
        return jsonify({"error": str(e), "details": error_message}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
