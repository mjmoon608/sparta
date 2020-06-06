from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta

# 메인 html 가져오기


@app.route("/")
def home():
    return render_template('index.html')

# API 역할


@app.route("/order", methods=["POST"])
def write_review():
    # 클라이언트에서 이름, 수량, 주소, 번호 받아오기
    name_receive = request.form["name_give"]
    num_receive = request.form["num_give"]
    address_receive = request.form["address_give"]
    phone_receive = request.form["phone_give"]

    # 받아온 주소 확인 및 DB 정보 삽입
    order = {
        "name": name_receive,
        "num": num_receive,
        "address": address_receive,
        "phone": phone_receive
    }

    if (order["name"] != "" and order["num"] != "" and order["address"] != "" and len(order["phone"]) == 11):
        db.orders.insert_one(order)
        return jsonify({"result": "success", "msg": "🎉 주문이 완료됐습니다 🎉"})


@app.route('/order', methods=['GET'])
def read_orders():
    # 1. 모든 orders의 문서를 가져온 후 list로 변환합니다.
    orders = list(db.orders.find({}, {'_id': 0}))
    # 2. 성공 메시지와 함께 리뷰를 보냅니다.
    return jsonify({'result': 'success', 'orders': orders})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
