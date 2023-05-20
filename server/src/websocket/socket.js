var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 8888})

wss.on('connection', ws => {
    console.log('New client connected!')
    ws.send('connection established')
    ws.on('close', () => console.log('Client has disconnected!'))
    ws.on('message', (data) => {
        console.log(`distributing message: ${data}`);
        ws.send(`${data}`);
    });

    ws.onerror = function () {
      console.log('websocket error')
    }
});
