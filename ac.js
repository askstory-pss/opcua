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
const nodeId_ACRead_LotNo = "ns=6;s=::ACRead:ReadData.LotNo";
const nodeId_ACRead_ETC = "ns=6;s=::ACRead:ReadData.ETC";

const nodeId_ACRead_UnWinder_TSSV = "ns=6;s=::ACRead:ReadData.UnWinder.TSSV";
const nodeId_ACRead_UnWinder_TSPV = "ns=6;s=::ACRead:ReadData.UnWinder.TSPV";
const nodeId_ACRead_UnWinder_Diameter = "ns=6;s=::ACRead:ReadData.UnWinder.Diameter";

const nodeId_ACRead_CHead_SpeedSV = "ns=6;s=::ACRead:ReadData.CHead.SpeedSV";
const nodeId_ACRead_CHead_SpeedPV = "ns=6;s=::ACRead:ReadData.CHead.SpeedPV";
const nodeId_ACRead_CHead_OutPress = "ns=6;s=::ACRead:ReadData.CHead.OutPress";
const nodeId_ACRead_CHead_RePress = "ns=6;s=::ACRead:ReadData.CHead.RePress";
const nodeId_ACRead_CHead_OSDGSV = "ns=6;s=::ACRead:ReadData.CHead.OSDGSV";
const nodeId_ACRead_CHead_OSDGPV = "ns=6;s=::ACRead:ReadData.CHead.OSDGPV";
const nodeId_ACRead_CHead_DSDGSV = "ns=6;s=::ACRead:ReadData.CHead.DSDGSV";
const nodeId_ACRead_CHead_DSDGPV = "ns=6;s=::ACRead:ReadData.CHead.DSDGPV";
const nodeId_ACRead_CHead_CPSV = "ns=6;s=::ACRead:ReadData.CHead.CPSV";
const nodeId_ACRead_CHead_CPPV = "ns=6;s=::ACRead:ReadData.CHead.CPPV";

const nodeId_ACRead_Dryer_OA1TSV = "ns=6;s=::ACRead:ReadData.Dryer.OA1TSV";
const nodeId_ACRead_Dryer_OA1TPV = "ns=6;s=::ACRead:ReadData.Dryer.OA1TPV";
const nodeId_ACRead_Dryer_OA2TSV = "ns=6;s=::ACRead:ReadData.Dryer.OA2TSV";
const nodeId_ACRead_Dryer_OA2TPV = "ns=6;s=::ACRead:ReadData.Dryer.OA2TPV";
const nodeId_ACRead_Dryer_OA3TSV = "ns=6;s=::ACRead:ReadData.Dryer.OA3TSV";
const nodeId_ACRead_Dryer_OA3TPV = "ns=6;s=::ACRead:ReadData.Dryer.OA3TPV";
const nodeId_ACRead_Dryer_OA4TSV = "ns=6;s=::ACRead:ReadData.Dryer.OA4TSV";
const nodeId_ACRead_Dryer_OA4TPV = "ns=6;s=::ACRead:ReadData.Dryer.OA4TPV";
const nodeId_ACRead_Dryer_OA5TSV = "ns=6;s=::ACRead:ReadData.Dryer.OA5TSV";
const nodeId_ACRead_Dryer_OA5TPV = "ns=6;s=::ACRead:ReadData.Dryer.OA5TPV";
const nodeId_ACRead_Dryer_OA6TSV = "ns=6;s=::ACRead:ReadData.Dryer.OA6TSV";
const nodeId_ACRead_Dryer_OA6TPV = "ns=6;s=::ACRead:ReadData.Dryer.OA6TPV";
const nodeId_ACRead_Dryer_OA1NMP = "ns=6;s=::ACRead:ReadData.Dryer.OA1NMP";
const nodeId_ACRead_Dryer_OA2NMP = "ns=6;s=::ACRead:ReadData.Dryer.OA2NMP";
const nodeId_ACRead_Dryer_OA3NMP = "ns=6;s=::ACRead:ReadData.Dryer.OA3NMP";
const nodeId_ACRead_Dryer_OA4NMP = "ns=6;s=::ACRead:ReadData.Dryer.OA4NMP";
const nodeId_ACRead_Dryer_OA5NMP = "ns=6;s=::ACRead:ReadData.Dryer.OA5NMP";
const nodeId_ACRead_Dryer_OA6NMP = "ns=6;s=::ACRead:ReadData.Dryer.OA6NMP";

