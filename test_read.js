const redis = require('redis');
const client_redis = redis.createClient();

let key = 'test_key';

async function main(){
  await client_redis.connect();
  let get_data = await client_redis.get(key);
  console.log(JSON.parse(get_data));
  await client_redis.disconnect();
}

main();