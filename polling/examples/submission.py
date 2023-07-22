import requests

SERVER_URL = "http://localhost:3000/submission"

data = {
	"flag": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
	"exploit_id": 'da5f0e21e628e1d3',
	"tick": 5,
	"target_ip": '10.1.3.130',
	"team": 3,
	"flagstore": 'pirate-birthday',
	"sent": 1,
  "status": "OLD"
}
res = requests.post(SERVER_URL, json=data)
print(res.text)