# https://www.youtube.com/watch?v=8bkXRWHbz6I
from flask import Flask, request, jsonify, send_from_directory, url_for
from model import process_video
import os
import traceback
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/dub-video": {"origins": "http://localhost:5173"}})
CORS(app, resources={r"/static/*": {"origins": "http://localhost:5173"}})

# Define the static folder path
STATIC_FOLDER = "AI-Based_Synchronised-Video_Dubbing/flask-api/model/static"
VIDEOS_FOLDER = os.path.join(STATIC_FOLDER, "videos")
os.makedirs(VIDEOS_FOLDER, exist_ok=True)  # Ensure the videos folder exists

@app.route('/dub-video', methods=['OPTIONS'])
def options():
    response = jsonify({"status": "OK"})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

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
        output_filename = process_video(youtube_url, src_lang, tgt_lang, start=start, end=end)
        output_filepath = os.path.join(VIDEOS_FOLDER, output_filename)

        # Save the processed video file to the static/videos folder
        if not os.path.exists(output_filepath):
            return jsonify({"error": f"File not found: {output_filepath}"}), 500

        # Generate the public URL for the video usin    g Flask's default static file serving
        video_url = url_for('static', filename='videos/' + output_filename, _external=True)
        print(video_url)
        return jsonify({"message": "Translation and dubbing complete.", "video_url": video_url})

    except Exception as e:
        error_message = traceback.format_exc()  # Capture full traceback
        print(error_message)  # Log traceback for debugging
        return jsonify({"error": str(e), "details": error_message}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
