import requests
import time
from utils import parse

SERVER_URL = "http://localhost:3000/scoreboard"
data_team = {
	"name": "team",
	"services": {
		"dummy-web1": parse("up"),
		"dummy-web2": parse("up"),
		"dummy-binary1": parse("up"),
		"dummy-binary2": parse("up"),
		"pirate-birthday": parse("up"),
	}
}
current_tick = 0

while current_tick >= 0:
    """
    data = requests.get(URL).json()
    current_tick = int(data["current_tick"])
    next_tick = int(data["current_tick_until"])
    diff_sec = next_tick - time.time() - 1 # -1 is the offset

    print(diff_sec, next_tick, time.time(), 1657400400)
    time.sleep(abs(diff_sec))
    """
    current_tick = current_tick+1
    if current_tick > 1:
        time.sleep(60)
    teams = {}
    for i in range(len(teams)):
        team = teams[i]
        data_team["name"] = team
        teams[team].append(data_team)

    # data = {"ticks": current_tick, "teams": teams}
    data = {"currentTick": current_tick}
    requests.post(SERVER_URL, json=data)