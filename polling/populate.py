import requests
from utils import parse

SERVER_URL = "http://localhost:5000/api/scoreboard"
import requests

ips = requests.get('https://7.enowars.com/api/data/ips').text.split('\n')
teamss = requests.get('https://7.enowars.com/api/data/teams').json()
teams = [
	{"id": 1, "name": "organizers"},
	{"id": 2, "name": "fibonhack"},
	{"id": 3, "name": "WaterPaddler"},
	{"id": 4, "name": "printer toner level: 90%"},
	{"id": 5, "name": "bootplug"},
]
teams = []

for ip, team in zip(ips, teamss['confirmedTeams']):
  teamId = ip.split(".")[2]
  teams.append({"id": int(teamId), "name": team['name']})
  print(ip, team['name'])
data_teams = {}

for t in teams:
	data_team = {
		"name": t["name"],
		"services": {
			"asocialnetwork": parse("up"),
			"bollwerk": parse("up"),
			"phreaking": parse("up"),
			"yvm": parse("up"),
			"granulizer": parse("up"),
			"oldschool": parse("up"),
			"steinsgate": parse("up"),
		}
	}
	data_teams[t["id"]] = data_team


data = {"teams": data_teams}
requests.post(SERVER_URL, json=data)