import os
import sys
import requests
from cv2 import cv2
from PIL import Image
import numpy as np
import urllib
from io import BytesIO
import io

client_id = "55gGa_8DQ_3vGlywNFsQ"
client_secret = "_7yvDe8CR6"
url_face = "https://openapi.naver.com/v1/vision/face"  # 얼굴감지
url_celebrity = "https://openapi.naver.com/v1/vision/celebrity"  # 유명인 얼굴인식


def analyze():
    # from app import user_img_path
    # print(user_img_path + 'face.py')
    # 이미지 가져오기
    # img = cv2.imread("testImg.jpg", cv2.IMREAD_COLOR)
    temp = 'https://image.chosun.com/sitedata/image/201007/28/2010072800337_0.jpg'
    response = requests.get(temp)
    img = Image.open(BytesIO(response.content))
    # image = np.asarray(bytearray(resp.read()), dtype="uint8")
    # img = cv2.imdecode(image, cv2.IMREAD_COLOR)
    # img = cv2.imread(image, cv2.IMREAD_COLOR)
    # 이미지 사이즈 변경
    # resize = cv2.resize(img, dsize=(600, 800), interpolation=cv2.INTER_AREA)
    
    
    # 사이즈 변경된 이미지 저장
    # cv2.imwrite('temp_img.jpg', resize)

    # files = Image.fromarray(resize, 'RGB') # pillow 이미지 변경 테스트 -> 실패


    # files = {'image': open('temp_img.jpg', 'rb')}
    # img.thumbnail((600, 800))
    newsize = (600, 800) 
    img = img.resize(newsize) 
    # API 에서 요구하는 건 바이너리 이미지.(추측)
    # mj_test = Image.fromarray()
    img.show()
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    byte_im = buf.getvalue()
    files = {'image': byte_im}


    # files = {'image': np.array(resize)}
    # print("넘파이로 변경 : " + str(type(np.array(resize)))) -> 오류


    headers = {'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret}

    response_face = requests.post(url_face,  files=files, headers=headers)
    rescode_face = response_face.status_code
    # print(response_face.json())

    # files = {'image': open('temp_img.jpg', 'rb')}

    response_celebrity = requests.post(
        url_celebrity,  files=files, headers=headers)
    rescode_celebrity = response_celebrity.status_code

    # print(response_celebrity.json())
    if(rescode_face == 200 and rescode_celebrity == 200):
        api_result = list()
        # print(response.text)
        # print(type(json.loads(response.text))) # 받아온 response를 딕셔너리로 변환
        data_face = response_face.json()
        data_celebrity = response_celebrity.json()

        api_result.append(data_face)
        api_result.append(data_celebrity)

        # print(api_result)

        #print(data_face["faces"][0]["emotion"])
        #print(data_celebrity["faces"][0]["celebrity"])



        return api_result
    else:
        print("Error Code:" + str(rescode_face) + ', ' + str(rescode_celebrity))
        error = "fail"
        return error

# analyze()
# print(response_face.text)
# print(response_celebrity.text)

# cv2.waitKey(0)

# 성별 일치도 가져오기
# data["faces"][0]["gender"]

# 나이 추정치 가져오기
# data["faces"][0]["age"]

# 감정 가져오기
# data_face["faces"][0]["emotion"]

# 닮은 꼴 연예인 가져오기


'''
얼굴 분석
{"info":
    {"size": {"width": 800, "height": 1066}, "faceCount": 1},
 "faces": [
        {
            "roi": {"x": 242, "y": 382, "width": 311, "height": 311},
            "landmark": {"leftEye": {"x": 313, "y": 432},
                         "rightEye": {"x": 471, "y": 442},
                         "nose": {"x": 389, "y": 511},
                         "leftMouth": {"x": 316, "y": 608},
                         "rightMouth": {"x": 445, "y": 619}},
            "gender": {"value": "male", "confidence": 0.999994},
            "age": {"value": "21~25", "confidence": 0.678903},
            "emotion": {"value": "neutral", "confidence": 0.509828},
            "pose": {"value": "frontal_face", "confidence": 0.999946}
        }
    ]
 }
 # 연예인 얼굴인식
 {'info': {'size': {'width': 600, 'height': 800}, 'faceCount': 1}, 
 'faces': [{'celebrity': {'value': '한예리', 'confidence': 0.351452}}]}
 '''
