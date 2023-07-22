import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import Database from "better-sqlite3";

let dev = process.env.DEV || false;
// dev = false;
console.log("DEV MODE:", dev);

const db = new Database("db.sqlite3");
if (dev) db.exec(`DROP TABLE IF EXISTS submission_logs;`);
if (dev) db.exec(`DROP TABLE IF EXISTS exploit_logs;`);
db.exec(`CREATE TABLE IF NOT EXISTS submission_logs(
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
	flag TEXT NOT NULL,
	exploitId TEXT NOT NULL,
	tick INTEGER NOT NULL,
	targetIp TEXT NOT NULL,
  team TEXT NOT NULL,
	flagstore TEXT NOT NULL,
	sent INTEGER NOT NULL,
	status TEXT NOT NULL,
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
db.exec(`CREATE TABLE IF NOT EXISTS exploit_logs(
  id INTEGER PRIMARY KEY AUTOINCREMENT,  
	status TEXT NOT NULL,
  raw TEXT NOT NULL,
	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);

const app = express();
app.use(cors());

// Configuring parsers middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

const scoreboardData = {
	currentTick: 0,
	teams: { 1: { services: [] } },
};
let submissionData = [];
let exploitData = [];

// Data persistence with DB, one time run
const loadSubmissionData = () => {
	const output = [];
	try {
		const query = `SELECT * FROM submission_logs;`;
		const db_logs = db.prepare(query).all();
		// Parse logs
		for (let i = 0; i < db_logs.length; i++) {
			const log = db_logs[i];
			output.push(log);
		}
	} catch (err) {
		console.error(err);
	}
	return output;
};
const loadExploitData = () => {
	const output = [];
	try {
		const query = `SELECT * FROM exploit_logs;`;
		const db_logs = db.prepare(query).all();
		// Parse logs
		for (let i = 0; i < db_logs.length; i++) {
			const log = db_logs[i];
			output.push(log);
		}
	} catch (err) {
		console.error(err);
	}
	return output;
};

submissionData = loadSubmissionData() || [];
exploitData = loadExploitData() || [];
const sendScoreboardData = (socket) => {
	socket.emit("scoreboard", scoreboardData);
};
const sendSubmissionLogs = (socket) => {
	socket.emit("submission", submissionData);
};
const sendExploitLogs = (socket) => {
	socket.emit("exploit", exploitData);
};

io.on("connection", (socket) => {
	console.log(`Socket ${socket.id} connected`);
	sendScoreboardData(socket);
	sendSubmissionLogs(socket);
	sendExploitLogs(socket);

	socket.on("refresh", async () => {
		sendScoreboardData(socket);
		sendSubmissionLogs(socket);
		sendExploitLogs(socket);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

const parseFlagMsg = (msg) => {
	if (msg.includes("Accepted")) return "OK";
	else if (msg.includes("invalid")) return "INV";
	else if (msg.includes("nop")) return "NOP";
	else if (msg.includes("own")) return "OWN";
	else if (msg.includes("old")) return "OLD";
	else if (msg.includes("claimed")) return "DUP";
	else return "ERR";
};

// Routes
// Add log to submission
app.post("/submission", (req, res) => {
	const { flag, exploit_id, tick, target_ip, team, flagstore, sent, status } =
		req.body;
	// const code = parseFlagMsg(msg);
	const log = {
		flag,
		exploit_id,
		tick,
		target_ip,
		team,
		flagstore,
		sent,
		status,
		timestamp: new Date(),
	};
	// 1. Log to db
	try {
		// 1.2. Log to db and list of logs by challenge id
		submissionData.push(log);
		db.prepare(
			"INSERT INTO submission_logs (flag, exploitId, tick, targetIp, team, flagstore, sent, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
		).run(flag, exploit_id, tick, target_ip, team, flagstore, sent, status);
		sendSubmissionLogs(io);
	} catch (e) {
		console.log(e);
		return res.json({ status: -1 });
	}
	return res.json({ status: 0 });
});

// Add log to exploit
app.post("/exploit", (req, res) => {
	const { status, raw } = req.body;
	const log = {
		status,
		timestamp: new Date(),
		raw,
	};
	// 1. Log to db
	try {
		// 1.2. Log to db and list of logs by challenge id
		exploitData.push(log);
		db.prepare("INSERT INTO exploit_logs (status, raw) VALUES (?, ?);").run(
			status,
			raw
		);
		sendExploitLogs(io);
	} catch (e) {
		console.log(e);
		return res.json({ status: -1 });
	}
	return res.json({ status: 0 });
});

// Update scoreboard data
app.post("/scoreboard", (req, res) => {
	const { currentTick, teams } = req.body;
	if (currentTick) scoreboardData.currentTick = currentTick;
	if (teams) scoreboardData.teams = teams;
	sendScoreboardData(io);
	return res.json({ status: 0 });
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
	console.log("[*] Server listening at port %s\n", port);
});
