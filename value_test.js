const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

// Your OPC UA server endpoint//
const endpointUrl = "opc.tcp://10.10.10.92:4840";

// The nodeId of the variable you want to read
const nodeId_APDRead_PDMixer_PRPMPV = "ns=6;s=::APDRead:PDMixer.PRPMPV";
const nodeId_APDRead_PDMixer_PCPV = "ns=6;s=::APDRead:PDMixer.PCPV";
const nodeId_APDRead_PDMixer_DRPMPV = "ns=6;s=::APDRead:PDMixer.DRPMPV";
const nodeId_APDRead_PDMixer_DCPV = "ns=6;s=::APDRead:PDMixer.DCPV";
const nodeId_APDRead_PDMixer_PASNo = "ns=6;s=::APDRead:PDMixer.PASNo";
const nodeId_APDRead_PDMixer_MTimeSV = "ns=6;s=::APDRead:PDMixer.MTimeSV";
const nodeId_APDRead_PDMixer_MOTSV = "ns=6;s=::APDRead:PDMixer.MOTSV";
const nodeId_APDRead_PDMixer_MTSV = "ns=6;s=::APDRead:PDMixer.MTSV";
const nodeId_APDRead_PDMixer_TPV = "ns=6;s=::APDRead:PDMixer.TPV";
const nodeId_APDRead_PDMixer_Bit2 = "ns=6;s=::APDRead:PDMixer.Bit2";

const nodeId_APDRead_PDMixer_EqStatus = "ns=6;s=::APDRead:PDMixer.EqStatus";
const nodeId_APDRead_PDMixer_PCStatus = "ns=6;s=::APDRead:PDMixer.PCStatus";

const nodeId_APDRead_active = "ns=6;s=::APDRead:ReadBlock_0.Active";

async function collectAndSendData(session, redis_value) {
    try {
        const Value_APD_PDMixer_PRPMPV = await session.read({ nodeId: nodeId_APDRead_PDMixer_PRPMPV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_PCPV= await session.read({ nodeId: nodeId_APDRead_PDMixer_PCPV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_DRPMPV = await session.read({ nodeId: nodeId_APDRead_PDMixer_DRPMPV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_DCPV = await session.read({ nodeId: nodeId_APDRead_PDMixer_DCPV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_PASNo = await session.read({ nodeId: nodeId_APDRead_PDMixer_PASNo, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_MTimeSV = await session.read({ nodeId: nodeId_APDRead_PDMixer_MTimeSV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_MOTSV = await session.read({ nodeId: nodeId_APDRead_PDMixer_MOTSV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_MTSV = await session.read({ nodeId: nodeId_APDRead_PDMixer_MTSV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_TPV = await session.read({ nodeId: nodeId_APDRead_PDMixer_TPV, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_Bit2 = await session.read({ nodeId: nodeId_APDRead_PDMixer_Bit2, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_EqStatus = await session.read({ nodeId: nodeId_APDRead_PDMixer_EqStatus, attributeId: AttributeIds.Value });
        const Value_APD_PDMixer_PCStatus = await session.read({ nodeId: nodeId_APDRead_PDMixer_PCStatus, attributeId: AttributeIds.Value });
        const Value_APD_active = await session.read({ nodeId: nodeId_APDRead_active, attributeId: AttributeIds.Value });

        
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
                let redis_value = '';
                await collectAndSendData(session, redis_value);
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
