
const redis = require('redis');
 
// create and connect redis client to local instance.
const client = redis.createClient({
    socket: {
        host: '52.79.182.104',
        port: '6379'
    },
    username: 'default',
    password: 'Admin123!'
});

var connectRedis = async() => {
    client.on("error", (err) => {
        console.log("Redis Client Error", err);
    });
    await client.connect();
    return "redis connected!"
};

var getDataRedis = async(key) => {
    await client.set(key,"Luan2");
    const value = await client.get(key);
    return value;
};

connectRedis().then((result) => {
    console.log(result);
    getDataRedis('TEST').then((result2) => {
        console.log(result2);
    });
});
