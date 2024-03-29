from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

import time

import analyzer
import retrieval

# Allow CORS access from the front-end server
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": ["http://front-server:3000","http://localhost:3000"]}})

#########################################################################
############################# Healthcheck ###############################
#########################################################################

@app.route('/', methods=['GET'])
def healthcheck():
    return jsonify({
        "status": "healthy",
        "code": 1
    })

#########################################################################
###################### Data retrieval (for charts) ######################
#########################################################################
"""
Get weekly HR data
"""
@app.route('/hr/weekly', methods=['GET'])
def chart_weekly_hr():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.weekly_hr(end_date))

"""
Get monthly HR data
"""
@app.route('/hr/monthly', methods=['GET'])
def chart_monthly_hr():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.monthly_hr(end_date))

"""
Get weekly BP data
"""
@app.route('/bp/weekly', methods=['GET'])
def chart_weekly_bp():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.weekly_bp(end_date))

"""
Get monthly BP data
"""
@app.route('/bp/monthly', methods=['GET'])
def chart_monthly_bp():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.monthly_bp(end_date))

"""
Get weekly steps data
"""
@app.route('/steps/weekly', methods=['GET'])
def chart_weekly_steps():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.weekly_steps(end_date))

"""
Get monthly steps data
"""
@app.route('/steps/monthly', methods=['GET'])
def chart_monthly_steps():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.monthly_steps(end_date))

"""
Get weekly calories data
"""
@app.route('/calories/weekly', methods=['GET'])
def chart_weekly_calories():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.weekly_calories(end_date))

"""
Get monthly steps data
"""
@app.route('/calories/monthly', methods=['GET'])
def chart_monthly_calories():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.monthly_calories(end_date))

"""
Get weight for 6 months (all)
"""
@app.route('/weight', methods=['GET'])
def chart_all_weight():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(retrieval.all_weight(end_date))


#########################################################################
###################### Analysis (actual assessment) #####################
#########################################################################

"""
Get frailty score for the past month
"""
@app.route('/score/month', methods=['GET'])
def score_month():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(analyzer.monthly_analysis(end_date))

"""
Get frailty score for the past week
"""
@app.route('/score/week', methods=['GET'])
def score_week():
    end_date = request.args.get('until')
    if end_date is None:
        end_date = int(time.time())
    else:
        end_date = int(end_date)
    return jsonify(analyzer.weekly_analysis(end_date))

# @app.route('/', methods=['GET'])
# def hello_world():
#     return jsonify({
#         "status": "healthy",
#         "code": 1
#     })
#     #return jsonify(monthly_analysis(1588899601))

if __name__ == '__main__':
    app.run(host='0.0.0.0')