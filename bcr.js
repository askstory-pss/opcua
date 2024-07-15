const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');
const axios = require('axios');
const redis = require('redis');
const client_redis = redis.createClient();

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

const endpointUrl = "opc.tcp://10.10.10.92:4840";

/// 양극 PD 믹서 ///

const nodeId_CMSWrite_MMBID_BID = "ns=6;s=::CMSWrite:MMBID.BID";
const nodeId_CMSWrite_MMBID_CODE = "ns=6;s=::CMSWrite:MMBID.CODE";
const nodeId_CMSWrite_MMBCR_CODE = "ns=6;s=::CMSWrite:MMBCR.CODE";
const nodeId_CMSWrite_MMBCR_REP = "ns=6;s=::CMSWrite:MMBCR.REP";

const nodeId_CMSRead_MMBCR_BCR = "ns=6;s=::CMSRead:MMBCR.BCR";
const nodeId_CMSRead_MMBCR_CODE = "ns=6;s=::CMSRead:MMBCR.CODE";
const nodeId_CMSRead_MMBCR_REQ = "ns=6;s=::CMSRead:MMBCR.REQ";
const nodeId_CMSRead_MMBCR_REP = "ns=6;s=::CMSRead:MMBCR.REP";

/// 음극 PD 믹서 ///

const nodeId_AMSWrite_MMBID_BID = "ns=6;s=::AMSWrite:MMBID.BID";
const nodeId_AMSWrite_MMBID_CODE = "ns=6;s=::AMSWrite:MMBID.CODE";
const nodeId_AMSWrite_MMBCR_CODE = "ns=6;s=::AMSWrite:MMBCR.CODE";
const nodeId_AMSWrite_MMBCR_REP = "ns=6;s=::AMSWrite:MMBCR.REP";

const nodeId_AMSRead_MMBCR_BCR = "ns=6;s=::AMSRead:MMBCR.BCR";
const nodeId_AMSRead_MMBCR_CODE = "ns=6;s=::AMSRead:MMBCR.CODE";
const nodeId_AMSRead_MMBCR_REQ = "ns=6;s=::AMSRead:MMBCR.REQ";
const nodeId_AMSRead_MMBCR_REP = "ns=6;s=::AMSRead:MMBCR.REP";

/// 양극 바인더 믹서 ///

const nodeId_CBCWrite_BINBCR_CODE = "ns=6;s=::CBCWrite:BINBCR.CODE";
const nodeId_CBCWrite_BINBCR_REP = "ns=6;s=::CBCWrite:BINBCR.REP";

const nodeId_CBCRead_BINBCR_BCR = "ns=6;s=::CBCRead:BINBCR.BCR";
const nodeId_CBCRead_BINBCR_CODE = "ns=6;s=::CBCRead:BINBCR.CODE";
const nodeId_CBCRead_BINBCR_REQ = "ns=6;s=::CBCRead:BINBCR.REQ";
const nodeId_CBCRead_BINBCR_REP = "ns=6;s=::CBCRead:BINBCR.REP";

/// 음극 바인더 믹서 ///

const nodeId_AMCWrite_CMCBCR_CODE = "ns=6;s=::AMCWrite:CMCBCR.CODE";
const nodeId_AMCWrite_CMCBCR_REP = "ns=6;s=::AMCWrite:CMCBCR.REP";

const nodeId_AMCRead_CMCBCR_BCR = "ns=6;s=::AMCRead:CMCBCR.BCR";
const nodeId_AMCRead_CMCBCR_CODE = "ns=6;s=::AMCRead:CMCBCR.CODE";
const nodeId_AMCRead_CMCBCR_REQ = "ns=6;s=::AMCRead:CMCBCR.REQ";
const nodeId_AMCRead_CMCBCR_REP = "ns=6;s=::AMCRead:CMCBCR.REP";

/// 양극 powder ///

