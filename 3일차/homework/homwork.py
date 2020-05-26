import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.dbsparta

# URL을 읽어서 HTML를 받아오고,
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get(
    'https://www.genie.co.kr/chart/top200?ditc=D&ymd=20200403&hh=23&rtm=N&pg=1', headers=headers)

# HTML을 BeautifulSoup이라는 라이브러리를 활용해 검색하기 용이한 상태로 만듦
soup = BeautifulSoup(data.text, 'html.parser')

songs = soup.select('.list-wrap > tbody > tr.list')

cnt = 0

for song in songs:
    cnt += 1
    if cnt < 10:
        rank = song.select_one('.number').text[0:1]
    else:
        rank = song.select_one('.number').text[0:2]

    title = song.select_one('.info > a:nth-child(1)').text.strip()
    singer = song.select_one('.info > a:nth-child(2)').text.strip()

    print("{} {} - {}".format(rank, title, singer))  # 출력 확인용

    ''' # DB 패킷
    doc = {
        'rank': rank,
        'title': title,
        'singer': singer
    }
    '''

    # db.genie.insert_one(doc) # DB에 데이터 넣기
