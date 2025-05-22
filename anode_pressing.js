const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');
const opcua = require("node-opcua-client");

const kafka = new Kafka({
    clientId: 'my-kafka-app',
    brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

// Your OPC UA server endpoint
const endpointUrl = "opc.tcp://10.10.10.91:4840";

// The nodeId of the variable you want to read
const nodeId_APRead_LotNo = "ns=6;s=::APRead:ReadData.LotNo";
const nodeId_APRead_ETC = "ns=6;s=::APRead:ReadData.ETC";

const nodeId_APRead_UnWinder_TSSV = "ns=6;s=::APRead:ReadData.UnWinder.TSSV";
const nodeId_APRead_UnWinder_TSPV = "ns=6;s=::APRead:ReadData.UnWinder.TSPV";
const nodeId_APRead_UnWinder_Diameter = "ns=6;s=::APRead:ReadData.UnWinder.Diameter";

const nodeId_APRead_Press_RollTSV = "ns=6;s=::APRead:ReadData.Press.RollTSV";
const nodeId_APRead_Press_RollTPV = "ns=6;s=::APRead:ReadData.Press.RollTPV";
const nodeId_APRead_Press_RollBSV = "ns=6;s=::APRead:ReadData.Press.RollBSV";
const nodeId_APRead_Press_RollBPV = "ns=6;s=::APRead:ReadData.Press.RollBPV";
const nodeId_APRead_Press_PreHTSV = "ns=6;s=::APRead:ReadData.Press.PreHTSV";
const nodeId_APRead_Press_PreHTPV = "ns=6;s=::APRead:ReadData.Press.PreHTPV";
const nodeId_APRead_Press_PreHBSV = "ns=6;s=::APRead:ReadData.Press.PreHBSV";
const nodeId_APRead_Press_PreHBPV = "ns=6;s=::APRead:ReadData.Press.PreHBPV";
const nodeId_APRead_Press_SPOS = "ns=6;s=::APRead:ReadData.Press.SPOS";
const nodeId_APRead_Press_SPDS = "ns=6;s=::APRead:ReadData.Press.SPDS";
const nodeId_APRead_Press_HDHOS = "ns=6;s=::APRead:ReadData.Press.HDHOS";
const nodeId_APRead_Press_HDHDS = "ns=6;s=::APRead:ReadData.Press.HDHDS";
const nodeId_APRead_Press_HDLOS = "ns=6;s=::APRead:ReadData.Press.HDLOS";
const nodeId_APRead_Press_HDLDS = "ns=6;s=::APRead:ReadData.Press.HDLDS";
const nodeId_APRead_Press_FP = "ns=6;s=::APRead:ReadData.Press.FP";
const nodeId_APRead_Press_GDDS = "ns=6;s=::APRead:ReadData.Press.GDDS";

const nodeId_APRead_OutFeed_TSDS = "ns=6;s=::APRead:ReadData.OutFeed.TSDS";
const nodeId_APRead_OutFeed_TSOS = "ns=6;s=::APRead:ReadData.OutFeed.TSOS";
const nodeId_APRead_OutFeed_PreHSRSV = "ns=6;s=::APRead:ReadData.OutFeed.PreHSRSV";
const nodeId_APRead_OutFeed_CoolSRSV = "ns=6;s=::APRead:ReadData.OutFeed.CoolSRSV";
const nodeId_APRead_OutFeed_CoolTSV = "ns=6;s=::APRead:ReadData.OutFeed.CoolTSV";
const nodeId_APRead_OutFeed_CoolTPV = "ns=6;s=::APRead:ReadData.OutFeed.CoolTPV";

const nodeId_APRead_ReWinder_TSSV = "ns=6;s=::APRead:ReadData.ReWinder.TSSV";
const nodeId_APRead_ReWinder_TSPV = "ns=6;s=::APRead:ReadData.ReWinder.TSPV";
const nodeId_APRead_ReWinder_Diameter = "ns=6;s=::APRead:ReadData.ReWinder.Diameter";

const nodeId_APRead_IHA_DSIHASV = "ns=6;s=::APRead:ReadData.IHA.DSIHASV";
const nodeId_APRead_IHA_OSIHASV = "ns=6;s=::APRead:ReadData.IHA.OSIHASV";
const nodeId_APRead_IHA_IHAMode = "ns=6;s=::APRead:ReadData.IHA.IHAMode";

const nodeId_APRead_active = "ns=6;s=::APRead:ReadBlock_0.Active";

const nodeId_APRead_Main_Req = "ns=6;s=::APRead:ReadData.Main.Req";
const nodeId_APWrite_Main_Rep = "ns=6;s=::APWrite:WriteData.Main.Rep";
const nodeId_APRead_Main_ProdLen = "ns=6;s=::APRead:ReadData.Main.ProdLen";
const nodeId_APRead_Main_PressLen = "ns=6;s=::APRead:ReadData.Main.PressLen";

const nodeId_APRead_Main_LSPSV = "ns=6;s=::APRead:ReadData.Main.LSPSV";
const nodeId_APRead_Main_LSPPV = "ns=6;s=::APRead:ReadData.Main.LSPPV";

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
        const Value_AP_LotNo = await session.read({ nodeId: nodeId_APRead_LotNo, attributeId: AttributeIds.Value });
        const Value_AP_ETC = await session.read({ nodeId: nodeId_APRead_ETC, attributeId: AttributeIds.Value });
    
        const Value_AP_UnWinder_TSSV = await session.read({ nodeId: nodeId_APRead_UnWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_AP_UnWinder_TSPV = await session.read({ nodeId: nodeId_APRead_UnWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_AP_UnWinder_Diameter = await session.read({ nodeId: nodeId_APRead_UnWinder_Diameter, attributeId: AttributeIds.Value });
    
        const Value_AP_Press_RollTSV = await session.read({ nodeId: nodeId_APRead_Press_RollTSV, attributeId: AttributeIds.Value });
        const Value_AP_Press_RollTPV = await session.read({ nodeId: nodeId_APRead_Press_RollTPV, attributeId: AttributeIds.Value });
        const Value_AP_Press_RollBSV = await session.read({ nodeId: nodeId_APRead_Press_RollBSV, attributeId: AttributeIds.Value });
        const Value_AP_Press_RollBPV = await session.read({ nodeId: nodeId_APRead_Press_RollBPV, attributeId: AttributeIds.Value });
        const Value_AP_Press_PreHTSV = await session.read({ nodeId: nodeId_APRead_Press_PreHTSV, attributeId: AttributeIds.Value });
        const Value_AP_Press_PreHTPV = await session.read({ nodeId: nodeId_APRead_Press_PreHTPV, attributeId: AttributeIds.Value });
        const Value_AP_Press_PreHBSV = await session.read({ nodeId: nodeId_APRead_Press_PreHBSV, attributeId: AttributeIds.Value });
        const Value_AP_Press_PreHBPV = await session.read({ nodeId: nodeId_APRead_Press_PreHBPV, attributeId: AttributeIds.Value });
        const Value_AP_Press_SPOS = await session.read({ nodeId: nodeId_APRead_Press_SPOS, attributeId: AttributeIds.Value });
        const Value_AP_Press_SPDS = await session.read({ nodeId: nodeId_APRead_Press_SPDS, attributeId: AttributeIds.Value });
        const Value_AP_Press_HDHOS = await session.read({ nodeId: nodeId_APRead_Press_HDHOS, attributeId: AttributeIds.Value });
        const Value_AP_Press_HDHDS = await session.read({ nodeId: nodeId_APRead_Press_HDHDS, attributeId: AttributeIds.Value });
        const Value_AP_Press_HDLOS = await session.read({ nodeId: nodeId_APRead_Press_HDLOS, attributeId: AttributeIds.Value });
        const Value_AP_Press_HDLDS = await session.read({ nodeId: nodeId_APRead_Press_HDLDS, attributeId: AttributeIds.Value });
        const Value_AP_Press_FP = await session.read({ nodeId: nodeId_APRead_Press_FP, attributeId: AttributeIds.Value });
        const Value_AP_Press_GDDS = await session.read({ nodeId: nodeId_APRead_Press_GDDS, attributeId: AttributeIds.Value });
        
        const Value_AP_OutFeed_TSDS = await session.read({ nodeId: nodeId_APRead_OutFeed_TSDS, attributeId: AttributeIds.Value });
        const Value_AP_OutFeed_TSOS = await session.read({ nodeId: nodeId_APRead_OutFeed_TSOS, attributeId: AttributeIds.Value });
        const Value_AP_OutFeed_PreHSRSV = await session.read({ nodeId: nodeId_APRead_OutFeed_PreHSRSV, attributeId: AttributeIds.Value });
        const Value_AP_OutFeed_CoolSRSV = await session.read({ nodeId: nodeId_APRead_OutFeed_CoolSRSV, attributeId: AttributeIds.Value });
        const Value_AP_OutFeed_CoolTSV = await session.read({ nodeId: nodeId_APRead_OutFeed_CoolTSV, attributeId: AttributeIds.Value });
        const Value_AP_OutFeed_CoolTPV = await session.read({ nodeId: nodeId_APRead_OutFeed_CoolTPV, attributeId: AttributeIds.Value });
        
        const Value_AP_ReWinder_TSSV = await session.read({ nodeId: nodeId_APRead_ReWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_AP_ReWinder_TSPV = await session.read({ nodeId: nodeId_APRead_ReWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_AP_ReWinder_Diameter = await session.read({ nodeId: nodeId_APRead_ReWinder_Diameter, attributeId: AttributeIds.Value });

        const Value_AP_IHA_DSIHASV = await session.read({ nodeId: nodeId_APRead_IHA_DSIHASV, attributeId: AttributeIds.Value });
        const Value_AP_IHA_OSIHASV = await session.read({ nodeId: nodeId_APRead_IHA_OSIHASV, attributeId: AttributeIds.Value });
        const Value_AP_IHA_IHAMode = await session.read({ nodeId: nodeId_APRead_IHA_IHAMode, attributeId: AttributeIds.Value });
    
        const Value_AP_active = await session.read({ nodeId: nodeId_APRead_active, attributeId: AttributeIds.Value });

        const String_LotNo = String.fromCharCode(...Value_AP_LotNo.value.value.filter(code => code !== 0 && code !== 1));
        const String_ETC = String.fromCharCode(...Value_AP_ETC.value.value.filter(code => code !== 0));

        const Value_AP_Main_Req = await session.read({ nodeId: nodeId_APRead_Main_Req, attributeId: AttributeIds.Value });
        const Value_AP_Main_ProdLen = await session.read({ nodeId: nodeId_APRead_Main_ProdLen, attributeId: AttributeIds.Value });
        const Value_AP_Main_PressLen = await session.read({ nodeId: nodeId_APRead_Main_PressLen, attributeId: AttributeIds.Value });

        const Value_AP_Main_LSPSV = await session.read({ nodeId: nodeId_APRead_Main_LSPSV, attributeId: AttributeIds.Value });
        const Value_AP_Main_LSPPV = await session.read({ nodeId: nodeId_APRead_Main_LSPPV, attributeId: AttributeIds.Value });

        let json_AP_UnWinder = {}
        let topic_AP_UnWinder = 'sfs.machine.press.a.uw1';
        json_AP_UnWinder.LotNo = String_LotNo;
        json_AP_UnWinder.ETC = String_ETC;
        json_AP_UnWinder.TSSV = {}
        json_AP_UnWinder.TSSV.unit = "N";
        json_AP_UnWinder.TSSV.min = 40;
        json_AP_UnWinder.TSSV.max = 300;
        json_AP_UnWinder.TSSV.value = Value_AP_UnWinder_TSSV.value.value;
        json_AP_UnWinder.TSPV = {}
        json_AP_UnWinder.TSPV.unit = "N";
        json_AP_UnWinder.TSPV.min = 40;
        json_AP_UnWinder.TSPV.max = 300;
        json_AP_UnWinder.TSPV.value = Value_AP_UnWinder_TSPV.value.value;
        json_AP_UnWinder.Diameter = {};
        json_AP_UnWinder.Diameter.unit = 'mm';
        json_AP_UnWinder.Diameter.min = 96.6;
        json_AP_UnWinder.Diameter.max = 500.0;
        json_AP_UnWinder.Diameter.value = Value_AP_UnWinder_Diameter.value.value;
        json_AP_UnWinder.LSPSV = {};
        json_AP_UnWinder.LSPSV.unit = 'm/min';
        json_AP_UnWinder.LSPSV.min = 0;
        json_AP_UnWinder.LSPSV.max = 1000;
        json_AP_UnWinder.LSPSV.value = Value_AP_Main_LSPSV.value.value;
        json_AP_UnWinder.LSPPV = {};
        json_AP_UnWinder.LSPPV.unit = 'm/min';
        json_AP_UnWinder.LSPPV.min = 0;
        json_AP_UnWinder.LSPPV.max = 1000;
        json_AP_UnWinder.LSPPV.value = Value_AP_Main_LSPPV.value.value;
        json_AP_UnWinder.Len = {};
        json_AP_UnWinder.Len.unit = 'm';
        json_AP_UnWinder.Len.min = 0;
        json_AP_UnWinder.Len.max = 9000.0;
        json_AP_UnWinder.Len.ProdLen = (Value_AP_Main_ProdLen.value.value * 0.1).toFixed(2) * 1;
        json_AP_UnWinder.Len.PressLen = (Value_AP_Main_PressLen.value.value * 0.1).toFixed(2) * 1;
        if(Value_AP_Main_Req.value.value === 1){
            json_AP_UnWinder.Len.Confirm = 1;
            await writeNode(session, nodeId_APWrite_Main_Rep, DataType.Int16, 1);
        }else{
            json_AP_UnWinder.Len.Confirm = 0;
            await writeNode(session, nodeId_APWrite_Main_Rep, DataType.Int16, 0);
        }

        let json_AP_Press = {}
        let topic_AP_Press = 'sfs.machine.press.a.press1';
        json_AP_Press.LotNo = String_LotNo;
        json_AP_Press.ETC = String_ETC;
        json_AP_Press.RollTSV = {};
        json_AP_Press.RollTSV.unit = "°C";
        json_AP_Press.RollTSV.min = 0;
        json_AP_Press.RollTSV.max = 200;
        json_AP_Press.RollTSV.value = (Value_AP_Press_RollTSV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.RollTPV = {};
        json_AP_Press.RollTPV.unit = "°C";
        json_AP_Press.RollTPV.min = 0;
        json_AP_Press.RollTPV.max = 200;
        json_AP_Press.RollTPV.value = (Value_AP_Press_RollTPV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.RollBSV = {};
        json_AP_Press.RollBSV.unit = "°C";
        json_AP_Press.RollBSV.min = 0;
        json_AP_Press.RollBSV.max = 200;
        json_AP_Press.RollBSV.value = (Value_AP_Press_RollBSV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.RollBPV = {};
        json_AP_Press.RollBPV.unit = "°C";
        json_AP_Press.RollBPV.min = 0;
        json_AP_Press.RollBPV.max = 200;
        json_AP_Press.RollBPV.value = (Value_AP_Press_RollBPV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.PreHTSV = {};
        json_AP_Press.PreHTSV.unit = "°C";
        json_AP_Press.PreHTSV.min = 0;
        json_AP_Press.PreHTSV.max = 200;
        json_AP_Press.PreHTSV.value = (Value_AP_Press_PreHTSV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.PreHTPV = {};
        json_AP_Press.PreHTPV.unit = "°C";
        json_AP_Press.PreHTPV.min = 0;
        json_AP_Press.PreHTPV.max = 200;
        json_AP_Press.PreHTPV.value = (Value_AP_Press_PreHTPV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.PreHBSV = {};
        json_AP_Press.PreHBSV.unit = "°C";
        json_AP_Press.PreHBSV.min = 0;
        json_AP_Press.PreHBSV.max = 200;
        json_AP_Press.PreHBSV.value = (Value_AP_Press_PreHBSV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.PreHBPV = {};
        json_AP_Press.PreHBPV.unit = "°C";
        json_AP_Press.PreHBPV.min = 0;
        json_AP_Press.PreHBPV.max = 200;
        json_AP_Press.PreHBPV.value = (Value_AP_Press_PreHBPV.value.value * 0.1).toFixed(2) * 1;
        json_AP_Press.SPOS = {};
        json_AP_Press.SPOS.unit = "bar";
        json_AP_Press.SPOS.min = 0;
        json_AP_Press.SPOS.max = 200;
        json_AP_Press.SPOS.value = Value_AP_Press_SPOS.value.value;
        json_AP_Press.SPDS = {};
        json_AP_Press.SPDS.unit = "bar";
        json_AP_Press.SPDS.min = 0;
        json_AP_Press.SPDS.max = 200;
        json_AP_Press.SPDS.value = Value_AP_Press_SPDS.value.value;
        json_AP_Press.HDHOS = {};
        json_AP_Press.HDHOS.unit = "bar";
        json_AP_Press.HDHOS.min = 0;
        json_AP_Press.HDHOS.max = 200;
        json_AP_Press.HDHOS.value = Value_AP_Press_HDHOS.value.value;
        json_AP_Press.HDHDS = {};
        json_AP_Press.HDHDS.unit = "bar";
        json_AP_Press.HDHDS.min = 0;
        json_AP_Press.HDHDS.max = 200;
        json_AP_Press.HDHDS.value = Value_AP_Press_HDHDS.value.value;
        json_AP_Press.HDLOS = {};
        json_AP_Press.HDLOS.unit = "bar";
        json_AP_Press.HDLOS.min = 0;
        json_AP_Press.HDLOS.max = 200;
        json_AP_Press.HDLOS.value = Value_AP_Press_HDLOS.value.value;
        json_AP_Press.HDLDS = {};
        json_AP_Press.HDLDS.unit = "bar";
        json_AP_Press.HDLDS.min = 0;
        json_AP_Press.HDLDS.max = 200;
        json_AP_Press.HDLDS.value = Value_AP_Press_HDLDS.value.value;
        json_AP_Press.FP = {};
        json_AP_Press.FP.unit = "Ton/cm";
        json_AP_Press.FP.min = 0;
        json_AP_Press.FP.max = 100;
        json_AP_Press.FP.value = Value_AP_Press_FP.value.value;
        json_AP_Press.GDOS = {};
        json_AP_Press.GDOS.unit = "mm";
        json_AP_Press.GDOS.min = 45.000;
        json_AP_Press.GDOS.max = 150.000;
        json_AP_Press.GDOS.value = (Value_AP_Press_GDDS.value.value * 0.001).toFixed(3) * 1;

        let json_AP_OutFeed = {}
        let topic_AP_OutFeed = 'sfs.machine.press.a.of1';
        json_AP_OutFeed.LotNo = String_LotNo;
        json_AP_OutFeed.ETC = String_ETC;
        json_AP_OutFeed.TSDS = {};
        json_AP_OutFeed.TSDS.unit = "μm";
        json_AP_OutFeed.TSDS.min = 0;
        json_AP_OutFeed.TSDS.max = 250.0;
        json_AP_OutFeed.TSDS.value = (Value_AP_OutFeed_TSDS.value.value * 0.1).toFixed(2) * 1;
        json_AP_OutFeed.TSOS = {};
        json_AP_OutFeed.TSOS.unit = "μm";
        json_AP_OutFeed.TSOS.min = 0;
        json_AP_OutFeed.TSOS.max = 250.0;
        json_AP_OutFeed.TSOS.value = (Value_AP_OutFeed_TSOS.value.value * 0.1).toFixed(2) * 1;
        json_AP_OutFeed.PreHSRSV = {};
        json_AP_OutFeed.PreHSRSV.unit = "%";
        json_AP_OutFeed.PreHSRSV.min = 98.00;
        json_AP_OutFeed.PreHSRSV.max = 102.00;
        json_AP_OutFeed.PreHSRSV.value = (Value_AP_OutFeed_PreHSRSV.value.value * 0.01).toFixed(2) * 1;
        json_AP_OutFeed.CoolSRSV = {};
        json_AP_OutFeed.CoolSRSV.unit = "%";
        json_AP_OutFeed.CoolSRSV.min = 98.00;
        json_AP_OutFeed.CoolSRSV.max = 102.00;
        json_AP_OutFeed.CoolSRSV.value = (Value_AP_OutFeed_CoolSRSV.value.value * 0.01).toFixed(2) * 1;
        json_AP_OutFeed.CoolTSV = {};
        json_AP_OutFeed.CoolTSV.unit = "%";
        json_AP_OutFeed.CoolTSV.min = 0;
        json_AP_OutFeed.CoolTSV.max = 100.0;
        json_AP_OutFeed.CoolTSV.value = (Value_AP_OutFeed_CoolTSV.value.value * 0.1).toFixed(2) * 1;
        json_AP_OutFeed.CoolTPV = {};
        json_AP_OutFeed.CoolTPV.unit = "%";
        json_AP_OutFeed.CoolTPV.min = 0;
        json_AP_OutFeed.CoolTPV.max = 100.0;
        json_AP_OutFeed.CoolTPV.value = (Value_AP_OutFeed_CoolTPV.value.value * 0.1).toFixed(2) * 1;

        const Value_AP_IHA_DSIHASV2 = new Float32Array(Value_AP_IHA_DSIHASV.value.value.length);
        for (let i = 0; i < Value_AP_IHA_DSIHASV.value.value.length; i++) {
            Value_AP_IHA_DSIHASV2[i] = Value_AP_IHA_DSIHASV.value.value[i] / 100;
        }
        const Value_AP_IHA_OSIHASV2 = new Float32Array(Value_AP_IHA_OSIHASV.value.value?.length);
        for (let i = 0; i < Value_AP_IHA_OSIHASV.value.value?.length; i++) {
            Value_AP_IHA_OSIHASV2[i] = Value_AP_IHA_OSIHASV.value.value[i] / 100;
        }

        let json_AP_ReWinder = {}
        let topic_AP_ReWinder = 'sfs.machine.press.a.rw1';
        json_AP_ReWinder.LotNo = String_LotNo;
        json_AP_ReWinder.ETC = String_ETC;
        json_AP_ReWinder.TSSV = {};
        json_AP_ReWinder.TSSV.unit = 'N';
        json_AP_ReWinder.TSSV.min = 40;
        json_AP_ReWinder.TSSV.max = 300;
        json_AP_ReWinder.TSSV.value = Value_AP_ReWinder_TSSV.value.value;
        json_AP_ReWinder.TSPV = {};
        json_AP_ReWinder.TSPV.unit = 'N';
        json_AP_ReWinder.TSPV.min = 40;
        json_AP_ReWinder.TSPV.max = 300;
        json_AP_ReWinder.TSPV.value = Value_AP_ReWinder_TSPV.value.value;
        json_AP_ReWinder.Diameter = {};
        json_AP_ReWinder.Diameter.unit = 'N';
        json_AP_ReWinder.Diameter.min = 96.6;
        json_AP_ReWinder.Diameter.max = 500.0;
        json_AP_ReWinder.Diameter.value = Value_AP_ReWinder_Diameter.value.value;
        json_AP_ReWinder.DSIHASV = {};
        json_AP_ReWinder.DSIHASV.unit = 'Kw';
        json_AP_ReWinder.DSIHASV.min = 0;
        json_AP_ReWinder.DSIHASV.max = 30.00;
        json_AP_ReWinder.DSIHASV.value = Value_AP_IHA_DSIHASV2;
        json_AP_ReWinder.OSIHASV = {};
        json_AP_ReWinder.OSIHASV.unit = 'Kw';
        json_AP_ReWinder.OSIHASV.min = 0;
        json_AP_ReWinder.OSIHASV.max = 30.00;
        json_AP_ReWinder.OSIHASV.value = Value_AP_IHA_OSIHASV2;
        json_AP_ReWinder.IHAMode = {};
        json_AP_ReWinder.IHAMode.min = 0;
        json_AP_ReWinder.IHAMode.max = 1;
        json_AP_ReWinder.IHAMode.value = Value_AP_IHA_IHAMode.value.value;
        json_AP_ReWinder.Active = Value_AP_active.value.value;

        await sendKafkaMessage(topic_AP_UnWinder, json_AP_UnWinder);
        await sendKafkaMessage(topic_AP_Press, json_AP_Press);
        await sendKafkaMessage(topic_AP_OutFeed, json_AP_OutFeed);
        await sendKafkaMessage(topic_AP_ReWinder, json_AP_ReWinder);
        
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
