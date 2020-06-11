from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

# opencv-python pillow numpy bs4 requsts flask pymongo

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbulguri



@app.route('/')
def home():
    return render_template('index.html')



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

