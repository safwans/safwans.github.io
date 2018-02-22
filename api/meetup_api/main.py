'''
Created on Dec 27, 2017

@author: safwans
'''
import event_getter as eg
import json

def decodeJSON(response):
    j = json.loads(response.encode('ascii','ignore').decode())   #This is a Python Dict (JSON array)
    i = 0
    results = j['results']
    while i<len(results):
        event = results[i]
        print("Event "+str(i))
        print("Event name : "+event['name'])
        print("Event URL : "+event['event_url'])
        try : 
            print("City : "+str(event['venue']['city']))
        except KeyError : 
            print("This event has no location assigned")
 
        try :
            print("Group : "+str(event['group']['name']))
        except KeyError :
            print("This event is not related to any group")            
 
        i+=1
def main():
    url_path = "https://api.meetup.com"
    key_path = "meetup_api_key.txt"
    path_code = ""
    key = eg.get_api_key(key_path)
    
    
    
    #1 parameter get event example
    path_code = url_path+"/2/open_events"
    eg.topic = "guitar"
    response = eg.get_event(path_code, key)
    decodeJSON(response)
        
if __name__ == '__main__':
    main()