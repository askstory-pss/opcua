const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');

const redis = require('redis');

const redis_client = redis.createClient();

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['10.10.10.52:9092']
});

const producer = kafka.producer();

const endpointUrl = "opc.tcp://10.10.10.92:4840";

const nodeId_CPDRead_PDMixer_PRPMPV = "ns=6;s=::CPDRead:PDMixer.PRPMPV";
const nodeId_CPDRead_PDMixer_PCPV = "ns=6;s=::CPDRead:PDMixer.PCPV";
const nodeId_CPDRead_PDMixer_DRPMPV = "ns=6;s=::CPDRead:PDMixer.DRPMPV";
const nodeId_CPDRead_PDMixer_DCPV = "ns=6;s=::CPDRead:PDMixer.DCPV";
const nodeId_CPDRead_PDMixer_PASNo = "ns=6;s=::CPDRead:PDMixer.PASNo";
const nodeId_CPDRead_PDMixer_MTimeSV = "ns=6;s=::CPDRead:PDMixer.MTimeSV";
const nodeId_CPDRead_PDMixer_MOTSV = "ns=6;s=::CPDRead:PDMixer.MOTSV";
const nodeId_CPDRead_PDMixer_MTSV = "ns=6;s=::CPDRead:PDMixer.MTSV";
const nodeId_CPDRead_PDMixer_TPV = "ns=6;s=::CPDRead:PDMixer.TPV";
const nodeId_CPDRead_PDMixer_Bit2 = "ns=6;s=::CPDRead:PDMixer.Bit2";

const nodeId_CPDRead_PDMixer_EqStatus = "ns=6;s=::CPDRead:PDMixer.EqStatus";
const nodeId_CPDRead_PDMixer_PCStatus = "ns=6;s=::CPDRead:PDMixer.PCStatus";
const nodeId_CPDRead_PDMixer_EqCM = "ns=6;s=::CPDRead:PDMixer.CMode";

const nodeId_CPDRead_active = "ns=6;s=::CPDRead:ReadBlock_0.Active";

function decimalToBinary(decimal, numDigits) {
    let binary = '';
    let num = decimal;

    while (num > 0) {
        binary = (num & 1) + binary;
        num >>= 1;
    }

    while (binary.length < numDigits) {
        binary = '0' + binary;
    }

    return binary;
}

function binaryDigits(decimal, numDigits) {
    const binary = decimalToBinary(decimal, numDigits);
    const digits = [];

    for (let i = 0; i < binary.length; i++) {
        digits.push(Number(binary.charAt(i)));
    }

    return digits;
}

