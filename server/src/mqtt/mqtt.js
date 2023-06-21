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

    client.subscribe('danghoanghieu/dataSensor', function (err) {
        console.log("Subscribed to dataSensor topic");
        if (err) {
            console.log(err);
        }
    })

    client.subscribe('danghoanghieu/dataDevice', function (err) {
        console.log("Subscribed to Device topic");
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
        
        //In ra console để debug
        console.log("[Topic arrived] " + topic);
        console.log("[Message arrived] " + msg_str);

        processing(topic, msg_str);
        console.log("End message!")
    } catch(err) {
        console.log(err);
    }
});

const processing = async (topic, msg_str) => {
    const data = JSON.parse(msg_str);
    if(topic == "danghoanghieu/pub") {
        await ConfigSensor.updateSensor({...data, status:0});
    } else if (topic == "danghoanghieu/dataSensor") {
        const { EnvTemp, EnvHumi, EnvIllu, Water, PH } = data;
        var senser =  new  DataSensor(EnvTemp, EnvHumi, EnvIllu, Water, PH);
        senser.save();//{"EnvTemp":29, "EnvHumi":80, "EnvIllu":7, "PH":5, "Water":12}
    } else if (topic == "danghoanghieu/dataDevice") {
        ConfigSensor.updateDevice({...data, status:0});
    }
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
            var sensorControl = {
                "minTemp" : resultConfig[0].minTemp, 
                "maxTemp" : resultConfig[0].maxTemp,
                "minHumi" : resultConfig[0].minHumi, 
                "maxHumi" : resultConfig[0].maxHumi,
                "minWater" : resultConfig[0].minWater, 
                "maxWater" : resultConfig[0].maxWater,
                "minIllu" : resultConfig[0].minIllu, 
                "maxIllu" : resultConfig[0].maxIllu,
                "minPH" : resultConfig[0].minPH,
                "maxPH" : resultConfig[0].maxPH
            }
            client.publish('danghoanghieu/sub',  JSON.stringify(sensorControl));

            var deviceControl = {
                "StaPump" : resultConfig[0].StaPump,
                "StaLight" : resultConfig[0].StaLight,
                "StarDisch" : resultConfig[0].StarDisch,
                "StaCharge" : resultConfig[0].StaCharge
            }
            client.publish('danghoanghieu/subDevice',  JSON.stringify(deviceControl));

            ConfigSensor.updateStatus({status: 0 });
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