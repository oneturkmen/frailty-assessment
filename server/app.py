from flask import Flask
from flask import jsonify
from flask_cors import CORS

from analyzer import monthly_analysis

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://front-server:3000"}})

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify(monthly_analysis(1588899601))
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')