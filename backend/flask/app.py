from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "here!"


@app.route("/upload", methods=["POST"])
def upload():
    print(request.files.keys())
    f = request.files['photo']
    f.save('image.jpg')
    return jsonify({'data': 'ok'}), 200
