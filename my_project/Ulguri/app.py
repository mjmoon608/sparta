from flask import Flask, render_template, jsonify, request
import requests
from pymongo import MongoClient
import face

from werkzeug.utils import secure_filename

import boto3

s3_resource = boto3.resource( 
				's3', 
                aws_access_key_id="AKIASNGD6WI5QZW5XYP6", 
                aws_secret_access_key="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", 
                region_name="ap-northeast-2", 
) 

bucket_name = 'ulguri'
region = "ap-northeast-2"

img_cnt = 0


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
    global img_cnt
    img_cnt += 1
    # user_img_file =  requests.data.files
    #  requests.data.files
    # user_img_file = request.form['img']
    # print(user_img_file)
    user_img = request.files.get('img')
    user_name = request.form.get('name')
    user_age = request.form.get('age')
    # print(user_name, user_age)
    


    # user_img = request.data
    # print(type(user_img))

    image_name = str(user_name) + str(user_age) + ".jpg"

    data = user_img

    s3_resource.Bucket(bucket_name).put_object(Body=data, Key=image_name, ACL='public-read') 

    # get public image url 
    url = "https://s3-%s.amazonaws.com/%s/%s" % (region, bucket_name, image_name)


    anal_result = face.analyze(url)
    return jsonify({'result': anal_result})



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

