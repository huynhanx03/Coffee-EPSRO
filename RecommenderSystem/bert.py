from transformers import AutoTokenizer, TFAutoModel
import tensorflow as tf

class BERTEmbedding:
    def __init__(self):
        bert_name = "vinai/phobert-base"

        # Load BERT tokenizer and model
        self.tokenizer = AutoTokenizer.from_pretrained(bert_name)
        self.model = TFAutoModel.from_pretrained(bert_name)

    def encode(self, text):
        # Tokenize input and create embeddings
        inputs = self.tokenizer(text, return_tensors="tf", padding=True, truncation=True)

        # Get the model outputs
        outputs = self.model(**inputs)

        embeddings = tf.reduce_mean(outputs.last_hidden_state, axis=1)
        return embeddings
    
bert_embedding = BERTEmbedding()