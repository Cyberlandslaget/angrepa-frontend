import requests
from utils import parse

SERVER_URL = "http://localhost:3000/scoreboard"
teams = [
	{"id": 1, "name": "organizers"},
	{"id": 2, "name": "fibonhack"},
	{"id": 3, "name": "WaterPaddler"},
	{"id": 4, "name": "printer toner level: 90%"},
	{"id": 5, "name": "bootplug"},
]
data_teams = {}

for t in teams:
	data_team = {
		"name": t["name"],
		"services": {
			"dummy-web1": parse("up"),
			"dummy-web2": parse("up"),
			"dummy-binary1": parse("up"),
			"dummy-binary2": parse("up"),
			"pirate-birthday": parse("up"),
			"pirate-birthday-new": parse("up"),
		}
	}
	data_teams[t["id"]] = data_team


data = {"teams": data_teams}
requests.post(SERVER_URL, json=data)