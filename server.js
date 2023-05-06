const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', function connection(ws) {
  clients.push(ws);
  console.log('New client connected');

  ws.on('message', function incoming(message) {
    console.log('Received message:', message);
    // Envia a mensagem recebida para todos os clientes conectados
    clients.forEach(function(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function() {
    clients = clients.filter(function(client) {
      return client !== ws;
    });
    console.log('Client disconnected');
  });
});
