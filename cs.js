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
const nodeId_CSRead_LotNo = "ns=6;s=::CSRead:ReadData.LotNo";
const nodeId_CSRead_ETC = "ns=6;s=::CSRead:ReadData.ETC";

const nodeId_CSRead_UnWinder_TSSV = "ns=6;s=::CSRead:ReadData.UnWinder.TSSV";
const nodeId_CSRead_UnWinder_TSPV = "ns=6;s=::CSRead:ReadData.UnWinder.TSPV";
const nodeId_CSRead_UnWinder_Diameter = "ns=6;s=::CSRead:ReadData.UnWinder.Diameter";

const nodeId_CSRead_Knife_LowSR = "ns=6;s=::CSRead:ReadData.Knife.LowSR";
const nodeId_CSRead_Knife_HighSR = "ns=6;s=::CSRead:ReadData.Knife.HighSR";
const nodeId_CSRead_Knife_LowD = "ns=6;s=::CSRead:ReadData.Knife.LowD";
const nodeId_CSRead_Knife_HighD = "ns=6;s=::CSRead:ReadData.Knife.HighD";
const nodeId_CSRead_Knife_Speed = "ns=6;s=::CSRead:ReadData.Knife.Speed";

const nodeId_CSRead_ReWinder_TSHSV = "ns=6;s=::CSRead:ReadData.ReWinder.TSHSV";
const nodeId_CSRead_ReWinder_TSHPV = "ns=6;s=::CSRead:ReadData.ReWinder.TSHPV";
const nodeId_CSRead_ReWinder_TSLSV = "ns=6;s=::CSRead:ReadData.ReWinder.TSLSV";
const nodeId_CSRead_ReWinder_TSLPV = "ns=6;s=::CSRead:ReadData.ReWinder.TSLPV";
const nodeId_CSRead_ReWinder_DH = "ns=6;s=::CSRead:ReadData.ReWinder.DH";
const nodeId_CSRead_ReWinder_DL = "ns=6;s=::CSRead:ReadData.ReWinder.DL";

const nodeId_CSRead_active = "ns=6;s=::CSRead:ReadBlock_0.Active";

