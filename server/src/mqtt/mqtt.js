//////////Khai báo module mqtt
var mqtt = require('mqtt');

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
    client.subscribe('danghoanghieu/control', function (err) {
        console.log("Subscribed to sensor/update topic");
        if (err) {
            console.log(err);
        }
    })
})

//Khai báo Subscribe Callback Handler (Khi nhận được dữ liệu từ các topic đã subscribe sẽ thực thi
//hàm này)
client.on('message', function (topic, message) {
    var msg_str = message.toString();
    //In ra console để debug
    console.log("[Topic arrived] " + topic);
    console.log("[Message arrived] " + msg_str);
})

// Handle errors
client.on("error", function (error) {
    console.log("Error occurred: " + error);
});