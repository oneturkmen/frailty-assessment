import requests
import json

def test_healthcheck():
    # Setup
    url = 'http://localhost:5000'
    headers = {'Content-Type': 'application/json' } 

    # Action   
    resp = requests.get(url, headers=headers)
    
    # Check
    assert resp.status_code == 200
    resp_body = resp.json()
    assert resp_body['code'] == 1


def test_hr_weekly():
    # Setup
    url = 'http://localhost:5000/hr/weekly'
    headers = {'Content-Type': 'application/json' }
    params = {'until': 1585699200}
    
    # Action
    resp = requests.get(url, headers=headers, params=params)
    
    # Check
    assert resp.status_code == 200
    resp_body = resp.json()
    assert isinstance(resp_body, list)
    assert len(resp_body) > 0
    assert resp_body[0] == ['Time','Value']


def test_bp_weekly():
    # Setup
    url = 'http://localhost:5000/bp/weekly'
    headers = {'Content-Type': 'application/json' }
    params = {'until': 1585699200}
    
    # Action
    resp = requests.get(url, headers=headers, params=params)
    
    # Check
    assert resp.status_code == 200
    resp_body = resp.json()
    assert isinstance(resp_body, list)
    assert len(resp_body) > 0
    assert resp_body[0] == ['Time','Diastolic','Systolic']


def test_steps_monthly():
    # Setup
    url = 'http://localhost:5000/steps/monthly'
    headers = {'Content-Type': 'application/json' }
    params = {'until': 1585699200}
    
    # Action
    resp = requests.get(url, headers=headers, params=params)
    
    # Check
    assert resp.status_code == 200
    resp_body = resp.json()
    assert isinstance(resp_body, list)
    assert len(resp_body) > 0
    assert resp_body[0] == ['Time','Steps']
    assert isinstance(resp_body[1], list)


def test_weight_all_data():
    # Setup
    url = 'http://localhost:5000/weight'
    headers = {'Content-Type': 'application/json' }
    params = {'until': 1590969600}
    
    # Action
    resp = requests.get(url, headers=headers, params=params)
    
    # Check
    assert resp.status_code == 200
    resp_body = resp.json()
    assert isinstance(resp_body, list)
    assert len(resp_body) == 192
    assert resp_body[0] == ['Time','Weight']
    assert isinstance(resp_body[1], list)


def test_weight_until_april_1():
    # Setup
    url = 'http://localhost:5000/weight'
    headers = {'Content-Type': 'application/json' }
    params = {'until': 1585699200}
    
    # Action
    resp = requests.get(url, headers=headers, params=params)
    
    # Check
    assert resp.status_code == 200
    resp_body = resp.json()
    assert isinstance(resp_body, list)
    assert len(resp_body) == 154
    assert resp_body[0] == ['Time','Weight']
    assert isinstance(resp_body[1], list)