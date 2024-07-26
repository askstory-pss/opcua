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
const nodeId_CPRead_LotNo = "ns=6;s=::CPRead:ReadData.LotNo";
const nodeId_CPRead_ETC = "ns=6;s=::CPRead:ReadData.ETC";

const nodeId_CPRead_UnWinder_TSSV = "ns=6;s=::CPRead:ReadData.UnWinder.TSSV";
const nodeId_CPRead_UnWinder_TSPV = "ns=6;s=::CPRead:ReadData.UnWinder.TSPV";
const nodeId_CPRead_UnWinder_Diameter = "ns=6;s=::CPRead:ReadData.UnWinder.Diameter";

const nodeId_CPRead_Press_RollTSV = "ns=6;s=::CPRead:ReadData.Press.RollTSV";
const nodeId_CPRead_Press_RollTPV = "ns=6;s=::CPRead:ReadData.Press.RollTPV";
const nodeId_CPRead_Press_RollBSV = "ns=6;s=::CPRead:ReadData.Press.RollBSV";
const nodeId_CPRead_Press_RollBPV = "ns=6;s=::CPRead:ReadData.Press.RollBPV";
const nodeId_CPRead_Press_PreHTSV = "ns=6;s=::CPRead:ReadData.Press.PreHTSV";
const nodeId_CPRead_Press_PreHTPV = "ns=6;s=::CPRead:ReadData.Press.PreHTPV";
const nodeId_CPRead_Press_PreHBSV = "ns=6;s=::CPRead:ReadData.Press.PreHBSV";
const nodeId_CPRead_Press_PreHBPV = "ns=6;s=::CPRead:ReadData.Press.PreHBPV";
const nodeId_CPRead_Press_SPOS = "ns=6;s=::CPRead:ReadData.Press.SPOS";
const nodeId_CPRead_Press_SPDS = "ns=6;s=::CPRead:ReadData.Press.SPDS";
const nodeId_CPRead_Press_HDHOS = "ns=6;s=::CPRead:ReadData.Press.HDHOS";
const nodeId_CPRead_Press_HDHDS = "ns=6;s=::CPRead:ReadData.Press.HDHDS";
const nodeId_CPRead_Press_HDLOS = "ns=6;s=::CPRead:ReadData.Press.HDLOS";
const nodeId_CPRead_Press_HDLDS = "ns=6;s=::CPRead:ReadData.Press.HDLDS";
const nodeId_CPRead_Press_FP = "ns=6;s=::CPRead:ReadData.Press.FP";
const nodeId_CPRead_Press_GDDS = "ns=6;s=::CPRead:ReadData.Press.GDDS";

const nodeId_CPRead_OutFeed_TSDS = "ns=6;s=::CPRead:ReadData.OutFeed.TSDS";
const nodeId_CPRead_OutFeed_TSOS = "ns=6;s=::CPRead:ReadData.OutFeed.TSOS";
const nodeId_CPRead_OutFeed_PreHSRSV = "ns=6;s=::CPRead:ReadData.OutFeed.PreHSRSV";
const nodeId_CPRead_OutFeed_CoolSRSV = "ns=6;s=::CPRead:ReadData.OutFeed.CoolSRSV";
const nodeId_CPRead_OutFeed_CoolTSV = "ns=6;s=::CPRead:ReadData.OutFeed.CoolTSV";
const nodeId_CPRead_OutFeed_CoolTPV = "ns=6;s=::CPRead:ReadData.OutFeed.CoolTPV";

const nodeId_CPRead_ReWinder_TSSV = "ns=6;s=::CPRead:ReadData.ReWinder.TSSV";
const nodeId_CPRead_ReWinder_TSPV = "ns=6;s=::CPRead:ReadData.ReWinder.TSPV";
const nodeId_CPRead_ReWinder_Diameter = "ns=6;s=::CPRead:ReadData.ReWinder.Diameter";

const nodeId_CPRead_IHA_DSIHASV = "ns=6;s=::CPRead:ReadData.IHA.DSIHASV";
const nodeId_CPRead_IHA_OSIHASV = "ns=6;s=::CPRead:ReadData.IHA.OSIHASV";
const nodeId_CPRead_IHA_IHAMode = "ns=6;s=::CPRead:ReadData.IHA.IHAMode";

