'''
Created on Dec 27, 2017

@author: safwans

https://rosettacode.org/wiki/Using_the_Meetup.com_API#Python

'''
import requests, json

city = None
topic = None

def get_event(url_path, key):
    response_string = ""
    params = {'city': city, 'key': key, 'topic': topic}
    r = requests.get(url_path, params = params)
    print(r.url)
    response_string = r.text
    return response_string

def get_api_key(key_path):
    key = ""
    key_file = open(key_path, 'r')
    key = key_file.read()
    return key

def submit_event(url_path, params):
    req = requests.post(url_path, data=json.dumps(params))
    print(req.text+" : Event Submitted")