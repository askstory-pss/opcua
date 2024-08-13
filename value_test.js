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

        let json_APD_PDMixer = {}
        let topic_APD_PDMixer = 'sfs.machine.mixer.c.pd1';
        json_APD_PDMixer.BatchID = redis_value;
        json_APD_PDMixer.PRPMPV = {}
        json_APD_PDMixer.PRPMPV.unit = 'RPM';
        json_APD_PDMixer.PRPMPV.min = 0;
        json_APD_PDMixer.PRPMPV.max = 40;
        json_APD_PDMixer.PRPMPV.value = Value_APD_PDMixer_PRPMPV.value.value;
        json_APD_PDMixer.PCPV = {}
        json_APD_PDMixer.PCPV.unit = "Amp";
        json_APD_PDMixer.PCPV.min = 0.0;
        json_APD_PDMixer.PCPV.max = 15.0;
        json_APD_PDMixer.PCPV.value = (Value_APD_PDMixer_PCPV.value.value * 0.1).toFixed(1) * 1;
        json_APD_PDMixer.DRPMPV = {}
        json_APD_PDMixer.DRPMPV.unit = "RPM";
        json_APD_PDMixer.DRPMPV.min = 0;
        json_APD_PDMixer.DRPMPV.max = 3000;
        json_APD_PDMixer.DRPMPV.value = Value_APD_PDMixer_DRPMPV.value.value;
        json_APD_PDMixer.DCPV = {}
        json_APD_PDMixer.DCPV.unit = "Amp";
        json_APD_PDMixer.DCPV.min = 0.0;
        json_APD_PDMixer.DCPV.max = 15.0;
        json_APD_PDMixer.DCPV.value = (Value_APD_PDMixer_DCPV.value.value * 0.1).toFixed(1) * 1;
        json_APD_PDMixer.PASNo = {}
        json_APD_PDMixer.PASNo.min = 0;
        json_APD_PDMixer.PASNo.max = 10;
        json_APD_PDMixer.PASNo.value = Value_APD_PDMixer_PASNo.value.value;
        json_APD_PDMixer.MTimeSV = {}
        json_APD_PDMixer.MTimeSV.unit = "Min";
        json_APD_PDMixer.MTimeSV.min = 0;
        json_APD_PDMixer.MTimeSV.max = 99;
        json_APD_PDMixer.MTimeSV.value = Value_APD_PDMixer_MTimeSV.value.value;
        json_APD_PDMixer.MOTSV = {}
        json_APD_PDMixer.MOTSV.unit = "Min";
        json_APD_PDMixer.MOTSV.min = 0;
        json_APD_PDMixer.MOTSV.max = 99;
        json_APD_PDMixer.MOTSV.value = Value_APD_PDMixer_MOTSV.value.value;
        json_APD_PDMixer.MTSV = {}
        json_APD_PDMixer.MTSV.unit = "°C";
        json_APD_PDMixer.MTSV.min = 0.0;
        json_APD_PDMixer.MTSV.max = 200.0;
        json_APD_PDMixer.MTSV.value = (Value_APD_PDMixer_MTSV.value.value * 0.1).toFixed(1) * 1;
        json_APD_PDMixer.TPV = {}
        json_APD_PDMixer.TPV.unit = "°C";
        json_APD_PDMixer.TPV.min = 0.0;
        json_APD_PDMixer.TPV.max = 200.0;
        json_APD_PDMixer.TPV.value = (Value_APD_PDMixer_TPV.value.value * 0.1).toFixed(1) * 1;
        const APD_PDMixer_Bit2 = binaryDigits(Value_APD_PDMixer_Bit2.value.value, 2);
        json_APD_PDMixer.VOP = APD_PDMixer_Bit2[1];
        json_APD_PDMixer.VE = APD_PDMixer_Bit2[0];
        json_APD_PDMixer.EqStatus = Value_APD_PDMixer_EqStatus.value.value;
        json_APD_PDMixer.PCStatus = Value_APD_PDMixer_PCStatus.value.value;
        json_APD_PDMixer.Active = Value_APD_active.value.value;
        
        console.log(Value_APD_PDMixer_TPV.value.value);
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
