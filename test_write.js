const redis = require('redis');
const client_redis = redis.createClient();

let key = 'test_key';

let test_value = {
    BCR : '12345',
    CODE : '2'
}

async function main(){
    await client_redis.connect();
    let get_data = await client_redis.get(key);
    try{
        let get_json = JSON.parse(get_data);
        if(get_json.bcr_list?.length >= 1){
            test_value.id = get_json.bcr_list.length + 1;
            get_json.bcr_list.push(test_value);
            await client_redis.set(key, JSON.stringify(get_json));
            await client_redis.disconnect();
        }else{
            let get_json = {
                bcr_list : []
            };
            test_value.id = 1
            get_json.bcr_list.push(test_value);
            await client_redis.set(key, JSON.stringify(get_json));
            await client_redis.disconnect();
        }
    }catch{
        let get_json = {
            bcr_list : []
        };
        test_value.id = 1
        get_json.bcr_list.push(test_value);
        await client_redis.set(key, JSON.stringify(get_json));
        await client_redis.disconnect();
    }
}

main();