//////////Khai báo module mqtt
var mqtt = require('mqtt');

//Khai báo tham số kết nối đến Broker
var options = {
        host: 'mqtt://ngoinhaiot.com',
        port: 1111,
        username: 'danghoanghieu',
        password: '2D2FF66884174835'
    };
//Kết nối đến MQTT Broker với tham số biến option đã khai báo
var client = mqtt.connect('mqtt://ngoinhaiot.com', options)

//Khai báo Connect callback handler (nếu kết nối thành công sẽ thực thi hàm này)
client.on('connect', function () {

    //Subscribe đến topic sensor/update để nhận dữ liệu cảm biến
    client.subscribe('sensor/update', function (err) {
        console.log("Subscribed to sensor/update topic");
        if (err) {
            console.log(err);
        }
    })
    //Subscribe đến topic relay/state để nhận dữ liệu cập nhật trạng thái relay
    client.subscribe('relay/state', function (err) {
        console.log("Subscribed to relay/state topic");
        if (err) {
            console.log(err);
        }
    })
})
 
//Khai báo Subscribe Callback Handler (Khi nhận được dữ liệu từ các topic đã subscribe sẽ thực thi
//hàm này)
client.on('message', function (topic, message) {
    //Nhận dữ liệu và lưu vào biến msg_str
    var msg_str = message.toString();
    //In ra console để debug
    console.log("[Topic arrived] " + topic);
    console.log("[Message arrived] " + msg_str);
    
    if(topic == "sensor/update") {
        //Xử lý dữ liệu

        //Lưu trữ vào MySQL
        console.log("Data temperature:" + temperature + " Data humidity:" +  humidity);
    } else if (topic == "relay/state") {
    //Xử lý dữ liệu

        //Lưu trữ vào MySQL
        console.log("Data relay:" + relay + " Data state:" +  state);

    }
})