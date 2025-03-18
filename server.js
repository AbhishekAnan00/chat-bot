const express = require(express);
const WebSocket = require('ws');
const app = express();

// Create HTTP server
const server = require('http').createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

// Start server
server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
