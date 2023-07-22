import requests

ips = requests.get('https://7.enowars.com/api/data/ips').text.split('\n')
teams = requests.get('https://7.enowars.com/api/data/teams').json()

for ip, team in zip(ips, teams['confirmedTeams']):
    print(ip, team['name'])