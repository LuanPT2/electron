var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 8888})
const DataSensor = require('../models/sensor.model');

wss.on('connection', ws => {
    console.log('New client connected!')
    ws.send('connection established')
    ws.on('close', () => console.log('Client has disconnected!'))
    ws.on('message', (data) => {
      var sensorvalue = null;
        try {
          const { EnvTemp, EnvHumi, PumTemp, Flow, PH, Illu, StaPump, StaLight, StarDisch, StaCharge} = JSON.parse(data.toString());
          sensorvalue = new DataSensor(EnvTemp, EnvHumi, PumTemp, Flow, PH, Illu, StaPump, StaLight, StarDisch, StaCharge);
        } catch (err) {
          ws.send("Error Invalid Format");
          return;
        };
        try {
          sensorvalue.save();
        } catch (err) {
          ws.send("Error Save");
        };
        
        ws.send(`${data}`);
        return;
    });

    ws.onerror = function () {
      console.log('websocket error')
    }
});
