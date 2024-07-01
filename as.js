const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

// Your OPC UA server endpoint
const endpointUrl = "opc.tcp://10.10.10.91:4840";

// The nodeId of the variable you want to read
const nodeId_ASRead_LotNo = "ns=6;s=::ASRead:ReadData.LotNo";
const nodeId_ASRead_ETC = "ns=6;s=::ASRead:ReadData.ETC";

const nodeId_ASRead_UnWinder_TSSV = "ns=6;s=::ASRead:ReadData.UnWinder.TSSV";
const nodeId_ASRead_UnWinder_TSPV = "ns=6;s=::ASRead:ReadData.UnWinder.TSPV";
const nodeId_ASRead_UnWinder_Diameter = "ns=6;s=::ASRead:ReadData.UnWinder.Diameter";

const nodeId_ASRead_Knife_LowSR = "ns=6;s=::ASRead:ReadData.Knife.LowSR";
const nodeId_ASRead_Knife_HighSR = "ns=6;s=::ASRead:ReadData.Knife.HighSR";
const nodeId_ASRead_Knife_LowD = "ns=6;s=::ASRead:ReadData.Knife.LowD";
const nodeId_ASRead_Knife_HighD = "ns=6;s=::ASRead:ReadData.Knife.HighD";
const nodeId_ASRead_Knife_Speed = "ns=6;s=::ASRead:ReadData.Knife.Speed";

const nodeId_ASRead_ReWinder_TSHSV = "ns=6;s=::ASRead:ReadData.ReWinder.TSHSV";
const nodeId_ASRead_ReWinder_TSHPV = "ns=6;s=::ASRead:ReadData.ReWinder.TSHPV";
const nodeId_ASRead_ReWinder_TSLSV = "ns=6;s=::ASRead:ReadData.ReWinder.TSLSV";
const nodeId_ASRead_ReWinder_TSLPV = "ns=6;s=::ASRead:ReadData.ReWinder.TSLPV";
const nodeId_ASRead_ReWinder_DH = "ns=6;s=::ASRead:ReadData.ReWinder.DH";
const nodeId_ASRead_ReWinder_DL = "ns=6;s=::ASRead:ReadData.ReWinder.DL";

const nodeId_ASRead_active = "ns=6;s=::ASRead:ReadBlock_0.Active";

