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
        data = {'id': self.id, 'est_time':timestamp, 'battery':0.9, 'status': 'true', 'data': {'temp': self.temp, 'hum': self.hum}} 
        return data  
    

def formData():
    data = []
    nodes = ["d4fc32bc-1ea8-4088-8649-e1e59f0a4229", "a5a56a94-a7c8-4c0b-bf8e-5bd6ca0d1e72", "37105acb-fa09-43d6-a58c-a2632e2b629d"]
    for i in nodes:
        intake = GetData(i).makeData()
        data.append(intake)

    formed = {'id':'6a54a570-407b-48f1-8ee6-6c35ac54f589', 'transTime': t.time(),'battery':0.9, 'devices': data}

    return json.dumps(formed, indent=4)