from flask import Flask, request, jsonify
from flask_cors import CORS 
import firebase
import recommend
import chatbot

products = firebase.GetProduct()
evaluates = firebase.GetEvaluate()

RS = recommend.HybridRecommender(products, evaluates, k = 5)

chatbotCoffee = chatbot.Chatbot()

app = Flask(__name__)
CORS(app)  

@app.route('/recommend', methods=['POST'])
def recommendHTTP():
    try:
        data = request.get_json()

        product_id = data['MaSanPham']
        user_id = data['MaKhachHang']

        productRecommend = RS.recommend(user_id, product_id)
        print(productRecommend)
        # Chuyển danh sách List<Product> khuyến nghị thành chuỗi JSON và gửi trả về cho ứng dụng C#
        return jsonify(productRecommend)
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/chatbot', methods=['POST'])
def chatbotHTTP():
    try:
        data = request.get_json()

        question = data['CauHoi']
        user_id = data['MaKhachHang']

        results = chatbotCoffee.get()
        return jsonify(results)
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)

