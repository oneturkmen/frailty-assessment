from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify("Hello world!")
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')