const nodeId_CPWrite_DP1BCR_CODE = "ns=6;s=::CPWrite:DP1BCR.CODE";
const nodeId_CPWrite_DP1BCR_REP = "ns=6;s=::CPWrite:DP1BCR.REP";

const nodeId_CPRead_DP1BCR_BCR = "ns=6;s=::CPRead:DP1BCR.BCR";
const nodeId_CPRead_DP1BCR_CODE = "ns=6;s=::CPRead:DP1BCR.CODE";
const nodeId_CPRead_DP1BCR_REQ = "ns=6;s=::CPRead:DP1BCR.REQ";
const nodeId_CPRead_DP1BCR_REP = "ns=6;s=::CPRead:DP1BCR.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_CPWrite_DP2BCR_CODE = "ns=6;s=::CPWrite:DP2BCR.CODE";
const nodeId_CPWrite_DP2BCR_REP = "ns=6;s=::CPWrite:DP2BCR.REP";

const nodeId_CPRead_DP2BCR_BCR = "ns=6;s=::CPRead:DP2BCR.BCR";
const nodeId_CPRead_DP2BCR_CODE = "ns=6;s=::CPRead:DP2BCR.CODE";
const nodeId_CPRead_DP2BCR_REQ = "ns=6;s=::CPRead:DP2BCR.REQ";
const nodeId_CPRead_DP2BCR_REP = "ns=6;s=::CPRead:DP2BCR.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_CPWrite_DPLBCR_CODE = "ns=6;s=::CPWrite:DPLBCR.CODE";
const nodeId_CPWrite_DPLBCR_REP = "ns=6;s=::CPWrite:DPLBCR.REP";

const nodeId_CPRead_DPLBCR_BCR = "ns=6;s=::CPRead:DPLBCR.BCR";
const nodeId_CPRead_DPLBCR_CODE = "ns=6;s=::CPRead:DPLBCR.CODE";
const nodeId_CPRead_DPLBCR_REQ = "ns=6;s=::CPRead:DPLBCR.REQ";
const nodeId_CPRead_DPLBCR_REP = "ns=6;s=::CPRead:DPLBCR.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_CPWrite_MDCOM_CODE = "ns=6;s=::CPWrite:MDCOM.CODE";
const nodeId_CPWrite_MDCOM_REP = "ns=6;s=::CPWrite:MDCOM.REP";

const nodeId_CPRead_MDCOM_CODE = "ns=6;s=::CPRead:MDCOM.CODE";
const nodeId_CPRead_MDCOM_REQ = "ns=6;s=::CPRead:MDCOM.REPORT";
const nodeId_CPRead_MDCOM_REP = "ns=6;s=::CPRead:MDCOM.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_CPWrite_LDCOM_CODE = "ns=6;s=::CPWrite:LDCOM.CODE";
const nodeId_CPWrite_LDCOM_REP = "ns=6;s=::CPWrite:LDCOM.REP";

const nodeId_CPRead_LDCOM_CODE = "ns=6;s=::CPRead:LDCOM.CODE";
const nodeId_CPRead_LDCOM_REQ = "ns=6;s=::CPRead:LDCOM.REPORT";
const nodeId_CPRead_LDCOM_REP = "ns=6;s=::CPRead:LDCOM.REP";

/// 음극 powder ///

const nodeId_APWrite_DP1BCR_CODE = "ns=6;s=::APWrite:DP1BCR.CODE";
const nodeId_APWrite_DP1BCR_REP = "ns=6;s=::APWrite:DP1BCR.REP";

const nodeId_APRead_DP1BCR_BCR = "ns=6;s=::APRead:DP1BCR.BCR";
const nodeId_APRead_DP1BCR_CODE = "ns=6;s=::APRead:DP1BCR.CODE";
const nodeId_APRead_DP1BCR_REQ = "ns=6;s=::APRead:DP1BCR.REQ";
const nodeId_APRead_DP1BCR_REP = "ns=6;s=::APRead:DP1BCR.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_APWrite_DP2BCR_CODE = "ns=6;s=::APWrite:DP2BCR.CODE";
const nodeId_APWrite_DP2BCR_REP = "ns=6;s=::APWrite:DP2BCR.REP";

