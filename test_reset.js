const redis = require('redis');
const client_redis = redis.createClient();

let key = 'test_key';

async function main(){
    await client_redis.connect();
    await client_redis.set(key, "");
    await client_redis.disconnect();
}

main();