async function collectAndSendData(session) {
    try {
        const Value_AS_LotNo = await session.read({ nodeId: nodeId_ASRead_LotNo, attributeId: AttributeIds.Value });
        const Value_AS_ETC = await session.read({ nodeId: nodeId_ASRead_ETC, attributeId: AttributeIds.Value });
    
        const Value_AS_UnWinder_TSSV = await session.read({ nodeId: nodeId_ASRead_UnWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_AS_UnWinder_TSPV = await session.read({ nodeId: nodeId_ASRead_UnWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_AS_UnWinder_Diameter = await session.read({ nodeId: nodeId_ASRead_UnWinder_Diameter, attributeId: AttributeIds.Value });
    
        const Value_AS_Knife_LowSR = await session.read({ nodeId: nodeId_ASRead_Knife_LowSR, attributeId: AttributeIds.Value });
        const Value_AS_Knife_HighSR = await session.read({ nodeId: nodeId_ASRead_Knife_HighSR, attributeId: AttributeIds.Value });
        const Value_AS_Knife_LowD = await session.read({ nodeId: nodeId_ASRead_Knife_LowD, attributeId: AttributeIds.Value });
        const Value_AS_Knife_HighD = await session.read({ nodeId: nodeId_ASRead_Knife_HighD, attributeId: AttributeIds.Value });
        const Value_AS_Knife_Speed = await session.read({ nodeId: nodeId_ASRead_Knife_Speed, attributeId: AttributeIds.Value });
        
        const Value_AS_ReWinder_TSHSV = await session.read({ nodeId: nodeId_ASRead_ReWinder_TSHSV, attributeId: AttributeIds.Value });
        const Value_AS_ReWinder_TSHPV = await session.read({ nodeId: nodeId_ASRead_ReWinder_TSHPV, attributeId: AttributeIds.Value });
        const Value_AS_ReWinder_TSLSV = await session.read({ nodeId: nodeId_ASRead_ReWinder_TSLSV, attributeId: AttributeIds.Value });
        const Value_AS_ReWinder_TSLPV = await session.read({ nodeId: nodeId_ASRead_ReWinder_TSLPV, attributeId: AttributeIds.Value });
        const Value_AS_ReWinder_DH = await session.read({ nodeId: nodeId_ASRead_ReWinder_DH, attributeId: AttributeIds.Value });
        const Value_AS_ReWinder_DL = await session.read({ nodeId: nodeId_ASRead_ReWinder_DL, attributeId: AttributeIds.Value });
    
	const Value_AS_active = await session.read({ nodeId: nodeId_ASRead_active, attributeId: AttributeIds.Value });

        const String_LotNo = String.fromCharCode(...Value_AS_LotNo.value.value.filter(code => code !== 0));
        const String_ETC = String.fromCharCode(...Value_AS_ETC.value.value.filter(code => code !== 0));

        let json_AS_UnWinder = {}
        let topic_AS_UnWinder = 'sfs.machine.slitting.a.uw1';

        json_AS_UnWinder.LotNo = String_LotNo;
        json_AS_UnWinder.ETC = String_ETC;
        json_AS_UnWinder.TSSV = {}
        json_AS_UnWinder.TSSV.unit = "N";
        json_AS_UnWinder.TSSV.min = 40;
        json_AS_UnWinder.TSSV.max = 300;
        json_AS_UnWinder.TSSV.value = Value_AS_UnWinder_TSSV.value.value;
        json_AS_UnWinder.TSPV = {}
        json_AS_UnWinder.TSPV.unit = "N";
        json_AS_UnWinder.TSPV.min = 40;
        json_AS_UnWinder.TSPV.max = 300;
        json_AS_UnWinder.TSPV.value = Value_AS_UnWinder_TSPV.value.value;
        json_AS_UnWinder.Diameter = {};
        json_AS_UnWinder.Diameter.unit = 'mm';
        json_AS_UnWinder.Diameter.min = 96.6;
        json_AS_UnWinder.Diameter.max = 500.0;
        json_AS_UnWinder.Diameter.value = Value_AS_UnWinder_Diameter.value.value;

        let json_AS_Knife = {}
        let topic_AS_Knife = 'sfs.machine.slitting.a.kf1';
        json_AS_Knife.LotNo = String_LotNo;
        json_AS_Knife.ETC = String_ETC;
        json_AS_Knife.LowSR = {};
        json_AS_Knife.LowSR.unit = "%";
        json_AS_Knife.LowSR.min = 90.00;
        json_AS_Knife.LowSR.max = 110.00;
        json_AS_Knife.LowSR.value = (Value_AS_Knife_LowSR.value.value * 0.01).toFixed(2) * 1;
        json_AS_Knife.HighSR = {};
        json_AS_Knife.HighSR.unit = "%";
        json_AS_Knife.HighSR.min = 90.00;
        json_AS_Knife.HighSR.max = 110.00;
        json_AS_Knife.HighSR.value = (Value_AS_Knife_HighSR.value.value * 0.01).toFixed(2) * 1;
        json_AS_Knife.LowD = {};
        json_AS_Knife.LowD.unit = "mm";
        json_AS_Knife.LowD.min = 120.00;
        json_AS_Knife.LowD.max = 130.00;
        json_AS_Knife.LowD.value = (Value_AS_Knife_LowD.value.value * 0.1).toFixed(2) * 1;
        json_AS_Knife.HighD = {};
        json_AS_Knife.HighD.unit = "mm";
        json_AS_Knife.HighD.min = 120.00;
        json_AS_Knife.HighD.max = 130.00;
        json_AS_Knife.HighD.value = (Value_AS_Knife_HighD.value.value * 0.1).toFixed(2) * 1;
        json_AS_Knife.Speed = {};
        json_AS_Knife.Speed.unit = "m/min";
        json_AS_Knife.Speed.min = 0;
        json_AS_Knife.Speed.max = 70.0;
        json_AS_Knife.Speed.value = (Value_AS_Knife_Speed.value.value * 0.1).toFixed(2) * 1;

        let json_AS_ReWinder = {}
        let topic_AS_ReWinder = 'sfs.machine.slitting.a.rw1';
        json_AS_ReWinder.LotNo = String_LotNo;
        json_AS_ReWinder.ETC = String_ETC;
        json_AS_ReWinder.TSHSV = {};
        json_AS_ReWinder.TSHSV.unit = 'N';
        json_AS_ReWinder.TSHSV.min = 15;
        json_AS_ReWinder.TSHSV.max = 100;
        json_AS_ReWinder.TSHSV.value = Value_AS_ReWinder_TSHSV.value.value;
        json_AS_ReWinder.TSHPV = {};
        json_AS_ReWinder.TSHPV.unit = 'N';
        json_AS_ReWinder.TSHPV.min = 15;
        json_AS_ReWinder.TSHPV.max = 100;
        json_AS_ReWinder.TSHPV.value = Value_AS_ReWinder_TSHPV.value.value;
        json_AS_ReWinder.TSLSV = {};
        json_AS_ReWinder.TSLSV.unit = 'N';
        json_AS_ReWinder.TSLSV.min = 15;
        json_AS_ReWinder.TSLSV.max = 100;
        json_AS_ReWinder.TSLSV.value = Value_AS_ReWinder_TSLSV.value.value;
        json_AS_ReWinder.TSLPV = {};
        json_AS_ReWinder.TSLPV.unit = 'N';
        json_AS_ReWinder.TSLPV.min = 15;
        json_AS_ReWinder.TSLPV.max = 100;
        json_AS_ReWinder.TSLPV.value = Value_AS_ReWinder_TSLPV.value.value;
        json_AS_ReWinder.DH = {};
        json_AS_ReWinder.DH.unit = 'mm';
        json_AS_ReWinder.DH.min = 71.6;
        json_AS_ReWinder.DH.max = 500.0;
        json_AS_ReWinder.DH.value = Value_AS_ReWinder_DH.value.value;
        json_AS_ReWinder.DL = {};
        json_AS_ReWinder.DL.unit = 'mm';
        json_AS_ReWinder.DL.min = 71.6;
        json_AS_ReWinder.DL.max = 500.0;
        json_AS_ReWinder.DL.value = Value_AS_ReWinder_DL.value.value;
	json_AS_ReWinder.Active = Value_AS_active.value.value;

        await sendKafkaMessage(topic_AS_UnWinder, json_AS_UnWinder);
        await sendKafkaMessage(topic_AS_Knife, json_AS_Knife);
        await sendKafkaMessage(topic_AS_ReWinder, json_AS_ReWinder);
        
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

        await collectAndSendData(session);

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

async function sendKafkaMessage(topic, messages) {

    await producer.send({
        topic: topic, // 전송할 토픽
        messages: [
        { value: JSON.stringify(messages) } // 전송할 메시지
        ],
    });
}

main();
