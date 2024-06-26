import numpy as np
import tensorflow as tf
from transformers import AutoTokenizer, TFAutoModel
from tensorflow.keras.models import load_model

class Chatbot:
    def __init__(self, MAX_LEN_CONTEXT = 32):
        
        bert_name = "vinai/phobert-base"

        # Load the pre-trained sentence embedding model
        self.bert = TFAutoModel.from_pretrained(bert_name)
        self.tokenizer = AutoTokenizer.from_pretrained(bert_name)

        self.MAX_LEN_CONTEXT = MAX_LEN_CONTEXT

        self.model = load_model('model_coffee_question_classification.h5', compile=False)

    def get(self):
        test_contexts = ["cà phê còn hàng không",
                        "gợi ý các cà phê tương tự với",
                        "cửa hàng gợi ý sản phẩm cho tớ được không",
                        "cho tôi các sản phẩm bán chạy nhất",
                        "danh sách sản phẩm bán chạy hàng đầu",
                        "cà phê quán này ngon không",
                        "Espresso với americano cái nào ngon hơn",
                        "cho hỏi thông tin về Espresso",
                        "Espresso còn bao nhiêu ly",
                        "Espresso giá như nào"]

        test_context_encodings = self.tokenizer(test_contexts, truncation=True, padding='max_length', max_length=self.MAX_LEN_CONTEXT)

        test_context_features = {key: tf.convert_to_tensor(test_context_encodings[key], dtype=tf.float32) for key in self.tokenizer.model_input_names}

        test_context_input_ids = test_context_features['input_ids']
        test_context_attention_mask = test_context_features['attention_mask']

        Test_array = self.model.predict([test_context_input_ids, test_context_attention_mask])

        y_predict = np.argmax(Test_array, axis=-1)

        def labelDecoder(number):
            if number == 2:
                return 'Recommend'
            elif number == 1:
                return 'Top sell'
            elif number == 0:
                return 'Information'
            else:
                return 'Other'

        y_predict_decoder = []

        for predict in y_predict:
            y_predict_decoder.append(labelDecoder(predict))

        return y_predict_decoder