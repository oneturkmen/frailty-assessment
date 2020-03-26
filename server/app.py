from flask import Flask
from flask import jsonify
app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify("Hello world!")
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')