const nodeId_ACRead_OutFeed_TSDS = "ns=6;s=::ACRead:ReadData.OutFeed.TSDS";
const nodeId_ACRead_OutFeed_TDOS = "ns=6;s=::ACRead:ReadData.OutFeed.TDOS";

const nodeId_ACRead_ReWinder_TSSV = "ns=6;s=::ACRead:ReadData.ReWinder.TSSV";
const nodeId_ACRead_ReWinder_TSPV = "ns=6;s=::ACRead:ReadData.ReWinder.TSPV";
const nodeId_ACRead_ReWinder_Diameter = "ns=6;s=::ACRead:ReadData.ReWinder.Diameter";

const nodeId_ACRead_Status_Start = "ns=6;s=::ACRead:ReadData.Status.Start";
const nodeId_ACRead_Status_Stop = "ns=6;s=::ACRead:ReadData.Status.Stop";
const nodeId_ACRead_Status_Error = "ns=6;s=::ACRead:ReadData.Status.Error";

const nodeId_ACRead_Density_DSAN = "ns=6;s=::ACRead:ReadData.Density.DSAN";
const nodeId_ACRead_Density_DSAP = "ns=6;s=::ACRead:ReadData.Density.DSAP";
const nodeId_ACRead_Density_OSAN = "ns=6;s=::ACRead:ReadData.Density.OSAN";
const nodeId_ACRead_Density_OSAP = "ns=6;s=::ACRead:ReadData.Density.OSAP";
const nodeId_ACRead_Density_TDAN = "ns=6;s=::ACRead:ReadData.Density.TDAN";

const nodeId_ACRead_Roll_CButton = "ns=6;s=::ACRead:ReadData.Roll.CButton";
const nodeId_ACRead_Roll_SlotDie = "ns=6;s=::ACRead:ReadData.Roll.SlotDie";
const nodeId_ACRead_Roll_Pump = "ns=6;s=::ACRead:ReadData.Roll.Pump";
const nodeId_ACRead_Roll_UnLen = "ns=6;s=::ACRead:ReadData.Roll.UnLen";
const nodeId_ACRead_Roll_CoLen = "ns=6;s=::ACRead:ReadData.Roll.CoLen";
const nodeId_ACRead_Roll_ReLen = "ns=6;s=::ACRead:ReadData.Roll.ReLen";

const nodeId_ACRead_active = "ns=6;s=::ACRead:ReadBlock_0.Active";