const nodeId_APRead_DP2BCR_BCR = "ns=6;s=::APRead:DP2BCR.BCR";
const nodeId_APRead_DP2BCR_CODE = "ns=6;s=::APRead:DP2BCR.CODE";
const nodeId_APRead_DP2BCR_REQ = "ns=6;s=::APRead:DP2BCR.REQ";
const nodeId_APRead_DP2BCR_REP = "ns=6;s=::APRead:DP2BCR.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_APWrite_DPSBCR_CODE = "ns=6;s=::APWrite:DPSBCR.CODE";
const nodeId_APWrite_DPSBCR_REP = "ns=6;s=::APWrite:DPSBCR.REP";

const nodeId_APRead_DPSBCR_BCR = "ns=6;s=::APRead:DPSBCR.BCR";
const nodeId_APRead_DPSBCR_CODE = "ns=6;s=::APRead:DPSBCR.CODE";
const nodeId_APRead_DPSBCR_REQ = "ns=6;s=::APRead:DPSBCR.REQ";
const nodeId_APRead_DPSBCR_REP = "ns=6;s=::APRead:DPSBCR.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_APWrite_MDCOM_CODE = "ns=6;s=::APWrite:MDCOM.CODE";
const nodeId_APWrite_MDCOM_REP = "ns=6;s=::APWrite:MDCOM.REP";

const nodeId_APRead_MDCOM_CODE = "ns=6;s=::APRead:MDCOM.CODE";
const nodeId_APRead_MDCOM_REQ = "ns=6;s=::APRead:MDCOM.REPORT";
const nodeId_APRead_MDCOM_REP = "ns=6;s=::APRead:MDCOM.REP";

//////////////////////////////////////////////////////////////////////

const nodeId_APWrite_SDCOM_CODE = "ns=6;s=::APWrite:SDCOM.CODE";
const nodeId_APWrite_SDCOM_REP = "ns=6;s=::APWrite:SDCOM.REP";

const nodeId_APRead_SDCOM_CODE = "ns=6;s=::APRead:SDCOM.CODE";
const nodeId_APRead_SDCOM_REQ = "ns=6;s=::APRead:SDCOM.REPORT";
const nodeId_APRead_SDCOM_REP = "ns=6;s=::APRead:SDCOM.REP";

async function bcrAvail(polarity, process, lotno){
    try{
        const response = await axios.get(`http://10.10.10.51/facility/validate?polarity=${polarity}&process=${process}&lotno=${lotno}`);
        return response.data
    } catch (error){
        throw error;
    }
}

