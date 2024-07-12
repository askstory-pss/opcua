const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

// Your OPC UA server endpoint
const endpointUrl = "opc.tcp://10.10.10.91:4840";

const nodeId_APRead_Com_Req = "ns=6;s=::APRead:ReadData.Com.Req";
//const nodeId_APRead_Com_Rep = "ns=6;s=::APRead:ReadData.Com.Rep";
const nodeId_APRead_Len_ProdLen = "ns=6;s=::APRead:ReadData.Len.ProdLen";
const nodeId_APRead_Len_PressLen = "ns=6;s=::APRead:ReadData.Len.PressLen";

const nodeId_CPRead_Com_Req = "ns=6;s=::CPRead:ReadData.Com.Req";
//const nodeId_CPRead_Com_Rep = "ns=6;s=::CPRead:ReadData.Com.Rep";
const nodeId_CPRead_Len_ProdLen = "ns=6;s=::CPRead:ReadData.Len.ProdLen";
const nodeId_CPRead_Len_PressLen = "ns=6;s=::CPRead:ReadData.Len.PressLen";

const nodeId_ASRead_Com_Req = "ns=6;s=::ASRead:ReadData.Com.Req";
//const nodeId_ASRead_Com_Rep = "ns=6;s=::ASRead:ReadData.Com.Rep";
const nodeId_ASRead_Len_ProdLen = "ns=6;s=::ASRead:ReadData.Len.ProdLen";
const nodeId_ASRead_Len_PressLen = "ns=6;s=::ASRead:ReadData.Len.PressLen";

const nodeId_CSRead_Com_Req = "ns=6;s=::CSRead:ReadData.Com.Req";
//const nodeId_CSRead_Com_Rep = "ns=6;s=::CSRead:ReadData.Com.Rep";
const nodeId_CSRead_Len_ProdLen = "ns=6;s=::CSRead:ReadData.Len.ProdLen";
const nodeId_CSRead_Len_PressLen = "ns=6;s=::CSRead:ReadData.Len.PressLen";

async function collectAndSendData(session) {
    try {
        const Value_AP_Com_Req = await session.read({ nodeId: nodeId_APRead_Com_Req, attributeId: AttributeIds.Value });
        const Value_AP_Len_ProdLen = await session.read({ nodeId: nodeId_APRead_Len_ProdLen, attributeId: AttributeIds.Value });
        const Value_AP_Len_PressLen = await session.read({ nodeId: nodeId_APRead_Len_PressLen, attributeId: AttributeIds.Value });
        const Value_CP_Com_Req = await session.read({ nodeId: nodeId_CPRead_Com_Req, attributeId: AttributeIds.Value });
        const Value_CP_Len_ProdLen = await session.read({ nodeId: nodeId_CPRead_Len_ProdLen, attributeId: AttributeIds.Value });
        const Value_CP_Len_PressLen = await session.read({ nodeId: nodeId_CPRead_Len_PressLen, attributeId: AttributeIds.Value });
        const Value_AS_Com_Req = await session.read({ nodeId: nodeId_ASRead_Com_Req, attributeId: AttributeIds.Value });
        const Value_AS_Len_ProdLen = await session.read({ nodeId: nodeId_ASRead_Len_ProdLen, attributeId: AttributeIds.Value });
        const Value_AS_Len_PressLen = await session.read({ nodeId: nodeId_ASRead_Len_PressLen, attributeId: AttributeIds.Value });
        const Value_CS_Com_Req = await session.read({ nodeId: nodeId_CSRead_Com_Req, attributeId: AttributeIds.Value });
        const Value_CS_Len_ProdLen = await session.read({ nodeId: nodeId_CSRead_Len_ProdLen, attributeId: AttributeIds.Value });
        const Value_CS_Len_PressLen = await session.read({ nodeId: nodeId_CSRead_Len_PressLen, attributeId: AttributeIds.Value });

        console.log(Value_AP_Com_Req.value.value);
        console.log(Value_AP_Len_ProdLen.value.value);
        console.log(Value_AP_Len_PressLen.value.value);
        console.log(Value_CP_Com_Req.value.value);
        console.log(Value_CP_Len_ProdLen.value.value);
        console.log(Value_CP_Len_PressLen.value.value);
        console.log(Value_AS_Com_Req.value.value);
        console.log(Value_AS_Len_ProdLen.value.value);
        console.log(Value_AS_Len_PressLen.value.value);
        console.log(Value_CS_Com_Req.value.value);
        console.log(Value_CS_Len_ProdLen.value.value);
        console.log(Value_CS_Len_PressLen.value.value);

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

async function sendKafkaMessage(topic, messages) {

    await producer.send({
        topic: topic, // 전송할 토픽
        messages: [
        { value: JSON.stringify(messages) } // 전송할 메시지
        ],
    });
}

main();