async function collectAndSendData(session) {
    try {
        const Value_AC_LotNo = await session.read({ nodeId: nodeId_ACRead_LotNo, attributeId: AttributeIds.Value });
        const Value_AC_ETC = await session.read({ nodeId: nodeId_ACRead_ETC, attributeId: AttributeIds.Value });
    
        const Value_AC_UnWinder_TSSV = await session.read({ nodeId: nodeId_ACRead_UnWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_AC_UnWinder_TSPV = await session.read({ nodeId: nodeId_ACRead_UnWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_AC_UnWinder_Diameter = await session.read({ nodeId: nodeId_ACRead_UnWinder_Diameter, attributeId: AttributeIds.Value });
    
        const Value_AC_CHead_SpeedSV = await session.read({ nodeId: nodeId_ACRead_CHead_SpeedSV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_SpeedPV = await session.read({ nodeId: nodeId_ACRead_CHead_SpeedPV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_OutPress = await session.read({ nodeId: nodeId_ACRead_CHead_OutPress, attributeId: AttributeIds.Value });
        const Value_AC_CHead_RePress = await session.read({ nodeId: nodeId_ACRead_CHead_RePress, attributeId: AttributeIds.Value });
        const Value_AC_CHead_OSDGSV = await session.read({ nodeId: nodeId_ACRead_CHead_OSDGSV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_OSDGPV = await session.read({ nodeId: nodeId_ACRead_CHead_OSDGPV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_DSDGSV = await session.read({ nodeId: nodeId_ACRead_CHead_DSDGSV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_DSDGPV = await session.read({ nodeId: nodeId_ACRead_CHead_DSDGPV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_CPSV = await session.read({ nodeId: nodeId_ACRead_CHead_CPSV, attributeId: AttributeIds.Value });
        const Value_AC_CHead_CPPV = await session.read({ nodeId: nodeId_ACRead_CHead_CPPV, attributeId: AttributeIds.Value });
        
        const Value_AC_Dryer_OA1TSV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA1TSV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA1TPV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA1TPV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA2TSV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA2TSV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA2TPV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA2TPV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA3TSV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA3TSV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA3TPV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA3TPV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA4TSV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA4TSV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA4TPV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA4TPV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA5TSV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA5TSV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA5TPV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA5TPV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA6TSV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA6TSV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA6TPV = await session.read({ nodeId: nodeId_ACRead_Dryer_OA6TPV, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA1NMP = await session.read({ nodeId: nodeId_ACRead_Dryer_OA1NMP, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA2NMP = await session.read({ nodeId: nodeId_ACRead_Dryer_OA2NMP, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA3NMP = await session.read({ nodeId: nodeId_ACRead_Dryer_OA3NMP, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA4NMP = await session.read({ nodeId: nodeId_ACRead_Dryer_OA4NMP, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA5NMP = await session.read({ nodeId: nodeId_ACRead_Dryer_OA5NMP, attributeId: AttributeIds.Value });
        const Value_AC_Dryer_OA6NMP = await session.read({ nodeId: nodeId_ACRead_Dryer_OA6NMP, attributeId: AttributeIds.Value });

        const Value_AC_OutFeed_TSDS = await session.read({ nodeId: nodeId_ACRead_OutFeed_TSDS, attributeId: AttributeIds.Value });
        const Value_AC_OutFeed_TDOS = await session.read({ nodeId: nodeId_ACRead_OutFeed_TDOS, attributeId: AttributeIds.Value });
        
        const Value_AC_ReWinder_TSSV = await session.read({ nodeId: nodeId_ACRead_ReWinder_TSSV, attributeId: AttributeIds.Value });
        const Value_AC_ReWinder_TSPV = await session.read({ nodeId: nodeId_ACRead_ReWinder_TSPV, attributeId: AttributeIds.Value });
        const Value_AC_ReWinder_Diameter = await session.read({ nodeId: nodeId_ACRead_ReWinder_Diameter, attributeId: AttributeIds.Value });

        const Value_AC_Status_Start = await session.read({ nodeId: nodeId_ACRead_Status_Start, attributeId: AttributeIds.Value });
        const Value_AC_Status_Stop = await session.read({ nodeId: nodeId_ACRead_Status_Stop, attributeId: AttributeIds.Value });
        const Value_AC_Status_Error = await session.read({ nodeId: nodeId_ACRead_Status_Error, attributeId: AttributeIds.Value });
    
	const Value_AC_Density_DSAN = await session.read({ nodeId: nodeId_ACRead_Density_DSAN, attributeId: AttributeIds.Value });
        const Value_AC_Density_DSAP = await session.read({ nodeId: nodeId_ACRead_Density_DSAP, attributeId: AttributeIds.Value });
        const Value_AC_Density_OSAN = await session.read({ nodeId: nodeId_ACRead_Density_OSAN, attributeId: AttributeIds.Value });
        const Value_AC_Density_OSAP = await session.read({ nodeId: nodeId_ACRead_Density_OSAP, attributeId: AttributeIds.Value });
        const Value_AC_Density_TDAN = await session.read({ nodeId: nodeId_ACRead_Density_TDAN, attributeId: AttributeIds.Value });

        const Value_AC_Roll_CButton = await session.read({ nodeId: nodeId_ACRead_Roll_CButton, attributeId: AttributeIds.Value });
        const Value_AC_Roll_SlotDie = await session.read({ nodeId: nodeId_ACRead_Roll_SlotDie, attributeId: AttributeIds.Value });
        const Value_AC_Roll_Pump = await session.read({ nodeId: nodeId_ACRead_Roll_Pump, attributeId: AttributeIds.Value });
	const Value_AC_Roll_UnLen = await session.read({ nodeId: nodeId_ACRead_Roll_UnLen, attributeId: AttributeIds.Value });
        const Value_AC_Roll_CoLen = await session.read({ nodeId: nodeId_ACRead_Roll_CoLen, attributeId: AttributeIds.Value });
        const Value_AC_Roll_ReLen = await session.read({ nodeId: nodeId_ACRead_Roll_ReLen, attributeId: AttributeIds.Value });

	const Value_AC_active = await session.read({ nodeId: nodeId_ACRead_active, attributeId: AttributeIds.Value });

        const String_LotNo = String.fromCharCode(...Value_AC_LotNo.value.value.filter(code => code !== 0));
        const String_ETC = String.fromCharCode(...Value_AC_ETC.value.value.filter(code => code !== 0));

        let json_AC_UnWinder = {}
        let topic_AC_UnWinder = 'sfs.machine.coater.a.uw1';

        json_AC_UnWinder.LotNo = String_LotNo;
        json_AC_UnWinder.ETC = String_ETC;
        json_AC_UnWinder.TSSV = {}
        json_AC_UnWinder.TSSV.unit = "N";
        json_AC_UnWinder.TSSV.min = 40;
        json_AC_UnWinder.TSSV.max = 250;
        json_AC_UnWinder.TSSV.value = Value_AC_UnWinder_TSSV.value.value.toFixed(2) * 1;
        json_AC_UnWinder.TSPV = {}
        json_AC_UnWinder.TSPV.unit = "N";
        json_AC_UnWinder.TSPV.min = 40;
        json_AC_UnWinder.TSPV.max = 250;
        json_AC_UnWinder.TSPV.value = Value_AC_UnWinder_TSPV.value.value.toFixed(2) * 1;
        json_AC_UnWinder.Diameter = {};
        json_AC_UnWinder.Diameter.unit = 'mm';
        json_AC_UnWinder.Diameter.min = 0.0;
        json_AC_UnWinder.Diameter.max = 500.0;
        json_AC_UnWinder.Diameter.value = (Value_AC_UnWinder_Diameter.value.value * 0.1).toFixed(2) * 1;

        let json_AC_CHead = {}
        let topic_AC_CHead = 'sfs.machine.coater.a.ch1';
        json_AC_CHead.LotNo = String_LotNo;
        json_AC_CHead.ETC = String_ETC;
        json_AC_CHead.SpeedSV = {};
        json_AC_CHead.SpeedSV.unit = "m/min";
        json_AC_CHead.SpeedSV.min = 0.0;
        json_AC_CHead.SpeedSV.max = 25.0;
        json_AC_CHead.SpeedSV.value = (Value_AC_CHead_SpeedSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_CHead.SpeedPV = {};
        json_AC_CHead.SpeedPV.unit = "m/min";
        json_AC_CHead.SpeedPV.min = 0.0;
        json_AC_CHead.SpeedPV.max = 25.0;
        json_AC_CHead.SpeedPV.value = (Value_AC_CHead_SpeedPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_CHead.OutPress = {};
        json_AC_CHead.OutPress.unit = "mpa";
        json_AC_CHead.OutPress.min = 0.000;
        json_AC_CHead.OutPress.max = 1.000;
        json_AC_CHead.OutPress.value = (Value_AC_CHead_OutPress.value.value * 0.001).toFixed(3) * 1;
        json_AC_CHead.RePress = {};
        json_AC_CHead.RePress.unit = "mpa";
        json_AC_CHead.RePress.min = 0.000;
        json_AC_CHead.RePress.max = 1.000;
        json_AC_CHead.RePress.value = (Value_AC_CHead_RePress.value.value * 0.001).toFixed(3) * 1;
        json_AC_CHead.OSDGSV = {};
        json_AC_CHead.OSDGSV.unit = "μm";
        json_AC_CHead.OSDGSV.min = -999;
        json_AC_CHead.OSDGSV.max = 999;
        json_AC_CHead.OSDGSV.value = Value_AC_CHead_OSDGSV.value.value.toFixed(2) * 1;
        json_AC_CHead.OSDGPV = {};
        json_AC_CHead.OSDGPV.unit = "μm";
        json_AC_CHead.OSDGPV.min = -999;
        json_AC_CHead.OSDGPV.max = 999;
        json_AC_CHead.OSDGPV.value = Value_AC_CHead_OSDGPV.value.value.toFixed(2) * 1;
        json_AC_CHead.DSDGSV = {};
        json_AC_CHead.DSDGSV.unit = "μm";
        json_AC_CHead.DSDGSV.min = -999;
        json_AC_CHead.DSDGSV.max = 999;
        json_AC_CHead.DSDGSV.value = Value_AC_CHead_DSDGSV.value.value.toFixed(2) * 1;
        json_AC_CHead.DSDGPV = {};
        json_AC_CHead.DSDGPV.unit = "μm";
        json_AC_CHead.DSDGPV.min = -999;
        json_AC_CHead.DSDGPV.max = 999;
        json_AC_CHead.DSDGPV.value = Value_AC_CHead_DSDGPV.value.value.toFixed(2) * 1;
        json_AC_CHead.CPSV = {};
        json_AC_CHead.CPSV.unit = "RPM";
        json_AC_CHead.CPSV.min = 0;
        json_AC_CHead.CPSV.max = 300.0;
        json_AC_CHead.CPSV.value = Value_AC_CHead_CPSV.value.value.toFixed(2) * 1;
        json_AC_CHead.CPPV = {};
        json_AC_CHead.CPPV.unit = "RPM";
        json_AC_CHead.CPPV.min = 0;
        json_AC_CHead.CPPV.max = 300.0;
        json_AC_CHead.CPPV.value = Value_AC_CHead_CPPV.value.value.toFixed(2) * 1;

        let json_AC_Dryer = {}
        let topic_AC_Dryer = 'sfs.machine.coater.a.dy1';
        json_AC_Dryer.LotNo = String_LotNo;
        json_AC_Dryer.ETC = String_ETC;
        json_AC_Dryer.OA1TSV = {};
        json_AC_Dryer.OA1TSV.unit = "°C";
        json_AC_Dryer.OA1TSV.min = 50.0;
        json_AC_Dryer.OA1TSV.max = 160.0;
        json_AC_Dryer.OA1TSV.value = (Value_AC_Dryer_OA1TSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA1TPV = {};
        json_AC_Dryer.OA1TPV.unit = "°C";
        json_AC_Dryer.OA1TPV.min = 50.0;
        json_AC_Dryer.OA1TPV.max = 160.0;
        json_AC_Dryer.OA1TPV.value = (Value_AC_Dryer_OA1TPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA2TSV = {};
        json_AC_Dryer.OA2TSV.unit = "°C";
        json_AC_Dryer.OA2TSV.min = 50.0;
        json_AC_Dryer.OA2TSV.max = 160.0;
        json_AC_Dryer.OA2TSV.value = (Value_AC_Dryer_OA2TSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA2TPV = {};
        json_AC_Dryer.OA2TPV.unit = "°C";
        json_AC_Dryer.OA2TPV.min = 50.0;
        json_AC_Dryer.OA2TPV.max = 160.0;
        json_AC_Dryer.OA2TPV.value = (Value_AC_Dryer_OA2TPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA3TSV = {};
        json_AC_Dryer.OA3TSV.unit = "°C";
        json_AC_Dryer.OA3TSV.min = 50.0;
        json_AC_Dryer.OA3TSV.max = 160.0;
        json_AC_Dryer.OA3TSV.value = (Value_AC_Dryer_OA3TSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA3TPV = {};
        json_AC_Dryer.OA3TPV.unit = "°C";
        json_AC_Dryer.OA3TPV.min = 50.0;
        json_AC_Dryer.OA3TPV.max = 160.0;
        json_AC_Dryer.OA3TPV.value = (Value_AC_Dryer_OA3TPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA4TSV = {};
        json_AC_Dryer.OA4TSV.unit = "°C";
        json_AC_Dryer.OA4TSV.min = 50.0;
        json_AC_Dryer.OA4TSV.max = 160.0;
        json_AC_Dryer.OA4TSV.value = (Value_AC_Dryer_OA4TSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA4TPV = {};
        json_AC_Dryer.OA4TPV.unit = "°C";
        json_AC_Dryer.OA4TPV.min = 50.0;
        json_AC_Dryer.OA4TPV.max = 160.0;
        json_AC_Dryer.OA4TPV.value = (Value_AC_Dryer_OA4TPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA5TSV = {};
        json_AC_Dryer.OA5TSV.unit = "°C";
        json_AC_Dryer.OA5TSV.min = 50.0;
        json_AC_Dryer.OA5TSV.max = 160.0;
        json_AC_Dryer.OA5TSV.value = (Value_AC_Dryer_OA5TSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA5TPV = {};
        json_AC_Dryer.OA5TPV.unit = "°C";
        json_AC_Dryer.OA5TPV.min = 50.0;
        json_AC_Dryer.OA5TPV.max = 160.0;
        json_AC_Dryer.OA5TPV.value = (Value_AC_Dryer_OA5TPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA6TSV = {};
        json_AC_Dryer.OA6TSV.unit = "°C";
        json_AC_Dryer.OA6TSV.min = 50.0;
        json_AC_Dryer.OA6TSV.max = 160.0;
        json_AC_Dryer.OA6TSV.value = (Value_AC_Dryer_OA6TSV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA6TPV = {};
        json_AC_Dryer.OA6TPV.unit = "°C";
        json_AC_Dryer.OA6TPV.min = 50.0;
        json_AC_Dryer.OA6TPV.max = 160.0;
        json_AC_Dryer.OA6TPV.value = (Value_AC_Dryer_OA6TPV.value.value * 0.1).toFixed(2) * 1;
        json_AC_Dryer.OA1NMP = {};
        json_AC_Dryer.OA1NMP.unit = "%";
        json_AC_Dryer.OA1NMP.min = 0.0;
        json_AC_Dryer.OA1NMP.max = 100.0;
        json_AC_Dryer.OA1NMP.value = Value_AC_Dryer_OA1NMP.value.value.toFixed(2) * 1;
        json_AC_Dryer.OA2NMP = {};
        json_AC_Dryer.OA2NMP.unit = "%";
        json_AC_Dryer.OA2NMP.min = 0.0;
        json_AC_Dryer.OA2NMP.max = 100.0;
        json_AC_Dryer.OA2NMP.value = Value_AC_Dryer_OA2NMP.value.value.toFixed(2) * 1;
        json_AC_Dryer.OA3NMP = {};
        json_AC_Dryer.OA3NMP.unit = "%";
        json_AC_Dryer.OA3NMP.min = 0.0;
        json_AC_Dryer.OA3NMP.max = 100.0;
        json_AC_Dryer.OA3NMP.value = Value_AC_Dryer_OA3NMP.value.value.toFixed(2) * 1;
        json_AC_Dryer.OA4NMP = {};
        json_AC_Dryer.OA4NMP.unit = "%";
        json_AC_Dryer.OA4NMP.min = 0.0;
        json_AC_Dryer.OA4NMP.max = 100.0;
        json_AC_Dryer.OA4NMP.value = Value_AC_Dryer_OA4NMP.value.value.toFixed(2) * 1;
        json_AC_Dryer.OA5NMP = {};
        json_AC_Dryer.OA5NMP.unit = "%";
        json_AC_Dryer.OA5NMP.min = 0.0;
        json_AC_Dryer.OA5NMP.max = 100.0;
        json_AC_Dryer.OA5NMP.value = Value_AC_Dryer_OA5NMP.value.value.toFixed(2) * 1;
        json_AC_Dryer.OA6NMP = {};
        json_AC_Dryer.OA6NMP.unit = "%";
        json_AC_Dryer.OA6NMP.min = 0.0;
        json_AC_Dryer.OA6NMP.max = 100.0;
        json_AC_Dryer.OA6NMP.value = Value_AC_Dryer_OA6NMP.value.value.toFixed(2) * 1;

        let json_AC_OutFeed = {}
        let topic_AC_OutFeed = 'sfs.machine.coater.a.of1';
        json_AC_OutFeed.LotNo = String_LotNo;
        json_AC_OutFeed.ETC = String_ETC;
        json_AC_OutFeed.TSDS = {};
        json_AC_OutFeed.TSDS.unit = "N";
        json_AC_OutFeed.TSDS.min = 40;
        json_AC_OutFeed.TSDS.max = 250;
        json_AC_OutFeed.TSDS.value = Value_AC_OutFeed_TSDS.value.value.toFixed(2) * 1;
        json_AC_OutFeed.TDOS = {};
        json_AC_OutFeed.TDOS.unit = "N";
        json_AC_OutFeed.TDOS.min = 40;
        json_AC_OutFeed.TDOS.max = 250;
        json_AC_OutFeed.TDOS.value = Value_AC_OutFeed_TDOS.value.value;

        let json_AC_ReWinder = {}
        let topic_AC_ReWinder = 'sfs.machine.coater.a.rw1';
        json_AC_ReWinder.LotNo = String_LotNo;
        json_AC_ReWinder.ETC = String_ETC;
        json_AC_ReWinder.TSSV = {};
        json_AC_ReWinder.TSSV.unit = 'N';
        json_AC_ReWinder.TSSV.min = 40;
        json_AC_ReWinder.TSSV.max = 250;
        json_AC_ReWinder.TSSV.value = Value_AC_ReWinder_TSSV.value.value.toFixed(2) * 1;
        json_AC_ReWinder.TSPV = {};
        json_AC_ReWinder.TSPV.unit = 'N';
        json_AC_ReWinder.TSPV.min = 40;
        json_AC_ReWinder.TSPV.max = 250;
        json_AC_ReWinder.TSPV.value = Value_AC_ReWinder_TSPV.value.value.toFixed(2) * 1;
        json_AC_ReWinder.Diameter = {};
        json_AC_ReWinder.Diameter.unit = 'mm';
        json_AC_ReWinder.Diameter.min = 0.0;
        json_AC_ReWinder.Diameter.max = 500.0;
        json_AC_ReWinder.Diameter.value = (Value_AC_ReWinder_Diameter.value.value * 0.1).toFixed(2) * 1;

        let json_AC_Status = {}
        let topic_AC_Status = 'sfs.machine.coater.a.status1';
        json_AC_Status.LotNo = String_LotNo;
        json_AC_Status.ETC = String_ETC;
        json_AC_Status.Start = Value_AC_Status_Start.value.value;
        json_AC_Status.Stop = Value_AC_Status_Stop.value.value;
        json_AC_Status.Error = Value_AC_Status_Error.value.value;

	let json_AC_Density = {}
        let topic_AC_Density = 'sfs.machine.coater.a.dens1'
        json_AC_Density.DSAN = {};
        json_AC_Density.DSAN.unit = "μm";
        json_AC_Density.DSAN.value = Value_AC_Density_DSAN.value.value;
        json_AC_Density.DSAP = {};
        json_AC_Density.DSAP.unit = "μm";
        json_AC_Density.DSAP.value = Value_AC_Density_DSAP.value.value;
        json_AC_Density.OSAN = {};
        json_AC_Density.OSAN.unit = "μm";
        json_AC_Density.OSAN.value = Value_AC_Density_OSAN.value.value;
        json_AC_Density.OSAP = {};
        json_AC_Density.OSAP.unit = "μm";
        json_AC_Density.OSAP.value = Value_AC_Density_OSAP.value.value;
        json_AC_Density.TDAN = {};
        json_AC_Density.TDAN.unit = "μm";
        json_AC_Density.TDAN.value = Value_AC_Density_TDAN.value.value;

        let json_AC_Roll = {}
        let topic_AC_Roll = 'sfs.machine.coater.a.roll1'
        json_AC_Roll.CButton = Value_AC_Roll_CButton.value.value;
        json_AC_Roll.SlotDie = Value_AC_Roll_SlotDie.value.value;
        json_AC_Roll.Pump = Value_AC_Roll_Pump.value.value;
	json_AC_Roll.Active = Value_AC_active.value.value;
	json_AC_Roll.UnLen = Value_AC_Roll_UnLen.value.value;
        json_AC_Roll.CoLen = Value_AC_Roll_CoLen.value.value;
        json_AC_Roll.ReLen = Value_AC_Roll_ReLen.value.value;

        await sendKafkaMessage(topic_AC_UnWinder, json_AC_UnWinder);
        await sendKafkaMessage(topic_AC_CHead, json_AC_CHead);
        await sendKafkaMessage(topic_AC_Dryer, json_AC_Dryer);
        await sendKafkaMessage(topic_AC_OutFeed, json_AC_OutFeed);
        await sendKafkaMessage(topic_AC_ReWinder, json_AC_ReWinder);
        await sendKafkaMessage(topic_AC_Status, json_AC_Status);
	await sendKafkaMessage(topic_AC_Density, json_AC_Density);
	await sendKafkaMessage(topic_AC_Roll, json_AC_Roll);
        
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