async function writeNode(session, nodeId, dataType, value) {
    try {
        await session.write({
            nodeId,
            attributeId: AttributeIds.Value,
            value: {
                value: {
                    dataType,
                    value
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

//////////////////// REDIS_KEY ////////////////////
// C_MMBCR
// A_MMBCR
// C_BINBCR
// A_CMCBCR
// C_DP1BCR
// C_DP2BCR
// C_DPLBCR
// A_DP1BCR
// A_DP2BCR
// A_DPSBCR
///////////////////////////////////////////////////

async function writeRedis(key, redis_value){
    await client_redis.connect();
    let get_data = await client_redis.get(key);
    try{
        let get_json = JSON.parse(get_data);
        if(get_json.bcr_list?.length >= 1){
            redis_value.id = get_json.bcr_list.length + 1;
            get_json.bcr_list.push(redis_value);
            await client_redis.set(key, JSON.stringify(get_json));
            await client_redis.disconnect();
        }else{
            let get_json = {
                bcr_list : []
            };
            redis_value.id = 1
            get_json.bcr_list.push(redis_value);
            await client_redis.set(key, JSON.stringify(get_json));
            await client_redis.disconnect();
        }
    }catch{
        let get_json = {
            bcr_list : []
        };
        redis_value.id = 1
        get_json.bcr_list.push(redis_value);
        await client_redis.set(key, JSON.stringify(get_json));
        await client_redis.disconnect();
    }
}

async function bcrCheck(session, BCR, REQ, CODE, REP, polarity, process, key){
    try {
        if(REQ.value.value === 1){
            //let resultValue = await bcrAvail(polarity, process, BCR.value.value);
            let resultValue = true;
            const codeValue = resultValue === true ? 1 : 0;
            await writeNode(session, CODE, DataType.Int16, codeValue);
            if (resultValue === true) {
                await writeNode(session, REP, DataType.Byte, 1);
                let code_value = await session.read({ nodeId: CODE, attributeId: AttributeIds.Value });
                let redis_value = {
                    "BCR" : BCR.value.value,
                    "CODE" : code_value.value.value
                }
                await writeRedis(key, redis_value);
            }
        }else{
            await writeNode(session, REP, DataType.Byte, 0);
        }
    } catch (error) {
        console.error('데이터 수집 및 전송 중 오류 발생:', error);
    }
}

async function collectAndSendData(session) { 
    try {
        const Value_CMS_MMBCR_BCR = await session.read({ nodeId: nodeId_CMSRead_MMBCR_BCR, attributeId: AttributeIds.Value });
        const Value_CMS_MMBCR_REQ = await session.read({ nodeId: nodeId_CMSRead_MMBCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_CMS_MMBCR_BCR, Value_CMS_MMBCR_REQ, nodeId_CMSWrite_MMBCR_CODE, nodeId_CMSWrite_MMBCR_REP, 'cathode', 'mixing800', 'C_MMBCR');

        const Value_AMS_MMBCR_BCR = await session.read({ nodeId: nodeId_AMSRead_MMBCR_BCR, attributeId: AttributeIds.Value });
        const Value_AMS_MMBCR_REQ = await session.read({ nodeId: nodeId_AMSRead_MMBCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_AMS_MMBCR_BCR, Value_AMS_MMBCR_REQ, nodeId_AMSWrite_MMBCR_CODE, nodeId_AMSWrite_MMBCR_REP, 'anode', 'mixing500', 'A_MMBCR');

        const Value_CBC_BINBCR_BCR = await session.read({ nodeId: nodeId_CBCRead_BINBCR_BCR, attributeId: AttributeIds.Value });
        const Value_CBC_BINBCR_REQ = await session.read({ nodeId: nodeId_CBCRead_BINBCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_CBC_BINBCR_BCR, Value_CBC_BINBCR_REQ, nodeId_CBCWrite_BINBCR_CODE, nodeId_CBCWrite_BINBCR_REP, 'cathode', 'mixing800', 'C_BINBCR');

        const Value_AMC_CMCBCR_BCR = await session.read({ nodeId: nodeId_AMCRead_CMCBCR_BCR, attributeId: AttributeIds.Value });
        const Value_AMC_CMCBCR_REQ = await session.read({ nodeId: nodeId_AMCRead_CMCBCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_AMC_CMCBCR_BCR, Value_AMC_CMCBCR_REQ, nodeId_AMCWrite_CMCBCR_CODE, nodeId_AMCWrite_CMCBCR_REP, 'anode', 'mixing500', 'A_CMCBCR');

        const Value_CP_DP1BCR_BCR = await session.read({ nodeId: nodeId_CPRead_DP1BCR_BCR, attributeId: AttributeIds.Value });
        const Value_CP_DP1BCR_REQ = await session.read({ nodeId: nodeId_CPRead_DP1BCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_CP_DP1BCR_BCR, Value_CP_DP1BCR_REQ, nodeId_CPWrite_DP1BCR_CODE, nodeId_CPWrite_DP1BCR_REP, 'cathode', 'mixing800', 'C_DP1BCR');

        const Value_CP_DP2BCR_BCR = await session.read({ nodeId: nodeId_CPRead_DP2BCR_BCR, attributeId: AttributeIds.Value });
        const Value_CP_DP2BCR_REQ = await session.read({ nodeId: nodeId_CPRead_DP2BCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_CP_DP2BCR_BCR, Value_CP_DP2BCR_REQ, nodeId_CPWrite_DP2BCR_CODE, nodeId_CPWrite_DP2BCR_REP, 'cathode', 'mixing800', 'C_DP2BCR');

        const Value_CP_DPLBCR_BCR = await session.read({ nodeId: nodeId_CPRead_DPLBCR_BCR, attributeId: AttributeIds.Value });
        const Value_CP_DPLBCR_REQ = await session.read({ nodeId: nodeId_CPRead_DPLBCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_CP_DPLBCR_BCR, Value_CP_DPLBCR_REQ, nodeId_CPWrite_DPLBCR_CODE, nodeId_CPWrite_DPLBCR_REP, 'cathode', 'mixing800', 'C_DPLBCR');

        const Value_AP_DP1BCR_BCR = await session.read({ nodeId: nodeId_APRead_DP1BCR_BCR, attributeId: AttributeIds.Value });
        const Value_AP_DP1BCR_REQ = await session.read({ nodeId: nodeId_APRead_DP1BCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_AP_DP1BCR_BCR, Value_AP_DP1BCR_REQ, nodeId_APWrite_DP1BCR_CODE, nodeId_APWrite_DP1BCR_REP, 'anode', 'mixing500', 'A_DP1BCR');

        const Value_AP_DP2BCR_BCR = await session.read({ nodeId: nodeId_APRead_DP2BCR_BCR, attributeId: AttributeIds.Value });
        const Value_AP_DP2BCR_REQ = await session.read({ nodeId: nodeId_APRead_DP2BCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_AP_DP2BCR_BCR, Value_AP_DP2BCR_REQ, nodeId_APWrite_DP2BCR_CODE, nodeId_APWrite_DP2BCR_REP, 'anode', 'mixing500', 'A_DP2BCR');

        const Value_AP_DPSBCR_BCR = await session.read({ nodeId: nodeId_APRead_DPSBCR_BCR, attributeId: AttributeIds.Value });
        const Value_AP_DPSBCR_REQ = await session.read({ nodeId: nodeId_APRead_DPSBCR_REQ, attributeId: AttributeIds.Value });
        await bcrCheck(session, Value_AP_DPSBCR_BCR, Value_AP_DPSBCR_REQ, nodeId_APWrite_DPSBCR_CODE, nodeId_APWrite_DPSBCR_REP, 'anode', 'mixing500', 'A_DPSBCR');

        // const Value_CP_LDCOM_REQ = await session.read({ nodeId: nodeId_CPRead_LDCOM_REQ, attributeId: AttributeIds.Value });
        // if(Value_CP_LDCOM_REQ.value.value == 1){
        //     await writeNode(session, nodeId_CPWrite_MDCOM_CODE, DataType.Int16, codeValue);
        //     await writeNode(session, nodeId_CPWrite_MDCOM_REP, DataType.Byte, 1);
        // }else{
        //     await writeNode(session, nodeId_CPWrite_MDCOM_REP, DataType.Byte, 0);
        // }

    } catch (error) {
        console.error('데이터 수집 및 전송 중 오류 발생:', error);
    }
}

async function main() {
    await producer.connect();
    const client = OPCUAClient.create({ endpointMustExist: false });
    try{
        await client.connect(endpointUrl);
        console.log("Connected to the OPC UA server at", endpointUrl);

        const session = await client.createSession();
        console.log("Session created");

        const run = async () => {
            while (true) {
                await collectAndSendData(session);
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
            }
        };
        run().catch(console.error);
    } catch (error) {
        console.error("Initialization failed:", error);
        await producer.disconnect();
        await client.disconnect();
    }
}

main();