async function collectAndSendData(session, redis_value) {
    try {
        const Value_CPD_PDMixer_PRPMPV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_PRPMPV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_PCPV= await session.read({ nodeId: nodeId_CPDRead_PDMixer_PCPV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_DRPMPV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_DRPMPV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_DCPV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_DCPV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_PASNo = await session.read({ nodeId: nodeId_CPDRead_PDMixer_PASNo, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_MTimeSV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_MTimeSV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_MOTSV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_MOTSV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_MTSV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_MTSV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_TPV = await session.read({ nodeId: nodeId_CPDRead_PDMixer_TPV, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_Bit2 = await session.read({ nodeId: nodeId_CPDRead_PDMixer_Bit2, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_EqStatus = await session.read({ nodeId: nodeId_CPDRead_PDMixer_EqStatus, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_PCStatus = await session.read({ nodeId: nodeId_CPDRead_PDMixer_PCStatus, attributeId: AttributeIds.Value });
        const Value_CPD_PDMixer_EqCM = await session.read({ nodeId: nodeId_CPDRead_PDMixer_EqCM, attributeId: AttributeIds.Value });
        const Value_CPD_active = await session.read({ nodeId: nodeId_CPDRead_active, attributeId: AttributeIds.Value });

        let json_CPD_PDMixer = {}
        let topic_CPD_PDMixer = 'sfs.machine.mixer.a.pd1';
        json_CPD_PDMixer.BatchID = redis_value;
        json_CPD_PDMixer.PRPMPV = {}
        json_CPD_PDMixer.PRPMPV.unit = 'RPM';
        json_CPD_PDMixer.PRPMPV.min = 0;
        json_CPD_PDMixer.PRPMPV.max = 40;
        json_CPD_PDMixer.PRPMPV.value = Value_CPD_PDMixer_PRPMPV.value.value;
        json_CPD_PDMixer.PCPV = {}
        json_CPD_PDMixer.PCPV.unit = "Amp";
        json_CPD_PDMixer.PCPV.min = 0.0;
        json_CPD_PDMixer.PCPV.max = 15.0;
        json_CPD_PDMixer.PCPV.value = (Value_CPD_PDMixer_PCPV.value.value * 0.1).toFixed(1) * 1;
        json_CPD_PDMixer.DRPMPV = {}
        json_CPD_PDMixer.DRPMPV.unit = "RPM";
        json_CPD_PDMixer.DRPMPV.min = 0;
        json_CPD_PDMixer.DRPMPV.max = 3000;
        json_CPD_PDMixer.DRPMPV.value = Value_CPD_PDMixer_DRPMPV.value.value;
        json_CPD_PDMixer.DCPV = {}
        json_CPD_PDMixer.DCPV.unit = "Amp";
        json_CPD_PDMixer.DCPV.min = 0.0;
        json_CPD_PDMixer.DCPV.max = 15.0;
        json_CPD_PDMixer.DCPV.value = (Value_CPD_PDMixer_DCPV.value.value * 0.1).toFixed(1) * 1;
        json_CPD_PDMixer.PASNo = {}
        json_CPD_PDMixer.PASNo.min = 0;
        json_CPD_PDMixer.PASNo.max = 10;
        json_CPD_PDMixer.PASNo.value = Value_CPD_PDMixer_PASNo.value.value;
        json_CPD_PDMixer.MTimeSV = {}
        json_CPD_PDMixer.MTimeSV.unit = "Min";
        json_CPD_PDMixer.MTimeSV.min = 0;
        json_CPD_PDMixer.MTimeSV.max = 99;
        json_CPD_PDMixer.MTimeSV.value = Value_CPD_PDMixer_MTimeSV.value.value;
        json_CPD_PDMixer.MOTSV = {}
        json_CPD_PDMixer.MOTSV.unit = "Min";
        json_CPD_PDMixer.MOTSV.min = 0;
        json_CPD_PDMixer.MOTSV.max = 99;
        json_CPD_PDMixer.MOTSV.value = Value_CPD_PDMixer_MOTSV.value.value;
        json_CPD_PDMixer.MTSV = {}
        json_CPD_PDMixer.MTSV.unit = "°C";
        json_CPD_PDMixer.MTSV.min = 0.0;
        json_CPD_PDMixer.MTSV.max = 200.0;
        json_CPD_PDMixer.MTSV.value = (Value_CPD_PDMixer_MTSV.value.value * 0.1).toFixed(1) * 1;
        json_CPD_PDMixer.TPV = {}
        json_CPD_PDMixer.TPV.unit = "°C";
        json_CPD_PDMixer.TPV.min = 0.0;
        json_CPD_PDMixer.TPV.max = 200.0;
        json_CPD_PDMixer.TPV.value = (Value_CPD_PDMixer_TPV.value.value * 0.1).toFixed(1) * 1;
        const CPD_PDMixer_Bit2 = binaryDigits(Value_CPD_PDMixer_Bit2.value.value, 2);
        json_CPD_PDMixer.VOP = CPD_PDMixer_Bit2[1];
        json_CPD_PDMixer.VE = CPD_PDMixer_Bit2[0];
        json_CPD_PDMixer.EqStatus = Value_CPD_PDMixer_EqStatus.value.value;
        json_CPD_PDMixer.PCStatus = Value_CPD_PDMixer_PCStatus.value.value;
        json_CPD_PDMixer.EqCM = Value_CPD_PDMixer_EqCM.value.value;
        json_CPD_PDMixer.Active = Value_CPD_active.value.value;

        await sendKafkaMessage(topic_CPD_PDMixer, json_CPD_PDMixer);
        
    } catch (error) {
        console.error('데이터 수집 및 전송 중 오류 발생:', error);
    }
}


async function main() {
    await producer.connect();
    await redis_client.connect();
    const client = OPCUAClient.create({ endpointMustExist: false });
    try{
        await client.connect(endpointUrl);
        console.log("Connected to the OPC UA server at", endpointUrl);

        const session = await client.createSession();
        console.log("Session created");

        let redis_value = await redis_client.get('anode_50');

        await collectAndSendData(session, redis_value);

        const run = async () => {
            while (true) {
		redis_value = await redis_client.get('anode_50');
                await collectAndSendData(session, redis_value);
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
            }
        };
        run().catch(console.error);
    } catch (error) {
        console.error("Initialization failed:", error);
        await producer.disconnect();
        await client.disconnect();
        await redis_client.disconnect();
    }
}

async function sendKafkaMessage(topic, messages) {

    await producer.send({
        topic: topic,
        messages: [
            { value: JSON.stringify(messages) }
        ],
    });
}

main();
