from flask import Flask, request, jsonify
from flask_cors import CORS
from OCR import process_image

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "here!"


@app.route("/upload", methods=["POST"])
def upload():
    print("Recieved /upload from ", request.remote_addr)
    f = request.files['photo']

    try:
        price_lines = process_image(f)
        return jsonify({'data': price_lines}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
