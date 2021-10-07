import random
import json
import time as t

class GetData:
    def __init__(self, id):
        self.temp = random.randint(0,30)
        self.hum = random.randint(0,100)
        self.id = id

    def makeData(self):
        timestamp = t.time()
        data = {'id': self.id, 'est-time':timestamp, 'battery':0.9, 'status': 'true', 'data': {'temp': self.temp, 'hum': self.hum}} 
        return data  
    

def formData():
    data = []
    for i in range(5):
        intake = GetData(i).makeData()
        data.append(intake)

    formed = {'id':'6a54a570-407b-48f1-8ee6-6c35ac54f589', 'transTime': t.time(),'battery':0.9, 'devices': data}

    return json.dumps(formed, indent=4)