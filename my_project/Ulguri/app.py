import os
import sys
import requests
from cv2 import cv2
from PIL import Image

client_id = "YOUR_CLIENT_ID"
client_secret = "YOUR_CLIENT_SECRET"
url = "https://openapi.naver.com/v1/vision/face" # 얼굴감지
# url = "https://openapi.naver.com/v1/vision/celebrity" # 유명인 얼굴인식

# 이미지 가져오기
img = cv2.imread("testImg.jpg",cv2.IMREAD_COLOR)
resize = cv2.resize(img, dsize=(800, 1066), interpolation=cv2.INTER_AREA)


cv2.imwrite('temp_img.jpg', resize)


files = Image.fromarray(resize, 'RGB')
# print(files)
# files = {'image': open('temp_img.jpg', 'rb')}
# cv2.imshow('test',files)



headers = {'X-Naver-Client-Id': "55gGa_8DQ_3vGlywNFsQ", 'X-Naver-Client-Secret': "_7yvDe8CR6" }
response = requests.post(url,  files=files, headers=headers)
rescode = response.status_code
# if(rescode==200):
#     print (response.text)
# else:
#     print("Error Code:" + str(rescode))
print(response.text)

# cv2.waitKey(0)