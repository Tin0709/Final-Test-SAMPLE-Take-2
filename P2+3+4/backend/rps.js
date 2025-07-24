const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];
let moves = {};
let round = 1;

function getResult(p1, p2) {
  if (p1 === p2) return "Draw";
  if (
    (p1 === "R" && p2 === "S") ||
    (p1 === "S" && p2 === "P") ||
    (p1 === "P" && p2 === "R")
  )
    return "Player 1 wins";
  return "Player 2 wins";
}

function broadcast(message) {
  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
}

wss.on("connection", (ws) => {
  if (clients.length >= 2) {
    ws.send("Game is full");
    ws.close();
    return;
  }

  clients.push(ws);
  const playerId = clients.length;

  ws.send(`Connected as Player ${playerId}`);

  if (clients.length === 2) {
    broadcast(`Round ${round}`);
  }

  ws.on("message", (msg) => {
    if (!moves[playerId]) {
      moves[playerId] = msg.toString().trim().toUpperCase();

      if (Object.keys(moves).length === 2) {
        const p1 = moves[1];
        const p2 = moves[2];
        const result = getResult(p1, p2);
        broadcast(`Round ${round}: ${result}. Round ${round + 1}`);
        moves = {};
        round++;
      }
    }
  });

  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
    moves = {};
  });
});

console.log("WebSocket RPS server running on ws://localhost:8080");