const nodeId_CPRead_active = "ns=6;s=::CPRead:ReadBlock_0.Active";

const nodeId_CPRead_Main_Req = "ns=6;s=::CPRead:ReadData.Main.Req";
const nodeId_CPWrite_Main_Rep = "ns=6;s=::CPWrite:WriteData.Main.Rep";
const nodeId_CPRead_Main_ProdLen = "ns=6;s=::CPRead:ReadData.Main.ProdLen";
const nodeId_CPRead_Main_PressLen = "ns=6;s=::CPRead:ReadData.Main.PressLen";

const nodeId_CPRead_Main_LSPSV = "ns=6;s=::CPRead:ReadData.Main.LSPSV";
const nodeId_CPRead_Main_LSPPV = "ns=6;s=::CPRead:ReadData.Main.LSPPV";

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
        const Value_CP_LotNo = await session.read({ nodeId: nodeId_CPRead_LotNo, attributeId: AttributeIds.Value });
        const Value_CP_ETC = await session.read({ nodeId: nodeId_CPRead_ETC, attributeId: AttributeIds.Value });
    
        const Value_CP_UnWinder_TSSV = await session.read({ nodeId: nodeId_CPRead_UnWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_CP_UnWinder_TSPV = await session.read({ nodeId: nodeId_CPRead_UnWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_CP_UnWinder_Diameter = await session.read({ nodeId: nodeId_CPRead_UnWinder_Diameter, attributeId: AttributeIds.Value });
    
        const Value_CP_Press_RollTSV = await session.read({ nodeId: nodeId_CPRead_Press_RollTSV, attributeId: AttributeIds.Value });
        const Value_CP_Press_RollTPV = await session.read({ nodeId: nodeId_CPRead_Press_RollTPV, attributeId: AttributeIds.Value });
        const Value_CP_Press_RollBSV = await session.read({ nodeId: nodeId_CPRead_Press_RollBSV, attributeId: AttributeIds.Value });
        const Value_CP_Press_RollBPV = await session.read({ nodeId: nodeId_CPRead_Press_RollBPV, attributeId: AttributeIds.Value });
        const Value_CP_Press_PreHTSV = await session.read({ nodeId: nodeId_CPRead_Press_PreHTSV, attributeId: AttributeIds.Value });
        const Value_CP_Press_PreHTPV = await session.read({ nodeId: nodeId_CPRead_Press_PreHTPV, attributeId: AttributeIds.Value });
        const Value_CP_Press_PreHBSV = await session.read({ nodeId: nodeId_CPRead_Press_PreHBSV, attributeId: AttributeIds.Value });
        const Value_CP_Press_PreHBPV = await session.read({ nodeId: nodeId_CPRead_Press_PreHBPV, attributeId: AttributeIds.Value });
        const Value_CP_Press_SPOS = await session.read({ nodeId: nodeId_CPRead_Press_SPOS, attributeId: AttributeIds.Value });
        const Value_CP_Press_SPDS = await session.read({ nodeId: nodeId_CPRead_Press_SPDS, attributeId: AttributeIds.Value });
        const Value_CP_Press_HDHOS = await session.read({ nodeId: nodeId_CPRead_Press_HDHOS, attributeId: AttributeIds.Value });
        const Value_CP_Press_HDHDS = await session.read({ nodeId: nodeId_CPRead_Press_HDHDS, attributeId: AttributeIds.Value });
        const Value_CP_Press_HDLOS = await session.read({ nodeId: nodeId_CPRead_Press_HDLOS, attributeId: AttributeIds.Value });
        const Value_CP_Press_HDLDS = await session.read({ nodeId: nodeId_CPRead_Press_HDLDS, attributeId: AttributeIds.Value });
        const Value_CP_Press_FP = await session.read({ nodeId: nodeId_CPRead_Press_FP, attributeId: AttributeIds.Value });
        const Value_CP_Press_GDDS = await session.read({ nodeId: nodeId_CPRead_Press_GDDS, attributeId: AttributeIds.Value });
        
        const Value_CP_OutFeed_TSDS = await session.read({ nodeId: nodeId_CPRead_OutFeed_TSDS, attributeId: AttributeIds.Value });
        const Value_CP_OutFeed_TSOS = await session.read({ nodeId: nodeId_CPRead_OutFeed_TSOS, attributeId: AttributeIds.Value });
        const Value_CP_OutFeed_PreHSRSV = await session.read({ nodeId: nodeId_CPRead_OutFeed_PreHSRSV, attributeId: AttributeIds.Value });
        const Value_CP_OutFeed_CoolSRSV = await session.read({ nodeId: nodeId_CPRead_OutFeed_CoolSRSV, attributeId: AttributeIds.Value });
        const Value_CP_OutFeed_CoolTSV = await session.read({ nodeId: nodeId_CPRead_OutFeed_CoolTSV, attributeId: AttributeIds.Value });
        const Value_CP_OutFeed_CoolTPV = await session.read({ nodeId: nodeId_CPRead_OutFeed_CoolTPV, attributeId: AttributeIds.Value });
        
        const Value_CP_ReWinder_TSSV = await session.read({ nodeId: nodeId_CPRead_ReWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_CP_ReWinder_TSPV = await session.read({ nodeId: nodeId_CPRead_ReWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_CP_ReWinder_Diameter = await session.read({ nodeId: nodeId_CPRead_ReWinder_Diameter, attributeId: AttributeIds.Value });

        const Value_CP_IHA_DSIHASV = await session.read({ nodeId: nodeId_CPRead_IHA_DSIHASV, attributeId: AttributeIds.Value });
        const Value_CP_IHA_OSIHASV = await session.read({ nodeId: nodeId_CPRead_IHA_OSIHASV, attributeId: AttributeIds.Value });
        const Value_CP_IHA_IHAMode = await session.read({ nodeId: nodeId_CPRead_IHA_IHAMode, attributeId: AttributeIds.Value });
    
        const Value_CP_active = await session.read({ nodeId: nodeId_CPRead_active, attributeId: AttributeIds.Value });

        const String_LotNo = String.fromCharCode(...Value_CP_LotNo.value.value.filter(code => code !== 0 && code !== 1));
        const String_ETC = String.fromCharCode(...Value_CP_ETC.value.value.filter(code => code !== 0));

        const Value_CP_Main_Req = await session.read({ nodeId: nodeId_CPRead_Main_Req, attributeId: AttributeIds.Value });
        const Value_CP_Main_ProdLen = await session.read({ nodeId: nodeId_CPRead_Main_ProdLen, attributeId: AttributeIds.Value });
        const Value_CP_Main_PressLen = await session.read({ nodeId: nodeId_CPRead_Main_PressLen, attributeId: AttributeIds.Value });

        const Value_CP_Main_LSPSV = await session.read({ nodeId: nodeId_CPRead_Main_LSPSV, attributeId: AttributeIds.Value });
        const Value_CP_Main_LSPPV = await session.read({ nodeId: nodeId_CPRead_Main_LSPPV, attributeId: AttributeIds.Value });

        let json_CP_UnWinder = {}
        let topic_CP_UnWinder = 'sfs.machine.press.c.uw1';
        json_CP_UnWinder.LotNo = String_LotNo;
        json_CP_UnWinder.ETC = String_ETC;
        json_CP_UnWinder.TSSV = {}
        json_CP_UnWinder.TSSV.unit = "N";
        json_CP_UnWinder.TSSV.min = 40;
        json_CP_UnWinder.TSSV.max = 300;
        json_CP_UnWinder.TSSV.value = Value_CP_UnWinder_TSSV.value.value;
        json_CP_UnWinder.TSPV = {}
        json_CP_UnWinder.TSPV.unit = "N";
        json_CP_UnWinder.TSPV.min = 40;
        json_CP_UnWinder.TSPV.max = 300;
        json_CP_UnWinder.TSPV.value = Value_CP_UnWinder_TSPV.value.value;
        json_CP_UnWinder.Diameter = {};
        json_CP_UnWinder.Diameter.unit = 'mm';
        json_CP_UnWinder.Diameter.min = 96.6;
        json_CP_UnWinder.Diameter.max = 500.0;
        json_CP_UnWinder.Diameter.value = Value_CP_UnWinder_Diameter.value.value;
        json_CP_UnWinder.LSPSV = {};
        json_CP_UnWinder.LSPSV.unit = 'm/min';
        json_CP_UnWinder.LSPSV.min = 0;
        json_CP_UnWinder.LSPSV.max = 1000;
        json_CP_UnWinder.LSPSV.value = Value_CP_Main_LSPSV.value.value;
        json_CP_UnWinder.LSPPV = {};
        json_CP_UnWinder.LSPPV.unit = 'm/min';
        json_CP_UnWinder.LSPPV.min = 0;
        json_CP_UnWinder.LSPPV.max = 1000;
        json_CP_UnWinder.LSPPV.value = Value_CP_Main_LSPPV.value.value;
        json_CP_UnWinder.Len = {};
        json_CP_UnWinder.Len.unit = 'm';
        json_CP_UnWinder.Len.min = 0;
        json_CP_UnWinder.Len.max = 9000.0;
        json_CP_UnWinder.Len.ProdLen = (Value_CP_Main_ProdLen.value.value * 0.1).toFixed(2) * 1;
        json_CP_UnWinder.Len.PressLen = (Value_CP_Main_PressLen.value.value * 0.1).toFixed(2) * 1;
        if(Value_CP_Main_Req.value.value === 1){
            json_CP_UnWinder.Len.Confirm = 1;
            await writeNode(session, nodeId_CPWrite_Main_Rep, DataType.Int16, 1);
        }else{
            json_CP_UnWinder.Len.Confirm = 0;
            await writeNode(session, nodeId_CPWrite_Main_Rep, DataType.Int16, 0);
        }

        let json_CP_Press = {}
        let topic_CP_Press = 'sfs.machine.press.c.press1';
        json_CP_Press.LotNo = String_LotNo;
        json_CP_Press.ETC = String_ETC;
        json_CP_Press.RollTSV = {};
        json_CP_Press.RollTSV.unit = "°C";
        json_CP_Press.RollTSV.min = 0;
        json_CP_Press.RollTSV.max = 200;
        json_CP_Press.RollTSV.value = (Value_CP_Press_RollTSV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.RollTPV = {};
        json_CP_Press.RollTPV.unit = "°C";
        json_CP_Press.RollTPV.min = 0;
        json_CP_Press.RollTPV.max = 200;
        json_CP_Press.RollTPV.value = (Value_CP_Press_RollTPV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.RollBSV = {};
        json_CP_Press.RollBSV.unit = "°C";
        json_CP_Press.RollBSV.min = 0;
        json_CP_Press.RollBSV.max = 200;
        json_CP_Press.RollBSV.value = (Value_CP_Press_RollBSV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.RollBPV = {};
        json_CP_Press.RollBPV.unit = "°C";
        json_CP_Press.RollBPV.min = 0;
        json_CP_Press.RollBPV.max = 200;
        json_CP_Press.RollBPV.value = (Value_CP_Press_RollBPV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.PreHTSV = {};
        json_CP_Press.PreHTSV.unit = "°C";
        json_CP_Press.PreHTSV.min = 0;
        json_CP_Press.PreHTSV.max = 200;
        json_CP_Press.PreHTSV.value = (Value_CP_Press_PreHTSV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.PreHTPV = {};
        json_CP_Press.PreHTPV.unit = "°C";
        json_CP_Press.PreHTPV.min = 0;
        json_CP_Press.PreHTPV.max = 200;
        json_CP_Press.PreHTPV.value = (Value_CP_Press_PreHTPV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.PreHBSV = {};
        json_CP_Press.PreHBSV.unit = "°C";
        json_CP_Press.PreHBSV.min = 0;
        json_CP_Press.PreHBSV.max = 200;
        json_CP_Press.PreHBSV.value = (Value_CP_Press_PreHBSV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.PreHBPV = {};
        json_CP_Press.PreHBPV.unit = "°C";
        json_CP_Press.PreHBPV.min = 0;
        json_CP_Press.PreHBPV.max = 200;
        json_CP_Press.PreHBPV.value = (Value_CP_Press_PreHBPV.value.value * 0.1).toFixed(2) * 1;
        json_CP_Press.SPOS = {};
        json_CP_Press.SPOS.unit = "bar";
        json_CP_Press.SPOS.min = 0;
        json_CP_Press.SPOS.max = 200;
        json_CP_Press.SPOS.value = Value_CP_Press_SPOS.value.value;
        json_CP_Press.SPDS = {};
        json_CP_Press.SPDS.unit = "bar";
        json_CP_Press.SPDS.min = 0;
        json_CP_Press.SPDS.max = 200;
        json_CP_Press.SPDS.value = Value_CP_Press_SPDS.value.value;
        json_CP_Press.HDHOS = {};
        json_CP_Press.HDHOS.unit = "bar";
        json_CP_Press.HDHOS.min = 0;
        json_CP_Press.HDHOS.max = 200;
        json_CP_Press.HDHOS.value = Value_CP_Press_HDHOS.value.value;
        json_CP_Press.HDHDS = {};
        json_CP_Press.HDHDS.unit = "bar";
        json_CP_Press.HDHDS.min = 0;
        json_CP_Press.HDHDS.max = 200;
        json_CP_Press.HDHDS.value = Value_CP_Press_HDHDS.value.value;
        json_CP_Press.HDLOS = {};
        json_CP_Press.HDLOS.unit = "bar";
        json_CP_Press.HDLOS.min = 0;
        json_CP_Press.HDLOS.max = 200;
        json_CP_Press.HDLOS.value = Value_CP_Press_HDLOS.value.value;
        json_CP_Press.HDLDS = {};
        json_CP_Press.HDLDS.unit = "bar";
        json_CP_Press.HDLDS.min = 0;
        json_CP_Press.HDLDS.max = 200;
        json_CP_Press.HDLDS.value = Value_CP_Press_HDLDS.value.value;
        json_CP_Press.FP = {};
        json_CP_Press.FP.unit = "Ton/cm";
        json_CP_Press.FP.min = 0;
        json_CP_Press.FP.max = 100;
        json_CP_Press.FP.value = Value_CP_Press_FP.value.value;
        json_CP_Press.GDOS = {};
        json_CP_Press.GDOS.unit = "mm";
        json_CP_Press.GDOS.min = 45.000;
        json_CP_Press.GDOS.max = 150.000;
        json_CP_Press.GDOS.value = (Value_CP_Press_GDDS.value.value * 0.001).toFixed(3) * 1;

        let json_CP_OutFeed = {}
        let topic_CP_OutFeed = 'sfs.machine.press.c.of1';
        json_CP_OutFeed.LotNo = String_LotNo;
        json_CP_OutFeed.ETC = String_ETC;
        json_CP_OutFeed.TSDS = {};
        json_CP_OutFeed.TSDS.unit = "μm";
        json_CP_OutFeed.TSDS.min = 0;
        json_CP_OutFeed.TSDS.max = 250.0;
        json_CP_OutFeed.TSDS.value = (Value_CP_OutFeed_TSDS.value.value * 0.1).toFixed(2) * 1;
        json_CP_OutFeed.TSOS = {};
        json_CP_OutFeed.TSOS.unit = "μm";
        json_CP_OutFeed.TSOS.min = 0;
        json_CP_OutFeed.TSOS.max = 250.0;
        json_CP_OutFeed.TSOS.value = (Value_CP_OutFeed_TSOS.value.value * 0.1).toFixed(2) * 1;
        json_CP_OutFeed.PreHSRSV = {};
        json_CP_OutFeed.PreHSRSV.unit = "%";
        json_CP_OutFeed.PreHSRSV.min = 98.00;
        json_CP_OutFeed.PreHSRSV.max = 102.00;
        json_CP_OutFeed.PreHSRSV.value = (Value_CP_OutFeed_PreHSRSV.value.value * 0.01).toFixed(2) * 1;
        json_CP_OutFeed.CoolSRSV = {};
        json_CP_OutFeed.CoolSRSV.unit = "%";
        json_CP_OutFeed.CoolSRSV.min = 98.00;
        json_CP_OutFeed.CoolSRSV.max = 102.00;
        json_CP_OutFeed.CoolSRSV.value = (Value_CP_OutFeed_CoolSRSV.value.value * 0.01).toFixed(2) * 1;
        json_CP_OutFeed.CoolTSV = {};
        json_CP_OutFeed.CoolTSV.unit = "%";
        json_CP_OutFeed.CoolTSV.min = 0;
        json_CP_OutFeed.CoolTSV.max = 100.0;
        json_CP_OutFeed.CoolTSV.value = (Value_CP_OutFeed_CoolTSV.value.value * 0.1).toFixed(2) * 1;
        json_CP_OutFeed.CoolTPV = {};
        json_CP_OutFeed.CoolTPV.unit = "%";
        json_CP_OutFeed.CoolTPV.min = 0;
        json_CP_OutFeed.CoolTPV.max = 100.0;
        json_CP_OutFeed.CoolTPV.value = (Value_CP_OutFeed_CoolTPV.value.value * 0.1).toFixed(2) * 1;

        const Value_CP_IHA_DSIHASV2 = new Float32Array(Value_CP_IHA_DSIHASV.value.value.length);
        for (let i = 0; i < Value_CP_IHA_DSIHASV.value.value.length; i++) {
            Value_CP_IHA_DSIHASV2[i] = Value_CP_IHA_DSIHASV.value.value[i] / 100;
        }
        const Value_CP_IHA_OSIHASV2 = new Float32Array(Value_CP_IHA_OSIHASV.value.value?.length);
        for (let i = 0; i < Value_CP_IHA_OSIHASV.value.value?.length; i++) {
            Value_CP_IHA_OSIHASV2[i] = Value_CP_IHA_OSIHASV.value.value[i] / 100;
        }

        let json_CP_ReWinder = {}
        let topic_CP_ReWinder = 'sfs.machine.press.c.rw1';
        json_CP_ReWinder.LotNo = String_LotNo;
        json_CP_ReWinder.ETC = String_ETC;
        json_CP_ReWinder.TSSV = {};
        json_CP_ReWinder.TSSV.unit = 'N';
        json_CP_ReWinder.TSSV.min = 40;
        json_CP_ReWinder.TSSV.max = 300;
        json_CP_ReWinder.TSSV.value = Value_CP_ReWinder_TSSV.value.value;
        json_CP_ReWinder.TSPV = {};
        json_CP_ReWinder.TSPV.unit = 'N';
        json_CP_ReWinder.TSPV.min = 40;
        json_CP_ReWinder.TSPV.max = 300;
        json_CP_ReWinder.TSPV.value = Value_CP_ReWinder_TSPV.value.value;
        json_CP_ReWinder.Diameter = {};
        json_CP_ReWinder.Diameter.unit = 'N';
        json_CP_ReWinder.Diameter.min = 96.6;
        json_CP_ReWinder.Diameter.max = 500.0;
        json_CP_ReWinder.Diameter.value = Value_CP_ReWinder_Diameter.value.value;
        json_CP_ReWinder.DSIHASV = {};
        json_CP_ReWinder.DSIHASV.unit = 'Kw';
        json_CP_ReWinder.DSIHASV.min = 0;
        json_CP_ReWinder.DSIHASV.max = 30.00;
        json_CP_ReWinder.DSIHASV.value = Value_CP_IHA_DSIHASV2;
        json_CP_ReWinder.OSIHASV = {};
        json_CP_ReWinder.OSIHASV.unit = 'Kw';
        json_CP_ReWinder.OSIHASV.min = 0;
        json_CP_ReWinder.OSIHASV.max = 30.00;
        json_CP_ReWinder.OSIHASV.value = Value_CP_IHA_OSIHASV2;
        json_CP_ReWinder.IHAMode = {};
        json_CP_ReWinder.IHAMode.min = 0;
        json_CP_ReWinder.IHAMode.max = 1;
        json_CP_ReWinder.IHAMode.value = Value_CP_IHA_IHAMode.value.value;
        json_CP_ReWinder.Active = Value_CP_active.value.value;

        await sendKafkaMessage(topic_CP_UnWinder, json_CP_UnWinder);
        await sendKafkaMessage(topic_CP_Press, json_CP_Press);
        await sendKafkaMessage(topic_CP_OutFeed, json_CP_OutFeed);
        await sendKafkaMessage(topic_CP_ReWinder, json_CP_ReWinder);
        
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
