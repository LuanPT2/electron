//////////Khai báo module mqtt
var mqtt = require('mqtt');
const DataSensor = require('../models/sensor.model');
const ConfigSensor = require('../models/config.model');

//Khai báo tham số kết nối đến Broker
var options = {
        port:2222,
        username: 'danghoanghieu',
        password: '2D2FF66884174835',
    };
//Kết nối đến MQTT Broker với tham số biến option đã khai báo
var client = mqtt.connect('ws://ngoinhaiot.com', options)

//Khai báo Connect callback handler (nếu kết nối thành công sẽ thực thi hàm này)
client.on('connect', function () {

    //Subscribe đến topic sensor/update để nhận dữ liệu cảm biến
    client.subscribe('danghoanghieu/pub', function (err) {
        console.log("Subscribed to pub topic");
        if (err) {
            console.log(err);
        }
    })

    client.subscribe('danghoanghieu/data', function (err) {
        console.log("Subscribed to data topic");
        if (err) {
            console.log(err);
        }
    })
})

//Khai báo Subscribe Callback Handler (Khi nhận được dữ liệu từ các topic đã subscribe sẽ thực thi
//hàm này)
client.on('message', function (topic, message) {
    try {
        var msg_str = message.toString();
        const data = JSON.parse(msg_str);
        //In ra console để debug
        console.log("[Topic arrived] " + topic);
        console.log("[Message arrived] " + msg_str);
        //processing(data);
        console.log("End message!")
    } catch(err) {
        console.log(err);
    }
});

const processing = async (data) => {
    await ConfigSensor.update({...data, status:0});
};

// run a loop every 2 seconds:
setInterval(loop, 1000);

function loop() {
    // if the client is connected, publish:
    if (client.connected) {
        sendData();
   }
}

const sendData = async (data) => {
    try {
        const resultConfig = await ConfigSensor.filter({});
        if(resultConfig != null & resultConfig[0].status == '1') {
            // publish to broker:
            client.publish('danghoanghieu/control',  JSON.stringify(resultConfig[0]));
        }
    } catch(err) {
        console.log(err);
    }
};

// handler for mqtt disconnect event:
client.on('close', onDisconnect);
function onDisconnect() {
    console.log("Disconnect! ");
  }
  
// Handle errors
client.on("error", function (error) {
    console.log("Error occurred: " + error);
});