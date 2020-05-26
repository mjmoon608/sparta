import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta 

# URL을 읽어서 HTML를 받아오고,
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=pnt&date=20200303',headers=headers)

# HTML을 BeautifulSoup이라는 라이브러리를 활용해 검색하기 용이한 상태로 만듦
soup = BeautifulSoup(data.text, 'html.parser')

# select를 이용해서, tr들을 불러오기
movies = soup.select('#old_content > table > tbody > tr')

mat_aver = 0

for movie in movies:
    # movie 안에 a 가 있으면,
    a_tag = movie.select_one('td.title > div > a')

    if a_tag is not None:   
        # 매트릭스 평점 가져오기
        title = a_tag.text
        if title == "매트릭스":                                     # a 태그 사이의 텍스트를 가져오기
            mat_aver = float(movie.select_one("td.point").text)
            #print(mat_aver)
        else:
            aver = float(movie.select_one("td.point").text)

        # 매트릭스와 평점 같은 영화들 가져오기
        # if aver == mat_aver and title != "매트릭스":
        #     #print("\n",title, "\n")
        #     doc = {
        #         "title": title,
        #         "aver" : 0
        #     }
        # else:
        #      #print(title)
        #      doc = {
        #          "title": title,
        #          "aver": aver
        #      }
        doc = {
            "title": title,
            "aver": aver
        }

        #print(doc) # 데이터 확인용
        #db.quiz.insert_one(doc) # 데이터 베이스에 정보 넣기
        #db.quiz.update_one({"aver": 9.39}, {'$set':{"aver": 0}}) # 9.39와 aver가 같은 영화 다 0으로 
# equl_aver_cnt = db.quiz.count_documents({"aver" : 9.37})
equl_aver_cnt = db.quiz.count_documents({"aver": {'$gt': 9.38}})
print(equl_aver_cnt)