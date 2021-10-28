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
    nodes = ['d4fc32bc-1ea8-4088-8649-e1e59f0a4229', '22cc9ce0-67db-48cf-b757-14e2b1f79442', 'a300cb2f-ac3c-43f4-9536-c34ab285f191', 'a737008c-a7fb-4600-9511-503cdb0b1514', '4b15ff3e-d360-4b24-9ce4-ddf17084788c', 'a5a56a94-a7c8-4c0b-bf8e-5bd6ca0d1e72', 'c3ed8590-815d-4bd6-b6bf-c5648c7ba4a5', '30513225-866f-4d4c-b533-46d7b1ada584', 'c875d848-bfa5-4997-8d57-4df93a5fc3ec', 
    '37105acb-fa09-43d6-a58c-a2632e2b629d', 'f24d4be9-3d69-49c7-837c-488c20323c78', 'cb069afc-f5a4-40e1-a1c3-00b93e75ea1c', 'c6e8fc33-cc4d-4521-83d0-d49b0ed16cc1', 
    'effcf289-856c-4d05-8487-dfcd073727de', '6d3bc436-37a9-479f-9806-33d0e2c2705c', '6a54a570-407b-48f1-8ee6-6c35ac54f589']
    for i in nodes:
        intake = GetData(i).makeData()
        data.append(intake)

    return json.dumps(data, indent=4)