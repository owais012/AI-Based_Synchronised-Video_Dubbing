from flask import Flask, request, jsonify, send_file
from werkzeug.utils import secure_filename
from model.model import dub_audio
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
OUTPUT_FOLDER = 'dubbed_output/'
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg', 'm4a'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER

# Helper function for checking file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle audio dubbing
@app.route('/dub-audio', methods=['POST'])
def dub_audio_route():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part in the request"}), 400

    file = request.files['audio']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_audio_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(input_audio_path)

        # Call AI dubbing model
        dubbed_audio_path = dub_audio(input_audio_path, app.config['OUTPUT_FOLDER'])

        return send_file(dubbed_audio_path, as_attachment=True, download_name=f"dubbed_{filename}")

    return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    app.run(debug=True)
