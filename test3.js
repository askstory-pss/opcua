const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

// Your OPC UA server endpoint
const endpointUrl = "opc.tcp://10.10.10.92:4840";

// 50L
const nodeId_CPDRead_PDMixer_BatchID = "ns=6;s=::CPDRead:PDMixer.BatchID";
const nodeId_APDRead_PDMixer_BatchID = "ns=6;s=::APDRead:PDMixer.BatchID";

const nodeId_CPDWrite_PDMixer_BatchID = "ns=6;s=::CPDWrite:PDMixer.BatchID";
const nodeId_APDWrite_PDMixer_BatchID = "ns=6;s=::APDWrite:PDMixer.BatchID";
// MAIN
const nodeId_CMSRead_MMixer_BatchID = "ns=6;s=::CMSRead:MMixer.BatchID";
const nodeId_AMSRead_MMixer_BatchID = "ns=6;s=::AMSRead:MMixer.BatchID";

const nodeId_CMSWrite_MMixer_BatchID = "ns=6;s=::CMSWrite:MMixer.BatchID";
const nodeId_AMSWrite_MMixer_BatchID = "ns=6;s=::AMSWrite:MMixer.BatchID";

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

async function collectAndSendData(session) {
    try {
        const Value_CPDRead_PDMixer_BatchID = await session.read({ nodeId: nodeId_CPDRead_PDMixer_BatchID, attributeId: AttributeIds.Value });
        const Value_APDRead_PDMixer_BatchID = await session.read({ nodeId: nodeId_APDRead_PDMixer_BatchID, attributeId: AttributeIds.Value });

        const Value_CMSRead_MMixer_BatchID = await session.read({ nodeId: nodeId_CMSRead_MMixer_BatchID, attributeId: AttributeIds.Value });
        const Value_AMSRead_MMixer_BatchID = await session.read({ nodeId: nodeId_AMSRead_MMixer_BatchID, attributeId: AttributeIds.Value });

        //await writeNode(session, nodeId_CMSWrite_MMixer_BatchID, DataType.String, "BatchIdTest");
        //await writeNode(session, nodeId_AMSWrite_MMixer_BatchID, DataType.String, "BatchIdTest");

        console.log(Value_CPDRead_PDMixer_BatchID.value.value);
        console.log(Value_APDRead_PDMixer_BatchID.value.value);
        console.log(Value_CMSRead_MMixer_BatchID.value.value);
        console.log(Value_AMSRead_MMixer_BatchID.value.value);

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

        // const run = async () => {
        //     while (true) {
        //         await collectAndSendData(session);
        //         await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기
        //     }
        // };
        // run().catch(console.error);
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
