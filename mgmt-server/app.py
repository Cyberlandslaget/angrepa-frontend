from flask import Flask, request, jsonify
import json
from flask_cors import CORS, cross_origin
import psycopg2
from flask_socketio import SocketIO, emit
from time import sleep
import requests as req
from base64 import b64encode
import sys

ATTACK_SERVER = "http://angrepa.cybl:8888"

app = Flask(__name__)
CORS(app)
db = psycopg2.connect(host="angrepa.cybl", database="diesel_demo", user="postgres", password="pass1", port="5432")
socketio = SocketIO(app, cors_allowed_origins="*", async_handlers=True, async_mode='threading')

cur = db.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS scoreboard (id SERIAL PRIMARY KEY, data TEXT NOT NULL)")
cur.execute("CREATE TABLE IF NOT EXISTS exploits_log (id TEXT PRIMARY KEY, tar TEXT NOT NULL, config TEXT NOT NULL)")
cur.connection.commit()

@app.route('/api/scoreboard', methods=['GET', 'POST'])
def scoreboard():
    global scoreboardData
    if request.method == 'POST':
        scoreboardData = request.json
        cur = db.cursor()
        cur.execute("INSERT INTO scoreboard (data) VALUES (%s)", (json.dumps(scoreboardData),))
        cur.connection.commit()
        print(scoreboardData)
        socketio.emit('scoreboard', scoreboardData)
        return jsonify(scoreboardData)
    else:
        cur = db.cursor()
        cur.execute("SELECT data FROM scoreboard ORDER BY id DESC LIMIT 1")
        fetched = cur.fetchone()
        if fetched is None:
            return jsonify({"teams": {}})
        scoreboardData = json.loads(fetched[0])
        return jsonify(scoreboardData)

"""
CREATE TABLE exploits (
    -- unique id
    id TEXT PRIMARY KEY,
    running BOOLEAN NOT NULL DEFAULT FALSE,
    -- the service to attack
    attack_target TEXT,
    -- the blacklisted ips (non-null array of non-null strings)
    blacklist TEXT[] NOT NULL,
    -- the image id
    docker_image TEXT NOT NULL,
    -- the type (for recreating the actual instance)
    exploit_kind TEXT NOT NULL
);
"""
sent_exploits = set()
def update_exploits():
    global sent_exploits
    while True:
        cur = db.cursor()
        cur.execute("SELECT id, running, attack_target, blacklist, docker_image, exploit_kind FROM exploits")
        exploits = cur.fetchall()
        exploits = [{"id": s[0], "running": s[1], "attack_target": s[2], "blacklist": s[3], "docker_image": s[4], "exploit_kind": s[5]} for s in exploits if s[0] not in sent_exploits]
        if len(exploits) > 0:
            socketio.emit('exploits', exploits)
            sent_exploits.update([s["id"] for s in exploits])
        sleep(5)


@app.route('/api/exploits', methods=['GET'])
def exploits():
    cur = db.cursor()
    cur.execute("SELECT id, running, attack_target, blacklist, docker_image, exploit_kind FROM exploits")
    exploits = cur.fetchall()
    exploits = [{"id": s[0], "running": s[1], "attack_target": s[2], "blacklist": s[3], "docker_image": s[4], "exploit_kind": s[5]} for s in exploits]
    return jsonify(exploits)

"""
CREATE TABLE flags (
    -- flag itself
    flag TEXT NOT NULL PRIMARY KEY,

    -- the tick the flag was submitted
    tick INTEGER,
    -- time of submission
    stamp TIMESTAMP,

    -- the exploit that submitted this flag
    exploit_id TEXT,
    -- target ip
    target_ip TEXT,
    -- service that was exploited
    flagstore TEXT,

    -- sent to gameserver?
    sent BOOLEAN NOT NULL DEFAULT FALSE,
    -- status. None = no response yet. Some(x) = status is x
    status TEXT
);
"""
sent_flags = set()
def update_flags():
    global sent_flags
    while True:
        print("yoyoyo", file=sys.stderr)
        cur = db.cursor()
        cur.execute("SELECT flag, tick, stamp, exploit_id, target_ip, flagstore, sent, status FROM flags")
        flags = cur.fetchall()
        flags = [{"flag": s[0], "tick": s[1], "stamp": str(s[2]), "exploit_id": s[3], "target_ip": s[4], "flagstore": s[5], "sent": s[6], "status": s[7]} for s in flags if s[0] not in sent_flags]
        if len(flags) > 0:
            socketio.emit('submission', flags)
            sent_flags.update([s["flag"] for s in flags])
        sleep(5)