async function collectAndSendData(session) {
    try {
        const Value_CS_LotNo = await session.read({ nodeId: nodeId_CSRead_LotNo, attributeId: AttributeIds.Value });
        const Value_CS_ETC = await session.read({ nodeId: nodeId_CSRead_ETC, attributeId: AttributeIds.Value });
    
        const Value_CS_UnWinder_TSSV = await session.read({ nodeId: nodeId_CSRead_UnWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_CS_UnWinder_TSPV = await session.read({ nodeId: nodeId_CSRead_UnWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_CS_UnWinder_Diameter = await session.read({ nodeId: nodeId_CSRead_UnWinder_Diameter, attributeId: AttributeIds.Value });
    
        const Value_CS_Knife_LowSR = await session.read({ nodeId: nodeId_CSRead_Knife_LowSR, attributeId: AttributeIds.Value });
        const Value_CS_Knife_HighSR = await session.read({ nodeId: nodeId_CSRead_Knife_HighSR, attributeId: AttributeIds.Value });
        const Value_CS_Knife_LowD = await session.read({ nodeId: nodeId_CSRead_Knife_LowD, attributeId: AttributeIds.Value });
        const Value_CS_Knife_HighD = await session.read({ nodeId: nodeId_CSRead_Knife_HighD, attributeId: AttributeIds.Value });
        const Value_CS_Knife_Speed = await session.read({ nodeId: nodeId_CSRead_Knife_Speed, attributeId: AttributeIds.Value });
        
        const Value_CS_ReWinder_TSHSV = await session.read({ nodeId: nodeId_CSRead_ReWinder_TSHSV, attributeId: AttributeIds.Value });
        const Value_CS_ReWinder_TSHPV = await session.read({ nodeId: nodeId_CSRead_ReWinder_TSHPV, attributeId: AttributeIds.Value });
        const Value_CS_ReWinder_TSLSV = await session.read({ nodeId: nodeId_CSRead_ReWinder_TSLSV, attributeId: AttributeIds.Value });
        const Value_CS_ReWinder_TSLPV = await session.read({ nodeId: nodeId_CSRead_ReWinder_TSLPV, attributeId: AttributeIds.Value });
        const Value_CS_ReWinder_DH = await session.read({ nodeId: nodeId_CSRead_ReWinder_DH, attributeId: AttributeIds.Value });
        const Value_CS_ReWinder_DL = await session.read({ nodeId: nodeId_CSRead_ReWinder_DL, attributeId: AttributeIds.Value });
    
	const Value_CS_active = await session.read({ nodeId: nodeId_CSRead_active, attributeId: AttributeIds.Value });

        const String_LotNo = String.fromCharCode(...Value_CS_LotNo.value.value.filter(code => code !== 0));
        const String_ETC = String.fromCharCode(...Value_CS_ETC.value.value.filter(code => code !== 0));

        let json_CS_UnWinder = {}
        let topic_CS_UnWinder = 'sfs.machine.slitting.c.uw1';

        json_CS_UnWinder.LotNo = String_LotNo;
        json_CS_UnWinder.ETC = String_ETC;
        json_CS_UnWinder.TSSV = {}
        json_CS_UnWinder.TSSV.unit = "N";
        json_CS_UnWinder.TSSV.min = 40;
        json_CS_UnWinder.TSSV.max = 300;
        json_CS_UnWinder.TSSV.value = Value_CS_UnWinder_TSSV.value.value;
        json_CS_UnWinder.TSPV = {}
        json_CS_UnWinder.TSPV.unit = "N";
        json_CS_UnWinder.TSPV.min = 40;
        json_CS_UnWinder.TSPV.max = 300;
        json_CS_UnWinder.TSPV.value = Value_CS_UnWinder_TSPV.value.value;
        json_CS_UnWinder.Diameter = {};
        json_CS_UnWinder.Diameter.unit = 'mm';
        json_CS_UnWinder.Diameter.min = 96.6;
        json_CS_UnWinder.Diameter.max = 500.0;
        json_CS_UnWinder.Diameter.value = Value_CS_UnWinder_Diameter.value.value;

        let json_CS_Knife = {}
        let topic_CS_Knife = 'sfs.machine.slitting.c.kf1';
        json_CS_Knife.LotNo = String_LotNo;
        json_CS_Knife.ETC = String_ETC;
        json_CS_Knife.LowSR = {};
        json_CS_Knife.LowSR.unit = "%";
        json_CS_Knife.LowSR.min = 90.00;
        json_CS_Knife.LowSR.max = 110.00;
        json_CS_Knife.LowSR.value = (Value_CS_Knife_LowSR.value.value * 0.01).toFixed(2) * 1;
        json_CS_Knife.HighSR = {};
        json_CS_Knife.HighSR.unit = "%";
        json_CS_Knife.HighSR.min = 90.00;
        json_CS_Knife.HighSR.max = 110.00;
        json_CS_Knife.HighSR.value = (Value_CS_Knife_HighSR.value.value * 0.01).toFixed(2) * 1;
        json_CS_Knife.LowD = {};
        json_CS_Knife.LowD.unit = "mm";
        json_CS_Knife.LowD.min = 120.00;
        json_CS_Knife.LowD.max = 130.00;
        json_CS_Knife.LowD.value = (Value_CS_Knife_LowD.value.value * 0.1).toFixed(2) * 1;
        json_CS_Knife.HighD = {};
        json_CS_Knife.HighD.unit = "mm";
        json_CS_Knife.HighD.min = 120.00;
        json_CS_Knife.HighD.max = 130.00;
        json_CS_Knife.HighD.value = (Value_CS_Knife_HighD.value.value * 0.1).toFixed(2) * 1;
        json_CS_Knife.Speed = {};
        json_CS_Knife.Speed.unit = "m/min";
        json_CS_Knife.Speed.min = 0;
        json_CS_Knife.Speed.max = 70.0;
        json_CS_Knife.Speed.value = (Value_CS_Knife_Speed.value.value * 0.1).toFixed(2) * 1;

        let json_CS_ReWinder = {}
        let topic_CS_ReWinder = 'sfs.machine.slitting.c.rw1';
        json_CS_ReWinder.LotNo = String_LotNo;
        json_CS_ReWinder.ETC = String_ETC;
        json_CS_ReWinder.TSHSV = {};
        json_CS_ReWinder.TSHSV.unit = 'N';
        json_CS_ReWinder.TSHSV.min = 15;
        json_CS_ReWinder.TSHSV.max = 100;
        json_CS_ReWinder.TSHSV.value = Value_CS_ReWinder_TSHSV.value.value;
        json_CS_ReWinder.TSHPV = {};
        json_CS_ReWinder.TSHPV.unit = 'N';
        json_CS_ReWinder.TSHPV.min = 15;
        json_CS_ReWinder.TSHPV.max = 100;
        json_CS_ReWinder.TSHPV.value = Value_CS_ReWinder_TSHPV.value.value;
        json_CS_ReWinder.TSLSV = {};
        json_CS_ReWinder.TSLSV.unit = 'N';
        json_CS_ReWinder.TSLSV.min = 15;
        json_CS_ReWinder.TSLSV.max = 100;
        json_CS_ReWinder.TSLSV.value = Value_CS_ReWinder_TSLSV.value.value;
        json_CS_ReWinder.TSLPV = {};
        json_CS_ReWinder.TSLPV.unit = 'N';
        json_CS_ReWinder.TSLPV.min = 15;
        json_CS_ReWinder.TSLPV.max = 100;
        json_CS_ReWinder.TSLPV.value = Value_CS_ReWinder_TSLPV.value.value;
        json_CS_ReWinder.DH = {};
        json_CS_ReWinder.DH.unit = 'mm';
        json_CS_ReWinder.DH.min = 71.6;
        json_CS_ReWinder.DH.max = 500.0;
        json_CS_ReWinder.DH.value = Value_CS_ReWinder_DH.value.value;
        json_CS_ReWinder.DL = {};
        json_CS_ReWinder.DL.unit = 'mm';
        json_CS_ReWinder.DL.min = 71.6;
        json_CS_ReWinder.DL.max = 500.0;
        json_CS_ReWinder.DL.value = Value_CS_ReWinder_DL.value.value;
	json_CS_ReWinder.Active = Value_CS_active.value.value;

        await sendKafkaMessage(topic_CS_UnWinder, json_CS_UnWinder);
        await sendKafkaMessage(topic_CS_Knife, json_CS_Knife);
        await sendKafkaMessage(topic_CS_ReWinder, json_CS_ReWinder);
        
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
