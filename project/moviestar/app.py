from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta


# HTML을 주는 부분
@app.route('/')
def home():
	return render_template('index.html')

# API 역할을 하는 부분
@app.route('/api/list', methods=['GET'])
def stars_list():
    # 1. mystar 목록 전체를 검색합니다. ID는 제외하고 like 가 많은 순으로 정렬합니다.
	movie_stars = list(db.mystar.find({}, {'_id': False}).sort('like',-1)) # .sort('like',-1)
    # 참고) find({},{'_id':False}), sort()를 활용하면 굿!
    # 2. 성공하면 success 메시지와 함께 stars_list 목록을 클라이언트에 전달합니다.
	return jsonify({
		'result': 'success',
		#'msg':'list 연결되었습니다!',
		'movie_stars' : movie_stars
	})


@app.route('/api/like', methods=['POST'])
def star_like():
    # 1. 클라이언트가 전달한 name_give를 name_receive 변수에 넣습니다.
	name_receive = request.form['name_give']
    # 2. mystar 목록에서 find_one으로 name이 name_receive와 일치하는 star를 찾습니다.
	star = db.mystar.find_one({'name' : name_receive})
    # 3. star의 like 에 1을 더해준 new_like 변수를 만듭니다.
	new_like = star['like'] + 1
    # 4. mystar 목록에서 name이 name_receive인 문서의 like 를 new_like로 변경합니다.
    # 참고: '$set' 활용하기!
	db.mystar.update_one({'name':name_receive}, {'$set' : {'like': new_like}})
    # 5. 성공하면 success 메시지를 반환합니다.
	return jsonify({'result': 'success'}) # ,'msg':'like 연결되었습니다!'


@app.route('/api/delete', methods=['POST'])
def star_delete():
    # 1. 클라이언트가 전달한 name_give를 name_receive 변수에 넣습니다.
	name_receive = request.form["name_give"]
	del_star = {"name": name_receive}
    # 2. mystar 목록에서 delete_one으로 name이 name_receive와 일치하는 star를 제거합니다.
	db.mystar.delete_one(del_star)
    # 3. 성공하면 success 메시지를 반환합니다.
	return jsonify({'result': 'success','msg':'{} 카드를 삭제했습니다!'.format(name_receive)}) #
	


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)