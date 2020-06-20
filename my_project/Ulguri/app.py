from flask import Flask, render_template, jsonify, request
import requests
from pymongo import MongoClient
import face

from werkzeug.utils import secure_filename

# opencv-python pillow numpy bs4 requsts flask pymongo



user_img_path = ''


app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbulguri




@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze():
    global user_img_path
    # user_img_file =  requests.data.files
    #  requests.data.files
    # user_img_file = request.form['img']
    # print(user_img_file)
    user_img = request.files.get('img')
    # user_img = request.data
    # print(type(user_img))

    anal_result = face.analyze()
    return jsonify({'result': anal_result})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