@app.route('/api/flag', methods=['GET'])
def flags():
    cur = db.cursor()
    cur.execute("SELECT flag, tick, stamp, exploit_id, target_ip, flagstore, sent, status FROM flags")
    flags = cur.fetchall()
    flags = [{"flag": s[0], "tick": s[1], "stamp": s[2], "exploit_id": s[3], "target_ip": s[4], "flagstore": s[5], "sent": s[6], "status": s[7]} for s in flags]
    return jsonify(flags)


@app.route('/api/start/<id>', methods=['GET'])
def start(id):
    r = req.post(f"{ATTACK_SERVER}/start?id={id}")
    return jsonify(r.json())
    

@app.route('/api/stop/<id>', methods=['GET'])
def stop(id):
    r = req.post(f"{ATTACK_SERVER}/stop?id={id}")
    return jsonify(r.json())
    
@app.route('/api/upload', methods=['POST'])
def upload():
    tar_file = request.files['tar'].read()
    config = request.files['config'].read()
    r = req.post(f"{ATTACK_SERVER}/upload", files={"tar": tar_file, "config": config})
    res = r.json()
    if "error" in res:
        return jsonify(res)
    cur = db.cursor()
    cur.execute("INSERT INTO exploits_log (id, tar, config) VALUES (%s, %s, %s)", (res["id"], tar_file, config))
    cur.connection.commit()
    return jsonify(res)

@app.route('/api/exploit/<id>', methods=['GET', 'POST'])
def exploit(id):
    if request.method == 'POST':
        config = request.files['config']
        r = req.post(f"{ATTACK_SERVER}/api/exploit?id={id}", files={"config": config})
        return jsonify(r.json())
    cur = db.cursor()
    cur.execute("SELECT tar, config FROM exploits_log WHERE id = %s", (id,))
    tar, config = cur.fetchone()
    return jsonify({"tar": tar, "config": config})

"""
CREATE TABLE runlogs (
    -- unique incrementing id
    id SERIAL PRIMARY KEY,

    -- metadata
    from_exploit_id TEXT NOT NULL,
    from_ip TEXT NOT NULL,

    tick INTEGER NOT NULL,
    stamp TIMESTAMP NOT NULL,
    content TEXT NOT NULL
)
"""


@app.route('/api/exploit_logs', methods=['GET'])
def exploit_logs():
    cur = db.cursor()
    cur.execute("SELECT id, from_exploit_id, from_ip, tick, stamp, content FROM runlogs")
    logs = cur.fetchall()
    logs = [{"id": s[0], "from_exploit_id": s[1], "from_ip": s[2], "tick": s[3], "stamp": s[4], "content": s[5]} for s in logs]
    return jsonify(logs)

last_runlog_id = 0
def update_runlogs():
    global last_runlog_id
    while True:
        cur = db.cursor()
        cur.execute("SELECT id, from_exploit_id, from_ip, tick, stamp, content FROM runlogs WHERE id > %s", (last_runlog_id,))
        logs = cur.fetchall()
        logs = [{"id": s[0], "from_exploit_id": s[1], "from_ip": s[2], "tick": s[3], "stamp": s[4], "content": s[5]} for s in logs]
        if len(logs) > 0:
            socketio.emit('exploit', logs)
            last_runlog_id = max([s["id"] for s in logs])
        sleep(5)
    
@app.route('/api/update_config/<id>', methods=['POST'])
def update_config(id):
    config = request.json
    r = req.post(f"{ATTACK_SERVER}/update_config?id={id}", json=config, headers={"Content-Type": "application/json"})
    return jsonify(r.json())

if __name__ == '__main__':
    socketio.start_background_task(update_flags)
    socketio.start_background_task(update_runlogs)
    socketio.run(app, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
