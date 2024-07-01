const { OPCUAClient, AttributeIds, DataType } = require("node-opcua-client");
const { Kafka } = require('kafkajs');

const redis = require('redis');

const redis_client = redis.createClient();

const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: ['10.10.10.52:9092'] // Kafka 브로커의 주소
});

const producer = kafka.producer();

// Your OPC UA server endpoint
const endpointUrl = "opc.tcp://10.10.10.92:4840";

// The nodeId of the variable you want to read
const nodeId_ADWRead_DIWater_EqStatus = "ns=6;s=::ADWRead:DIWater.EqStatus";
const nodeId_ADWRead_DIWater_EqCM = "ns=6;s=::ADWRead:DIWater.EqCM";
const nodeId_ADWRead_DIWater_ETC = "ns=6;s=::ADWRead:DIWater.ETC";
const nodeId_ADWRead_DIWater_LvPV = "ns=6;s=::ADWRead:DIWater.LvPV";
const nodeId_ADWRead_DIWater_TopPPV = "ns=6;s=::ADWRead:DIWater.TopPPV";
const nodeId_ADWRead_DIWater_T1PPV = "ns=6;s=::ADWRead:DIWater.T1PPV";
const nodeId_ADWRead_DIWater_T2PPV = "ns=6;s=::ADWRead:DIWater.T2PPV";
const nodeId_ADWRead_DIWater_LotNo = "ns=6;s=::ADWRead:DIWater.LotNo";
const nodeId_ADWRead_DIWater_Bit12 = "ns=6;s=::ADWRead:DIWater.Bit12";

const nodeId_AMCRead_CMixer_EqStatus = "ns=6;s=::AMCRead:CMixer.EqStatus";
const nodeId_AMCRead_CMixer_EqCM = "ns=6;s=::AMCRead:CMixer.EqCM";
const nodeId_AMCRead_CMixer_PCStatus = "ns=6;s=::AMCRead:CMixer.PCStatus";
const nodeId_AMCRead_CMixer_BatchID = "ns=6;s=::AMCRead:CMixer.BatchID";
const nodeId_AMCRead_CMixer_ARPMPV = "ns=6;s=::AMCRead:CMixer.ARPMPV";
const nodeId_AMCRead_CMixer_ACPV = "ns=6;s=::AMCRead:CMixer.ACPV";
const nodeId_AMCRead_CMixer_DRPMPV = "ns=6;s=::AMCRead:CMixer.DRPMPV";
const nodeId_AMCRead_CMixer_DCPV = "ns=6;s=::AMCRead:CMixer.DCPV";
const nodeId_AMCRead_CMixer_PASNo = "ns=6;s=::AMCRead:CMixer.PASNo";
const nodeId_AMCRead_CMixer_MTimeSV = "ns=6;s=::AMCRead:CMixer.MTimeSV";
const nodeId_AMCRead_CMixer_MOTPV = "ns=6;s=::AMCRead:CMixer.MOTPV";
const nodeId_AMCRead_CMixer_LvPV = "ns=6;s=::AMCRead:CMixer.LvPV";
const nodeId_AMCRead_CMixer_MTSV = "ns=6;s=::AMCRead:CMixer.MTSV";
const nodeId_AMCRead_CMixer_TPV = "ns=6;s=::AMCRead:CMixer.TPV";
const nodeId_AMCRead_CMixer_MPSV = "ns=6;s=::AMCRead:CMixer.MPSV";
const nodeId_AMCRead_CMixer_TopPPV = "ns=6;s=::AMCRead:CMixer.TopPPV";
const nodeId_AMCRead_CMixer_TWBWSV = "ns=6;s=::AMCRead:CMixer.TWBWSV";
const nodeId_AMCRead_CMixer_TWBWPV = "ns=6;s=::AMCRead:CMixer.TWBWPV";
const nodeId_AMCRead_CMixer_TIWSV = "ns=6;s=::AMCRead:CMixer.TIWSV";
const nodeId_AMCRead_CMixer_WIWPV = "ns=6;s=::AMCRead:CMixer.WIWPV";
const nodeId_AMCRead_CMixer_Bit18 = "ns=6;s=::AMCRead:CMixer.Bit18";

const nodeId_AMCRead_CMCST_EqStatus = "ns=6;s=::AMCRead:CMCST.EqStatus";
const nodeId_AMCRead_CMCST_EqCM = "ns=6;s=::AMCRead:CMCST.EqCM";
const nodeId_AMCRead_CMCST_BatchID = "ns=6;s=::AMCRead:CMCST.BatchID";
const nodeId_AMCRead_CMCST_ARPMPV = "ns=6;s=::AMCRead:CMCST.ARPMPV";
const nodeId_AMCRead_CMCST_ACPV = "ns=6;s=::AMCRead:CMCST.ACPV";
const nodeId_AMCRead_CMCST_RPRPM = "ns=6;s=::AMCRead:CMCST.RPRPM";
const nodeId_AMCRead_CMCST_LvPV = "ns=6;s=::AMCRead:CMCST.LvPV";
const nodeId_AMCRead_CMCST_TopPPV = "ns=6;s=::AMCRead:CMCST.TopPPV";
const nodeId_AMCRead_CMCST_TPV = "ns=6;s=::AMCRead:CMCST.TPV";
const nodeId_AMCRead_CMCST_Bit4 = "ns=6;s=::AMCRead:CMCST.Bit4";

const nodeId_AMCRead_CNTST_EqStatus = "ns=6;s=::AMCRead:CNTST.EqStatus";
const nodeId_AMCRead_CNTST_EqCM = "ns=6;s=::AMCRead:CNTST.EqCM";
const nodeId_AMCRead_CNTST_BatchID = "ns=6;s=::AMCRead:CNTST.BatchID";
const nodeId_AMCRead_CNTST_ARPMPV = "ns=6;s=::AMCRead:CNTST.ARPMPV";
const nodeId_AMCRead_CNTST_ACPV = "ns=6;s=::AMCRead:CNTST.ACPV";
const nodeId_AMCRead_CNTST_LvPV = "ns=6;s=::AMCRead:CNTST.LvPV";
const nodeId_AMCRead_CNTST_TopPPV = "ns=6;s=::AMCRead:CNTST.TopPPV";
const nodeId_AMCRead_CNTST_Bit7 = "ns=6;s=::AMCRead:CNTST.Bit7";

const nodeId_AMSRead_MMixer_EqStatus = "ns=6;s=::AMSRead:MMixer.EqStatus";
const nodeId_AMSRead_MMixer_EqCM = "ns=6;s=::AMSRead:MMixer.EqCM";
const nodeId_AMSRead_MMixer_PCStatus = "ns=6;s=::AMSRead:MMixer.PCStatus";
const nodeId_AMSRead_MMixer_BatchID = "ns=6;s=::AMSRead:MMixer.BatchID";
const nodeId_AMSRead_MMixer_PRPMPV = "ns=6;s=::AMSRead:MMixer.PRPMPV";
const nodeId_AMSRead_MMixer_PCPV = "ns=6;s=::AMSRead:MMixer.PCPV";
const nodeId_AMSRead_MMixer_DRPMPV = "ns=6;s=::AMSRead:MMixer.DRPMPV";
const nodeId_AMSRead_MMixer_DCPV = "ns=6;s=::AMSRead:MMixer.DCPV";
const nodeId_AMSRead_MMixer_PASNo = "ns=6;s=::AMSRead:MMixer.PASNo";
const nodeId_AMSRead_MMixer_MTimeSV = "ns=6;s=::AMSRead:MMixer.MTimeSV";
const nodeId_AMSRead_MMixer_MOTPV = "ns=6;s=::AMSRead:MMixer.MOTPV";
const nodeId_AMSRead_MMixer_MTSV = "ns=6;s=::AMSRead:MMixer.MTSV";
const nodeId_AMSRead_MMixer_VTPV = "ns=6;s=::AMSRead:MMixer.VTPV";
const nodeId_AMSRead_MMixer_MPSV = "ns=6;s=::AMSRead:MMixer.MPSV";
const nodeId_AMSRead_MMixer_TopPPV = "ns=6;s=::AMSRead:MMixer.TopPPV";
const nodeId_AMSRead_MMixer_VOPPPV = "ns=6;s=::AMSRead:MMixer.VOPPPV";
const nodeId_AMSRead_MMixer_VOPTPV = "ns=6;s=::AMSRead:MMixer.VOPTPV";
const nodeId_AMSRead_MMixer_TWCSV = "ns=6;s=::AMSRead:MMixer.TWCSV";
const nodeId_AMSRead_MMixer_TWCPV = "ns=6;s=::AMSRead:MMixer.TWCPV";
const nodeId_AMSRead_MMixer_TWMSV = "ns=6;s=::AMSRead:MMixer.TWMSV";
const nodeId_AMSRead_MMixer_TWMPV = "ns=6;s=::AMSRead:MMixer.TWMPV";
const nodeId_AMSRead_MMixer_TWSSV = "ns=6;s=::AMSRead:MMixer.TWSSV";
const nodeId_AMSRead_MMixer_TWSPV = "ns=6;s=::AMSRead:MMixer.TWSPV";
const nodeId_AMSRead_MMixer_IWSV = "ns=6;s=::AMSRead:MMixer.IWSV";
const nodeId_AMSRead_MMixer_IWPV = "ns=6;s=::AMSRead:MMixer.IWPV";
const nodeId_AMSRead_MMixer_CIWSV = "ns=6;s=::AMSRead:MMixer.CIWSV";
const nodeId_AMSRead_MMixer_CIWPV = "ns=6;s=::AMSRead:MMixer.CIWPV";
const nodeId_AMSRead_MMixer_TIWSV = "ns=6;s=::AMSRead:MMixer.TIWSV";
const nodeId_AMSRead_MMixer_TIWPV = "ns=6;s=::AMSRead:MMixer.TIWPV";
const nodeId_AMSRead_MMixer_SBRSV = "ns=6;s=::AMSRead:MMixer.SBRSV";
const nodeId_AMSRead_MMixer_SBRPV = "ns=6;s=::AMSRead:MMixer.SBRPV";
const nodeId_AMSRead_MMixer_TOLPPV = "ns=6;s=::AMSRead:MMixer.TOLPPV";
const nodeId_AMSRead_MMixer_Bit32 = "ns=6;s=::AMSRead:MMixer.Bit32";

const nodeId_AMSRead_Slurry1_EqStatus = "ns=6;s=::AMSRead:Slurry1.EqStatus";
const nodeId_AMSRead_Slurry1_EqCM = "ns=6;s=::AMSRead:Slurry1.EqCM";
const nodeId_AMSRead_Slurry1_BatchID = "ns=6;s=::AMSRead:Slurry1.BatchID";
const nodeId_AMSRead_Slurry1_ARPMPV = "ns=6;s=::AMSRead:Slurry1.ARPMPV";
const nodeId_AMSRead_Slurry1_ACPV = "ns=6;s=::AMSRead:Slurry1.ACPV";
const nodeId_AMSRead_Slurry1_PASNo = "ns=6;s=::AMSRead:Slurry1.PASNo";
const nodeId_AMSRead_Slurry1_MTimeSV = "ns=6;s=::AMSRead:Slurry1.MTimeSV";
const nodeId_AMSRead_Slurry1_OT = "ns=6;s=::AMSRead:Slurry1.OT";
const nodeId_AMSRead_Slurry1_LvPV = "ns=6;s=::AMSRead:Slurry1.LvPV";
const nodeId_AMSRead_Slurry1_TopPPV = "ns=6;s=::AMSRead:Slurry1.TopPPV";
const nodeId_AMSRead_Slurry1_Bit6 = "ns=6;s=::AMSRead:Slurry1.Bit6";

const nodeId_AMSRead_Slurry2_EqStatus = "ns=6;s=::AMSRead:Slurry2.EqStatus";
const nodeId_AMSRead_Slurry2_EqCM = "ns=6;s=::AMSRead:Slurry2.EqCM";
const nodeId_AMSRead_Slurry2_BatchID = "ns=6;s=::AMSRead:Slurry2.BatchID";
const nodeId_AMSRead_Slurry2_ARPMPV = "ns=6;s=::AMSRead:Slurry2.ARPMPV";
const nodeId_AMSRead_Slurry2_ACPV = "ns=6;s=::AMSRead:Slurry2.ACPV";
const nodeId_AMSRead_Slurry2_PASNo = "ns=6;s=::AMSRead:Slurry2.PASNo";
const nodeId_AMSRead_Slurry2_MTimeSV = "ns=6;s=::AMSRead:Slurry2.MTimeSV";
const nodeId_AMSRead_Slurry2_OT = "ns=6;s=::AMSRead:Slurry2.OT";
const nodeId_AMSRead_Slurry2_LvPV = "ns=6;s=::AMSRead:Slurry2.LvPV";
const nodeId_AMSRead_Slurry2_TopPPV = "ns=6;s=::AMSRead:Slurry2.TopPPV";
const nodeId_AMSRead_Slurry2_Bit6 = "ns=6;s=::AMSRead:Slurry2.Bit6";

const nodeId_APRead_DP_Bit7 = "ns=6;s=::APRead1:DP.Bit7";
const nodeId_APRead_DP_Bit4 = "ns=6;s=::APRead1:DP.Bit4";

const nodeId_APRead_MS1_PWV = "ns=6;s=::APRead1:MS1.PWV";
const nodeId_APRead_MS1_ORPM = "ns=6;s=::APRead1:MS1.ORPM";
const nodeId_APRead_MS1_Bit5 = "ns=6;s=::APRead1:MS1.Bit5";

const nodeId_APRead_MS2_PWV = "ns=6;s=::APRead1:MS2.PWV";
const nodeId_APRead_MS2_ORPM = "ns=6;s=::APRead1:MS2.ORPM";
const nodeId_APRead_MS2_Bit5 = "ns=6;s=::APRead1:MS2.Bit5";

const nodeId_APRead_SS_PWV = "ns=6;s=::APRead1:SS.PWV";
const nodeId_APRead_SS_ORPM = "ns=6;s=::APRead1:SS.ORPM";
const nodeId_APRead_SS_Bit5 = "ns=6;s=::APRead1:SS.Bit5";

const nodeId_APRead_MDis_PWV = "ns=6;s=::APRead2:MDis.PWV";
const nodeId_APRead_MDis_ORPM = "ns=6;s=::APRead2:MDis.ORPM";
const nodeId_APRead_MDis_MWSV1 = "ns=6;s=::APRead2:MDis.MWSV1";
const nodeId_APRead_MDis_MTWPV1 = "ns=6;s=::APRead2:MDis.MTWPV1";
const nodeId_APRead_MDis_MWT1 = "ns=6;s=::APRead2:MDis.MWT1";
const nodeId_APRead_MDis_MWSV2 = "ns=6;s=::APRead2:MDis.MWSV2";
const nodeId_APRead_MDis_MTWPV2 = "ns=6;s=::APRead2:MDis.MTWPV2";
const nodeId_APRead_MDis_MWT2 = "ns=6;s=::APRead2:MDis.MWT2";
const nodeId_APRead_MDis_TWSV = "ns=6;s=::APRead2:MDis.TWSV";
const nodeId_APRead_MDis_TWPV = "ns=6;s=::APRead2:MDis.TWPV";
const nodeId_APRead_MDis_TWT = "ns=6;s=::APRead2:MDis.TWT";
const nodeId_APRead_MDis_Bit3 = "ns=6;s=::APRead2:MDis.Bit3";

const nodeId_APRead_SDis_PWV = "ns=6;s=::APRead2:SDis.PWV";
const nodeId_APRead_SDis_ORPM = "ns=6;s=::APRead2:SDis.ORPM";
const nodeId_APRead_SDis_SHWSV = "ns=6;s=::APRead2:SDis.SHWSV";
const nodeId_APRead_SDis_SHWPV = "ns=6;s=::APRead2:SDis.SHWPV";
const nodeId_APRead_SDis_SHWT = "ns=6;s=::APRead2:SDis.SHWT";
const nodeId_APRead_SDis_TWSV = "ns=6;s=::APRead2:SDis.TWSV";
const nodeId_APRead_SDis_TWPV = "ns=6;s=::APRead2:SDis.TWPV";
const nodeId_APRead_SDis_TWT = "ns=6;s=::APRead2:SDis.TWT";
const nodeId_APRead_SDis_Bit3 = "ns=6;s=::APRead2:SDis.Bit3";

const nodeId_APRead_VC_Bit5 = "ns=6;s=::APRead2:VC.Bit5";

const nodeId_AMSRead_MMBCR_BCR = "ns=6;s=::AMSRead:MMBCR.BCR";
const nodeId_AMSRead_MMBCR_CODE = "ns=6;s=::AMSRead:MMBCR.CODE";
const nodeId_AMSRead_MMBCR_REQ = "ns=6;s=::AMSRead:MMBCR.REQ";
const nodeId_AMSRead_MMBCR_REP = "ns=6;s=::AMSRead:MMBCR.REP";

const nodeId_AMCRead_CMCBCR_BCR = "ns=6;s=::AMCRead:CMCBCR.BCR";
const nodeId_AMCRead_CMCBCR_CODE = "ns=6;s=::AMCRead:CMCBCR.CODE";
const nodeId_AMCRead_CMCBCR_REQ = "ns=6;s=::AMCRead:CMCBCR.REQ";
const nodeId_AMCRead_CMCBCR_REP = "ns=6;s=::AMCRead:CMCBCR.REP";

const nodeId_APRead_DP1BCR_BCR = "ns=6;s=::APRead:DP1BCR.BCR";
const nodeId_APRead_DP1BCR_CODE = "ns=6;s=::APRead:DP1BCR.CODE";
const nodeId_APRead_DP1BCR_REQ = "ns=6;s=::APRead:DP1BCR.REQ";
const nodeId_APRead_DP1BCR_REP = "ns=6;s=::APRead:DP1BCR.REP";

const nodeId_APRead_DP2BCR_BCR = "ns=6;s=::APRead:DP2BCR.BCR";
const nodeId_APRead_DP2BCR_CODE = "ns=6;s=::APRead:DP2BCR.CODE";
const nodeId_APRead_DP2BCR_REQ = "ns=6;s=::APRead:DP2BCR.REQ";
const nodeId_APRead_DP2BCR_REP = "ns=6;s=::APRead:DP2BCR.REP";

const nodeId_APRead_DPSBCR_BCR = "ns=6;s=::APRead:DPSBCR.BCR";
const nodeId_APRead_DPSBCR_CODE = "ns=6;s=::APRead:DPSBCR.CODE";
const nodeId_APRead_DPSBCR_REQ = "ns=6;s=::APRead:DPSBCR.REQ";
const nodeId_APRead_DPSBCR_REP = "ns=6;s=::APRead:DPSBCR.REP";

const nodeId_APRead_MDCOM_CODE = "ns=6;s=::APRead:MDCOM.CODE";
const nodeId_APRead_MDCOM_REQ = "ns=6;s=::APRead:MDCOM.REPORT";
const nodeId_APRead_MDCOM_REP = "ns=6;s=::APRead:MDCOM.REP";

const nodeId_APRead_SDCOM_CODE = "ns=6;s=::APRead:SDCOM.CODE";
const nodeId_APRead_SDCOM_REQ = "ns=6;s=::APRead:SDCOM.REPORT";
const nodeId_APRead_SDCOM_REP = "ns=6;s=::APRead:SDCOM.REP";

function decimalToBinary(decimal, numDigits) {
    let binary = '';
    let num = decimal;

    while (num > 0) {
        binary = (num & 1) + binary;
        num >>= 1;
    }

    // Pad the binary representation with leading zeros if necessary
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
        const Value_ADW_DIWater_EqStatus = await session.read({ nodeId: nodeId_ADWRead_DIWater_EqStatus, attributeId: AttributeIds.Value });
        const Value_ADW_DIWater_EqCM = await session.read({ nodeId: nodeId_ADWRead_DIWater_EqCM, attributeId: AttributeIds.Value });
        //const Value_ADW_DIWater_ETC = await session.read({ nodeId: nodeId_ADWRead_DIWater_ETC, attributeId: AttributeIds.Value });
        const Value_ADW_DIWater_LvPV = await session.read({ nodeId: nodeId_ADWRead_DIWater_LvPV, attributeId: AttributeIds.Value });
        const Value_ADW_DIWater_TopPPV = await session.read({ nodeId: nodeId_ADWRead_DIWater_TopPPV, attributeId: AttributeIds.Value });
        const Value_ADW_DIWater_T1PPV = await session.read({ nodeId: nodeId_ADWRead_DIWater_T1PPV, attributeId: AttributeIds.Value });
        const Value_ADW_DIWater_T2PPV = await session.read({ nodeId: nodeId_ADWRead_DIWater_T2PPV, attributeId: AttributeIds.Value });
        //const Value_ADW_DIWater_LotNo = await session.read({ nodeId: nodeId_ADWRead_DIWater_LotNo, attributeId: AttributeIds.Value });
        const Value_ADW_DIWater_Bit12 = await session.read({ nodeId: nodeId_ADWRead_DIWater_Bit12, attributeId: AttributeIds.Value });

        const Value_AMC_CMixer_EqStatus = await session.read({ nodeId: nodeId_AMCRead_CMixer_EqStatus, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_EqCM = await session.read({ nodeId: nodeId_AMCRead_CMixer_EqCM, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_PCStatus = await session.read({ nodeId: nodeId_AMCRead_CMixer_PCStatus, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_BatchID = await session.read({ nodeId: nodeId_AMCRead_CMixer_BatchID, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_ARPMPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_ARPMPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_ACPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_ACPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_DRPMPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_DRPMPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_DCPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_DCPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_PASNo = await session.read({ nodeId: nodeId_AMCRead_CMixer_PASNo, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_MTimeSV = await session.read({ nodeId: nodeId_AMCRead_CMixer_MTimeSV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_MOTPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_MOTPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_LvPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_LvPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_MTSV = await session.read({ nodeId: nodeId_AMCRead_CMixer_MTSV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_TPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_TPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_MPSV = await session.read({ nodeId: nodeId_AMCRead_CMixer_MPSV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_TopPPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_TopPPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_TWBWSV = await session.read({ nodeId: nodeId_AMCRead_CMixer_TWBWSV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_TWBWPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_TWBWPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_TIWSV = await session.read({ nodeId: nodeId_AMCRead_CMixer_TIWSV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_WIWPV = await session.read({ nodeId: nodeId_AMCRead_CMixer_WIWPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMixer_Bit18 = await session.read({ nodeId: nodeId_AMCRead_CMixer_Bit18, attributeId: AttributeIds.Value });

        const Value_AMC_CMCST_EqStatus = await session.read({ nodeId: nodeId_AMCRead_CMCST_EqStatus, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_EqCM = await session.read({ nodeId: nodeId_AMCRead_CMCST_EqCM, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_BatchID = await session.read({ nodeId: nodeId_AMCRead_CMCST_BatchID, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_ARPMPV = await session.read({ nodeId: nodeId_AMCRead_CMCST_ARPMPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_ACPV = await session.read({ nodeId: nodeId_AMCRead_CMCST_ACPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_RPRPM = await session.read({ nodeId: nodeId_AMCRead_CMCST_RPRPM, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_LvPV = await session.read({ nodeId: nodeId_AMCRead_CMCST_LvPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_TopPPV = await session.read({ nodeId: nodeId_AMCRead_CMCST_TopPPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_TPV = await session.read({ nodeId: nodeId_AMCRead_CMCST_TPV, attributeId: AttributeIds.Value });
        const Value_AMC_CMCST_Bit4 = await session.read({ nodeId: nodeId_AMCRead_CMCST_Bit4, attributeId: AttributeIds.Value });

        const Value_AMC_CNTST_EqStatus = await session.read({ nodeId: nodeId_AMCRead_CNTST_EqStatus, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_EqCM = await session.read({ nodeId: nodeId_AMCRead_CNTST_EqCM, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_BatchID = await session.read({ nodeId: nodeId_AMCRead_CNTST_BatchID, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_ARPMPV = await session.read({ nodeId: nodeId_AMCRead_CNTST_ARPMPV, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_ACPV = await session.read({ nodeId: nodeId_AMCRead_CNTST_ACPV, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_LvPV = await session.read({ nodeId: nodeId_AMCRead_CNTST_LvPV, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_TopPPV = await session.read({ nodeId: nodeId_AMCRead_CNTST_TopPPV, attributeId: AttributeIds.Value });
        const Value_AMC_CNTST_Bit7 = await session.read({ nodeId: nodeId_AMCRead_CNTST_Bit7, attributeId: AttributeIds.Value });

        const Value_AMS_NMixer_EqStatus = await session.read({ nodeId: nodeId_AMSRead_MMixer_EqStatus, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_EqCM = await session.read({ nodeId: nodeId_AMSRead_MMixer_EqCM, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_PCStatus = await session.read({ nodeId: nodeId_AMSRead_MMixer_PCStatus, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_BatchID = await session.read({ nodeId: nodeId_AMSRead_MMixer_BatchID, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_PRPMPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_PRPMPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_PCPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_PCPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_DRPMPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_DRPMPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_DCPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_DCPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_PASNo = await session.read({ nodeId: nodeId_AMSRead_MMixer_PASNo, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_MTimeSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_MTimeSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_MOTPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_MOTPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_MTSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_MTSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_VTPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_VTPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_MPSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_MPSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TopPPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TopPPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_VOPPPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_VOPPPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_VOPTPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_VOPTPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TWCSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TWCSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TWCPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TWCPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TWMSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TWMSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TWMPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TWMPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TWSSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TWSSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TWSPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TWSPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_IWSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_IWSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_IWPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_IWPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_CIWSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_CIWSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_CIWPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_CIWPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TIWSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TIWSV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TIWPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TIWPV, attributeId: AttributeIds.Value });
        // const Value_AMS_NMixer_SBRSV = await session.read({ nodeId: nodeId_AMSRead_MMixer_SBRSV, attributeId: AttributeIds.Value });
        // const Value_AMS_NMixer_SBRPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_SBRPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_TOLPPV = await session.read({ nodeId: nodeId_AMSRead_MMixer_TOLPPV, attributeId: AttributeIds.Value });
        const Value_AMS_NMixer_Bit32 = await session.read({ nodeId: nodeId_AMSRead_MMixer_Bit32, attributeId: AttributeIds.Value });

        const Value_AMS_Slurry1_EqStatus = await session.read({ nodeId: nodeId_AMSRead_Slurry1_EqStatus, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_EqCM = await session.read({ nodeId: nodeId_AMSRead_Slurry1_EqCM, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_BatchID = await session.read({ nodeId: nodeId_AMSRead_Slurry1_BatchID, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_ARPMPV = await session.read({ nodeId: nodeId_AMSRead_Slurry1_ARPMPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_ACPV = await session.read({ nodeId: nodeId_AMSRead_Slurry1_ACPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_PASNo = await session.read({ nodeId: nodeId_AMSRead_Slurry1_PASNo, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_MTimeSV = await session.read({ nodeId: nodeId_AMSRead_Slurry1_MTimeSV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_OT = await session.read({ nodeId: nodeId_AMSRead_Slurry1_OT, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_LvPV = await session.read({ nodeId: nodeId_AMSRead_Slurry1_LvPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_TopPPV = await session.read({ nodeId: nodeId_AMSRead_Slurry1_TopPPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry1_Bit6 = await session.read({ nodeId: nodeId_AMSRead_Slurry1_Bit6, attributeId: AttributeIds.Value });

        const Value_AMS_Slurry2_EqStatus = await session.read({ nodeId: nodeId_AMSRead_Slurry2_EqStatus, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_EqCM = await session.read({ nodeId: nodeId_AMSRead_Slurry2_EqCM, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_BatchID = await session.read({ nodeId: nodeId_AMSRead_Slurry2_BatchID, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_ARPMPV = await session.read({ nodeId: nodeId_AMSRead_Slurry2_ARPMPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_ACPV = await session.read({ nodeId: nodeId_AMSRead_Slurry2_ACPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_PASNo = await session.read({ nodeId: nodeId_AMSRead_Slurry2_PASNo, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_MTimeSV = await session.read({ nodeId: nodeId_AMSRead_Slurry2_MTimeSV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_OT = await session.read({ nodeId: nodeId_AMSRead_Slurry2_OT, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_LvPV = await session.read({ nodeId: nodeId_AMSRead_Slurry2_LvPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_TopPPV = await session.read({ nodeId: nodeId_AMSRead_Slurry2_TopPPV, attributeId: AttributeIds.Value });
        const Value_AMS_Slurry2_Bit6 = await session.read({ nodeId: nodeId_AMSRead_Slurry2_Bit6, attributeId: AttributeIds.Value });

        const Value_AP_DP_Bit7 = await session.read({ nodeId: nodeId_APRead_DP_Bit7, attributeId: AttributeIds.Value });
        const Value_AP_DP_Bit4 = await session.read({ nodeId: nodeId_APRead_DP_Bit4, attributeId: AttributeIds.Value });

        const Value_AP_MS1_PWV = await session.read({ nodeId: nodeId_APRead_MS1_PWV, attributeId: AttributeIds.Value });
        const Value_AP_MS1_ORPM = await session.read({ nodeId: nodeId_APRead_MS1_ORPM, attributeId: AttributeIds.Value });
        const Value_AP_MS1_Bit5 = await session.read({ nodeId: nodeId_APRead_MS1_Bit5, attributeId: AttributeIds.Value });

        const Value_AP_MS2_PWV = await session.read({ nodeId: nodeId_APRead_MS2_PWV, attributeId: AttributeIds.Value });
        const Value_AP_MS2_ORPM = await session.read({ nodeId: nodeId_APRead_MS2_ORPM, attributeId: AttributeIds.Value });
        const Value_AP_MS2_Bit5 = await session.read({ nodeId: nodeId_APRead_MS2_Bit5, attributeId: AttributeIds.Value });
        
        const Value_AP_SS_PWV = await session.read({ nodeId: nodeId_APRead_SS_PWV, attributeId: AttributeIds.Value });
        const Value_AP_SS_ORPM = await session.read({ nodeId: nodeId_APRead_SS_ORPM, attributeId: AttributeIds.Value });
        const Value_AP_SS_Bit5 = await session.read({ nodeId: nodeId_APRead_SS_Bit5, attributeId: AttributeIds.Value });

        const Value_AP_MDis_PWV = await session.read({ nodeId: nodeId_APRead_MDis_PWV, attributeId: AttributeIds.Value });
        const Value_AP_MDis_ORPM = await session.read({ nodeId: nodeId_APRead_MDis_ORPM, attributeId: AttributeIds.Value });
        const Value_AP_MDis_MWSV1 = await session.read({ nodeId: nodeId_APRead_MDis_MWSV1, attributeId: AttributeIds.Value });
        const Value_AP_MDis_MTWPV1 = await session.read({ nodeId: nodeId_APRead_MDis_MTWPV1, attributeId: AttributeIds.Value });
        const Value_AP_MDis_MWT1 = await session.read({ nodeId: nodeId_APRead_MDis_MWT1, attributeId: AttributeIds.Value });
        const Value_AP_MDis_MWSV2 = await session.read({ nodeId: nodeId_APRead_MDis_MWSV2, attributeId: AttributeIds.Value });
        const Value_AP_MDis_MTWPV2 = await session.read({ nodeId: nodeId_APRead_MDis_MTWPV2, attributeId: AttributeIds.Value });
        const Value_AP_MDis_MWT2 = await session.read({ nodeId: nodeId_APRead_MDis_MWT2, attributeId: AttributeIds.Value });
        const Value_AP_MDis_TWSV = await session.read({ nodeId: nodeId_APRead_MDis_TWSV, attributeId: AttributeIds.Value });
        const Value_AP_MDis_TWPV = await session.read({ nodeId: nodeId_APRead_MDis_TWPV, attributeId: AttributeIds.Value });
        const Value_AP_MDis_TWT = await session.read({ nodeId: nodeId_APRead_MDis_TWT, attributeId: AttributeIds.Value });
        const Value_AP_MDis_Bit3 = await session.read({ nodeId: nodeId_APRead_MDis_Bit3, attributeId: AttributeIds.Value });

        const Value_AP_SDis_PWV = await session.read({ nodeId: nodeId_APRead_SDis_PWV, attributeId: AttributeIds.Value });
        const Value_AP_SDis_ORPM = await session.read({ nodeId: nodeId_APRead_SDis_ORPM, attributeId: AttributeIds.Value });
        const Value_AP_SDis_SHWSV = await session.read({ nodeId: nodeId_APRead_SDis_SHWSV, attributeId: AttributeIds.Value });
        const Value_AP_SDis_SHWPV = await session.read({ nodeId: nodeId_APRead_SDis_SHWPV, attributeId: AttributeIds.Value });
        const Value_AP_SDis_SHWT = await session.read({ nodeId: nodeId_APRead_SDis_SHWT, attributeId: AttributeIds.Value });
        const Value_AP_SDis_TWSV = await session.read({ nodeId: nodeId_APRead_SDis_TWSV, attributeId: AttributeIds.Value });
        const Value_AP_SDis_TWPV = await session.read({ nodeId: nodeId_APRead_SDis_TWPV, attributeId: AttributeIds.Value });
        const Value_AP_SDis_TWT = await session.read({ nodeId: nodeId_APRead_SDis_TWT, attributeId: AttributeIds.Value });
        const Value_AP_SDis_Bit3 = await session.read({ nodeId: nodeId_APRead_SDis_Bit3, attributeId: AttributeIds.Value });

        const Value_AP_VC_Bit5 = await session.read({ nodeId: nodeId_APRead_VC_Bit5, attributeId: AttributeIds.Value });
        
	const Value_AMS_MMBCR_BCR = await session.read({ nodeId: nodeId_AMSRead_MMBCR_BCR, attributeId: AttributeIds.Value });
	const Value_AMS_MMBCR_REQ = await session.read({ nodeId: nodeId_AMSRead_MMBCR_REQ, attributeId: AttributeIds.Value });
	const Value_AMS_MMBCR_CODE = await session.read({ nodeId: nodeId_AMSRead_MMBCR_CODE, attributeId: AttributeIds.Value });
	const Value_AMS_MMBCR_REP = await session.read({ nodeId: nodeId_AMSRead_MMBCR_REP, attributeId: AttributeIds.Value });

	const Value_AMC_CMCBCR_BCR = await session.read({ nodeId: nodeId_AMCRead_CMCBCR_BCR, attributeId: AttributeIds.Value });
	const Value_AMC_CMCBCR_REQ = await session.read({ nodeId: nodeId_AMCRead_CMCBCR_REQ, attributeId: AttributeIds.Value });
	const Value_AMC_CMCBCR_CODE = await session.read({ nodeId: nodeId_AMCRead_CMCBCR_CODE, attributeId: AttributeIds.Value });
	const Value_AMC_CMCBCR_REP = await session.read({ nodeId: nodeId_AMCRead_CMCBCR_REP, attributeId: AttributeIds.Value });

	const Value_AP_DP1BCR_BCR = await session.read({ nodeId: nodeId_APRead_DP1BCR_BCR, attributeId: AttributeIds.Value });
	const Value_AP_DP1BCR_REQ = await session.read({ nodeId: nodeId_APRead_DP1BCR_REQ, attributeId: AttributeIds.Value });
	const Value_AP_DP1BCR_CODE = await session.read({ nodeId: nodeId_APRead_DP1BCR_CODE, attributeId: AttributeIds.Value });
	const Value_AP_DP1BCR_REP = await session.read({ nodeId: nodeId_APRead_DP1BCR_REP, attributeId: AttributeIds.Value });

	const Value_AP_DP2BCR_BCR = await session.read({ nodeId: nodeId_APRead_DP2BCR_BCR, attributeId: AttributeIds.Value });
	const Value_AP_DP2BCR_REQ = await session.read({ nodeId: nodeId_APRead_DP2BCR_REQ, attributeId: AttributeIds.Value });
	const Value_AP_DP2BCR_CODE = await session.read({ nodeId: nodeId_APRead_DP2BCR_CODE, attributeId: AttributeIds.Value });
	const Value_AP_DP2BCR_REP = await session.read({ nodeId: nodeId_APRead_DP2BCR_REP, attributeId: AttributeIds.Value });

	const Value_AP_DPSBCR_BCR = await session.read({ nodeId: nodeId_APRead_DPSBCR_BCR, attributeId: AttributeIds.Value });
	const Value_AP_DPSBCR_REQ = await session.read({ nodeId: nodeId_APRead_DPSBCR_REQ, attributeId: AttributeIds.Value });
	const Value_AP_DPSBCR_CODE = await session.read({ nodeId: nodeId_APRead_DPSBCR_CODE, attributeId: AttributeIds.Value });
	const Value_AP_DPSBCR_REP = await session.read({ nodeId: nodeId_APRead_DPSBCR_REP, attributeId: AttributeIds.Value });

        let json_ADW_DIWater = {}
        let topic_ADW_DIWater = 'sfs.machine.diw.a.diw1';
        json_ADW_DIWater.BatchID = redis_value;
        json_ADW_DIWater.EqStatus = {}
        json_ADW_DIWater.EqStatus.min = 0;
        json_ADW_DIWater.EqStatus.max = 9;
        json_ADW_DIWater.EqStatus.value = Value_ADW_DIWater_EqStatus.value.value;
        json_ADW_DIWater.EqCM = {}
        json_ADW_DIWater.EqCM.min = 0;
        json_ADW_DIWater.EqCM.max = 9;
        json_ADW_DIWater.EqCM.value = Value_ADW_DIWater_EqCM.value.value;
        json_ADW_DIWater.LvPV = {}
        json_ADW_DIWater.LvPV.unit = "l";
        json_ADW_DIWater.LvPV.min = 0;
        json_ADW_DIWater.LvPV.max = 1000;
        json_ADW_DIWater.LvPV.value = Value_ADW_DIWater_LvPV.value.value;
        json_ADW_DIWater.TopPPV = {}
        json_ADW_DIWater.TopPPV.unit = "MPa";
        json_ADW_DIWater.TopPPV.min = -0.100;
        json_ADW_DIWater.TopPPV.max = 0.300;
        json_ADW_DIWater.TopPPV.value = (Value_ADW_DIWater_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_ADW_DIWater.T1PPV = {}
        json_ADW_DIWater.T1PPV.unit = "MPa";
        json_ADW_DIWater.T1PPV.min = 0;
        json_ADW_DIWater.T1PPV.max = 1.000;
        json_ADW_DIWater.T1PPV.value = (Value_ADW_DIWater_T1PPV.value.value * 0.001).toFixed(3) * 1;
        json_ADW_DIWater.T2PPV = {}
        json_ADW_DIWater.T2PPV.unit = "MPa";
        json_ADW_DIWater.T2PPV.min = 0;
        json_ADW_DIWater.T2PPV.max = 1.000;
        json_ADW_DIWater.T2PPV.value = (Value_ADW_DIWater_T2PPV.value.value * 0.001).toFixed(3) * 1;
        const ADW_DIWater_Bit12 = binaryDigits(Value_ADW_DIWater_Bit12.value.value, 12);
        json_ADW_DIWater.TOGV1 = ADW_DIWater_Bit12[11];
        json_ADW_DIWater.TOGV2 = ADW_DIWater_Bit12[10];
        json_ADW_DIWater.TSP1 = ADW_DIWater_Bit12[9];
        json_ADW_DIWater.TSP2 = ADW_DIWater_Bit12[8];
        json_ADW_DIWater.TOLCV = ADW_DIWater_Bit12[7];
        json_ADW_DIWater.TOL1 = ADW_DIWater_Bit12[6];
        json_ADW_DIWater.TOL2 = ADW_DIWater_Bit12[5];
        json_ADW_DIWater.SPARE = ADW_DIWater_Bit12[4];
        json_ADW_DIWater.DWIV = ADW_DIWater_Bit12[3];
        json_ADW_DIWater.AIV = ADW_DIWater_Bit12[2];
        json_ADW_DIWater.EV = ADW_DIWater_Bit12[1];
        json_ADW_DIWater.LHIS = ADW_DIWater_Bit12[0];

        let json_AMC_CMixer = {}
        let topic_AMC_CMixer = 'sfs.machine.binder.a.cmix1';
        json_AMC_CMixer.EqStatus = {}
        json_AMC_CMixer.EqStatus.min = 0;
        json_AMC_CMixer.EqStatus.max = 9;
        json_AMC_CMixer.EqStatus.value = Value_AMC_CMixer_EqStatus.value.value;
        json_AMC_CMixer.EqCM = {}
        json_AMC_CMixer.EqCM.min = 0;
        json_AMC_CMixer.EqCM.max = 9;
        json_AMC_CMixer.EqCM.value = Value_AMC_CMixer_EqCM.value.value;
        json_AMC_CMixer.PCStatus = {}
        json_AMC_CMixer.PCStatus.min = 0;
        json_AMC_CMixer.PCStatus.max = 9;
        json_AMC_CMixer.PCStatus.value = Value_AMC_CMixer_PCStatus.value.value;
        json_AMC_CMixer.BatchID = {}
        json_AMC_CMixer.BatchID.value = Value_AMC_CMixer_BatchID.value.value;
        json_AMC_CMixer.ARPMPV = {}
        json_AMC_CMixer.ARPMPV.unit = 'RPM'
        json_AMC_CMixer.ARPMPV.min = 0;
        json_AMC_CMixer.ARPMPV.max = 60;
        json_AMC_CMixer.ARPMPV.value = Value_AMC_CMixer_ARPMPV.value.value;
        json_AMC_CMixer.ACPV = {}
        json_AMC_CMixer.ACPV.unit = 'Amp'
        json_AMC_CMixer.ACPV.min = 0.0;
        json_AMC_CMixer.ACPV.max = 10.0;
        json_AMC_CMixer.ACPV.value = (Value_AMC_CMixer_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_AMC_CMixer.DRPMPV = {}
        json_AMC_CMixer.DRPMPV.unit = 'RPM'
        json_AMC_CMixer.DRPMPV.min = 0;
        json_AMC_CMixer.DRPMPV.max = 1750;
        json_AMC_CMixer.DRPMPV.value = Value_AMC_CMixer_DRPMPV.value.value;
        json_AMC_CMixer.DCPV = {}
        json_AMC_CMixer.DCPV.unit = 'Amp'
        json_AMC_CMixer.DCPV.min = 0.0;
        json_AMC_CMixer.DCPV.max = 14.0;
        json_AMC_CMixer.DCPV.value = (Value_AMC_CMixer_DCPV.value.value * 0.1).toFixed(1) * 1;
        json_AMC_CMixer.PASNo = {}
        json_AMC_CMixer.PASNo.min = 0;
        json_AMC_CMixer.PASNo.max = 30;
        json_AMC_CMixer.PASNo.value = Value_AMC_CMixer_PASNo.value.value;
        json_AMC_CMixer.MTimeSV = {}
        json_AMC_CMixer.MTimeSV.unit = 'Min'
        json_AMC_CMixer.MTimeSV.min = 0;
        json_AMC_CMixer.MTimeSV.max = 999;
        json_AMC_CMixer.MTimeSV.value = Value_AMC_CMixer_MTimeSV.value.value;
        json_AMC_CMixer.MOTPV = {}
        json_AMC_CMixer.MOTPV.unit = 'Min'
        json_AMC_CMixer.MOTPV.min = 0;
        json_AMC_CMixer.MOTPV.max = 999;
        json_AMC_CMixer.MOTPV.value = Value_AMC_CMixer_MOTPV.value.value;
        json_AMC_CMixer.LvPV = {}
        json_AMC_CMixer.LvPV.unit = 'l'
        json_AMC_CMixer.LvPV.min = 0;
        json_AMC_CMixer.LvPV.max = 350;
        json_AMC_CMixer.LvPV.value = Value_AMC_CMixer_LvPV.value.value;
        json_AMC_CMixer.MTSV = {}
        json_AMC_CMixer.MTSV.unit = '°C'
        json_AMC_CMixer.MTSV.min = 0;
        json_AMC_CMixer.MTSV.max = 150.0;
        json_AMC_CMixer.MTSV.value = (Value_AMC_CMixer_MTSV.value.value * 0.1).toFixed(1) * 1;
        json_AMC_CMixer.TPV = {}
        json_AMC_CMixer.TPV.unit = '°C'
        json_AMC_CMixer.TPV.min = 0;
        json_AMC_CMixer.TPV.max = 150.0;
        json_AMC_CMixer.TPV.value = (Value_AMC_CMixer_TPV.value.value * 0.1).toFixed(1) * 1;
        json_AMC_CMixer.MPSV = {}
        json_AMC_CMixer.MPSV.unit = 'MPa'
        json_AMC_CMixer.MPSV.min = -0.100;
        json_AMC_CMixer.MPSV.max = 0.300;
        json_AMC_CMixer.MPSV.value = (Value_AMC_CMixer_MPSV.value.value * 0.001).toFixed(3) * 1;
        json_AMC_CMixer.TopPPV = {}
        json_AMC_CMixer.TopPPV.unit = 'MPa'
        json_AMC_CMixer.TopPPV.min = -0.100;
        json_AMC_CMixer.TopPPV.max = 0.300;
        json_AMC_CMixer.TopPPV.value = (Value_AMC_CMixer_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_AMC_CMixer.TWBWSV = {}
        json_AMC_CMixer.TWBWSV.unit = 'kg'
        json_AMC_CMixer.TWBWSV.min = 0.00;
        json_AMC_CMixer.TWBWSV.max = 999.99;
        json_AMC_CMixer.TWBWSV.value = (Value_AMC_CMixer_TWBWSV.value.value * 0.01).toFixed(2) * 1;;
        json_AMC_CMixer.TWBWPV = {}
        json_AMC_CMixer.TWBWPV.unit = 'kg'
        json_AMC_CMixer.TWBWPV.min = -99.99;
        json_AMC_CMixer.TWBWPV.max = 999.99;
        json_AMC_CMixer.TWBWPV.value = (Value_AMC_CMixer_TWBWPV.value.value * 0.01).toFixed(2) * 1;
        json_AMC_CMixer.TIWSV = {}
        json_AMC_CMixer.TIWSV.unit = 'kg'
        json_AMC_CMixer.TIWSV.min = 0.00;
        json_AMC_CMixer.TIWSV.max = 999.99;
        json_AMC_CMixer.TIWSV.value = (Value_AMC_CMixer_TIWSV.value.value * 0.01).toFixed(2) * 1;
        json_AMC_CMixer.WIWPV = {}
        json_AMC_CMixer.WIWPV.unit = 'kg'
        json_AMC_CMixer.WIWPV.min = 0.00;
        json_AMC_CMixer.WIWPV.max = 999.99;
        json_AMC_CMixer.WIWPV.value = (Value_AMC_CMixer_WIWPV.value.value * 0.01).toFixed(2) * 1;
        const AMC_CMixer_Bit18 = binaryDigits(Value_AMC_CMixer_Bit18.value.value, 18);
        json_AMC_CMixer.TOGVS = AMC_CMixer_Bit18[17];
        json_AMC_CMixer.TOLDP = AMC_CMixer_Bit18[16];
        json_AMC_CMixer.CMIHV = AMC_CMixer_Bit18[15];
        json_AMC_CMixer.CMIHS = AMC_CMixer_Bit18[14];
        json_AMC_CMixer.MAV = AMC_CMixer_Bit18[13];
        json_AMC_CMixer.OGVO = AMC_CMixer_Bit18[12];
        json_AMC_CMixer.OGVC = AMC_CMixer_Bit18[11];
        json_AMC_CMixer.PV = AMC_CMixer_Bit18[10];
        json_AMC_CMixer.VV = AMC_CMixer_Bit18[9];
        json_AMC_CMixer.CMVEV = AMC_CMixer_Bit18[8];
        json_AMC_CMixer.MMIV = AMC_CMixer_Bit18[7];
        json_AMC_CMixer.DWIV = AMC_CMixer_Bit18[6];
        json_AMC_CMixer.DWFC = AMC_CMixer_Bit18[5];
        json_AMC_CMixer.DWLVL = AMC_CMixer_Bit18[4];
        json_AMC_CMixer.DWLVS = AMC_CMixer_Bit18[3];
        json_AMC_CMixer.AIV = AMC_CMixer_Bit18[2];
        json_AMC_CMixer.EV = AMC_CMixer_Bit18[1];
        json_AMC_CMixer.VFV = AMC_CMixer_Bit18[0];

        let json_AMC_CMCST = {}
        let topic_AMC_CMCST = 'sfs.machine.mixer.a.cmc1';
        json_AMC_CMCST.EqStatus = {}
        json_AMC_CMCST.EqStatus.min = 0;
        json_AMC_CMCST.EqStatus.max = 9;
        json_AMC_CMCST.EqStatus.value = Value_AMC_CMCST_EqStatus.value.value;
        json_AMC_CMCST.EqCM = {}
        json_AMC_CMCST.EqCM.min = 0;
        json_AMC_CMCST.EqCM.max = 9;
        json_AMC_CMCST.EqCM.value = Value_AMC_CMCST_EqCM.value.value;
        json_AMC_CMCST.BatchID = {}
        json_AMC_CMCST.BatchID.value = Value_AMC_CMCST_BatchID.value.value;
        json_AMC_CMCST.ARPMPV = {}
        json_AMC_CMCST.ARPMPV.unit = 'RPM';
        json_AMC_CMCST.ARPMPV.min = 0;
        json_AMC_CMCST.ARPMPV.max = 60;
        json_AMC_CMCST.ARPMPV.value = Value_AMC_CMCST_ARPMPV.value.value;
        json_AMC_CMCST.ACPV = {}
        json_AMC_CMCST.ACPV.unit = 'Amp';
        json_AMC_CMCST.ACPV.min = 0.0;
        json_AMC_CMCST.ACPV.max = 6.0;
        json_AMC_CMCST.ACPV.value = Value_AMC_CMCST_ACPV.value.value;
        json_AMC_CMCST.RPRPM = {}
        json_AMC_CMCST.RPRPM.unit = 'RPM';
        json_AMC_CMCST.RPRPM.min = 0;
        json_AMC_CMCST.RPRPM.max = 60;
        json_AMC_CMCST.RPRPM.value = Value_AMC_CMCST_RPRPM.value.value;
        json_AMC_CMCST.LvPV = {}
        json_AMC_CMCST.LvPV.unit = 'l';
        json_AMC_CMCST.LvPV.min = 0;
        json_AMC_CMCST.LvPV.max = 350;
        json_AMC_CMCST.LvPV.value = Value_AMC_CMCST_LvPV.value.value;
        json_AMC_CMCST.TopPPV = {}
        json_AMC_CMCST.TopPPV.unit = 'MPa';
        json_AMC_CMCST.TopPPV.min = -0.100;
        json_AMC_CMCST.TopPPV.max = 0.300;
        json_AMC_CMCST.TopPPV.value = (Value_AMC_CMCST_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_AMC_CMCST.TPV = {}
        json_AMC_CMCST.TPV.unit = '°C';
        json_AMC_CMCST.TPV.min = 0.0;
        json_AMC_CMCST.TPV.max = 150.0;
        json_AMC_CMCST.TPV.value = (Value_AMC_CMCST_TPV.value.value * 0.1).toFixed(1) * 1;
        const AMC_CMCST_Bit4 = binaryDigits(Value_AMC_CMCST_Bit4.value.value, 4);
        json_AMC_CMCST.CSIV = AMC_CMCST_Bit4[3];
        json_AMC_CMCST.DWIV = AMC_CMCST_Bit4[2];
        json_AMC_CMCST.AIV = AMC_CMCST_Bit4[1];
        json_AMC_CMCST.EV = AMC_CMCST_Bit4[0];
        
        let json_AMC_CNTST = {}
        let topic_AMC_CNTST = 'sfs.machine.mixer.a.cnt1';
        json_AMC_CNTST.EqStatus = {}
        json_AMC_CNTST.EqStatus.min = 0;
        json_AMC_CNTST.EqStatus.max = 9;
        json_AMC_CNTST.EqStatus.value = Value_AMC_CNTST_EqStatus.value.value;
        json_AMC_CNTST.EqCM = {}
        json_AMC_CNTST.EqCM.min = 0;
        json_AMC_CNTST.EqCM.max = 9;
        json_AMC_CNTST.EqCM.value = Value_AMC_CNTST_EqCM.value.value;
        json_AMC_CNTST.BatchID = {}
        json_AMC_CNTST.BatchID.value = Value_AMC_CNTST_BatchID.value.value;
        json_AMC_CNTST.ARPMPV = {}
        json_AMC_CNTST.ARPMPV.unit = "RPM";
        json_AMC_CNTST.ARPMPV.min = 0;
        json_AMC_CNTST.ARPMPV.max = 60;
        json_AMC_CNTST.ARPMPV.value = Value_AMC_CNTST_ARPMPV.value.value;
        json_AMC_CNTST.ACPV = {}
        json_AMC_CNTST.ACPV.unit = "Amp";
        json_AMC_CNTST.ACPV.min = 0.0;
        json_AMC_CNTST.ACPV.max = 3.0;
        json_AMC_CNTST.ACPV.value = (Value_AMC_CNTST_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_AMC_CNTST.LvPV = {}
        json_AMC_CNTST.LvPV.unit = "l";
        json_AMC_CNTST.LvPV.min = 0;
        json_AMC_CNTST.LvPV.max = 300;
        json_AMC_CNTST.LvPV.value = Value_AMC_CNTST_LvPV.value.value;
        json_AMC_CNTST.TopPPV = {}
        json_AMC_CNTST.TopPPV.unit = "MPa";
        json_AMC_CNTST.TopPPV.min = -0.100;
        json_AMC_CNTST.TopPPV.max = 0.300;
        json_AMC_CNTST.TopPPV.value = (Value_AMC_CNTST_TopPPV.value.value * 0.001).toFixed(3) * 1;
        const AMC_CNTST_Bit7 = binaryDigits(Value_AMC_CNTST_Bit7.value.value, 7);
        json_AMC_CNTST.TOGVS = AMC_CNTST_Bit7[6];
        json_AMC_CNTST.TOLVS = AMC_CNTST_Bit7[5];
        json_AMC_CNTST.CCDP = AMC_CNTST_Bit7[4];
        json_AMC_CNTST.CIV = AMC_CNTST_Bit7[3];
        json_AMC_CNTST.DWIV = AMC_CNTST_Bit7[2];
        json_AMC_CNTST.AIV = AMC_CNTST_Bit7[1];
        json_AMC_CNTST.EV = AMC_CNTST_Bit7[0];

        let json_AMS_MMixer = {}
        let topic_AMS_MMixer = 'sfs.machine.mixer.a.mmix1';
        json_AMS_MMixer.EqStatus = {}
        json_AMS_MMixer.EqStatus.min = 0;
        json_AMS_MMixer.EqStatus.max = 9;
        json_AMS_MMixer.EqStatus.value = Value_AMS_NMixer_EqStatus.value.value;
        json_AMS_MMixer.EqCM = {}
        json_AMS_MMixer.EqCM.min = 0;
        json_AMS_MMixer.EqCM.max = 9;
        json_AMS_MMixer.EqCM.value = Value_AMS_NMixer_EqCM.value.value;
        json_AMS_MMixer.PCStatus = {}
        json_AMS_MMixer.PCStatus.min = 0;
        json_AMS_MMixer.PCStatus.max = 9;
        json_AMS_MMixer.PCStatus.value = Value_AMS_NMixer_PCStatus.value.value;
        json_AMS_MMixer.BatchID = {}
        json_AMS_MMixer.BatchID.value = redis_value;
        json_AMS_MMixer.PRPMPV = {}
        json_AMS_MMixer.PRPMPV.unit = "RPM";
        json_AMS_MMixer.PRPMPV.min = 0;
        json_AMS_MMixer.PRPMPV.max = 45;
        json_AMS_MMixer.PRPMPV.value = Value_AMS_NMixer_PRPMPV.value.value;
        json_AMS_MMixer.PCPV = {}
        json_AMS_MMixer.PCPV.unit = "Amp";
        json_AMS_MMixer.PCPV.min = 0.0;
        json_AMS_MMixer.PCPV.max = 67.0;
        json_AMS_MMixer.PCPV.value = (Value_AMS_NMixer_PCPV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_MMixer.DRPMPV = {}
        json_AMS_MMixer.DRPMPV.unit = "RPM";
        json_AMS_MMixer.DRPMPV.min = 0;
        json_AMS_MMixer.DRPMPV.max = 1750;
        json_AMS_MMixer.DRPMPV.value = Value_AMS_NMixer_DRPMPV.value.value;
        json_AMS_MMixer.DCPV = {}
        json_AMS_MMixer.DCPV.unit = "Amp";
        json_AMS_MMixer.DCPV.min = 0.0;
        json_AMS_MMixer.DCPV.max = 67.0;
        json_AMS_MMixer.DCPV.value = (Value_AMS_NMixer_DCPV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_MMixer.PASNo = {}
        json_AMS_MMixer.PASNo.min = 0;
        json_AMS_MMixer.PASNo.max = 30;
        json_AMS_MMixer.PASNo.value = Value_AMS_NMixer_PASNo.value.value;
        json_AMS_MMixer.MTimeSV = {}
        json_AMS_MMixer.MTimeSV.unit = 'Min';
        json_AMS_MMixer.MTimeSV.min = 0;
        json_AMS_MMixer.MTimeSV.max = 999;
        json_AMS_MMixer.MTimeSV.value = Value_AMS_NMixer_MTimeSV.value.value;
        json_AMS_MMixer.MOTPV = {}
        json_AMS_MMixer.MOTPV.unit = 'Min';
        json_AMS_MMixer.MOTPV.min = 0;
        json_AMS_MMixer.MOTPV.max = 999;
        json_AMS_MMixer.MOTPV.value = Value_AMS_NMixer_MOTPV.value.value;
        json_AMS_MMixer.MTSV = {}
        json_AMS_MMixer.MTSV.unit = '°C';
        json_AMS_MMixer.MTSV.min = 0.0;
        json_AMS_MMixer.MTSV.max = 150.0;
        json_AMS_MMixer.MTSV.value = (Value_AMS_NMixer_MTSV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_MMixer.VTPV = {}
        json_AMS_MMixer.VTPV.unit = '°C';
        json_AMS_MMixer.VTPV.min = 0.0;
        json_AMS_MMixer.VTPV.max = 150.0;
        json_AMS_MMixer.VTPV.value = (Value_AMS_NMixer_VTPV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_MMixer.MPSV = {}
        json_AMS_MMixer.MPSV.unit = 'MPa';
        json_AMS_MMixer.MPSV.min = -0.100;
        json_AMS_MMixer.MPSV.max = 0.300;
        json_AMS_MMixer.MPSV.value = (Value_AMS_NMixer_MPSV.value.value * 0.001).toFixed(3) * 1;
        json_AMS_MMixer.TopPPV = {}
        json_AMS_MMixer.TopPPV.unit = 'MPa';
        json_AMS_MMixer.TopPPV.min = -0.100;
        json_AMS_MMixer.TopPPV.max = 0.300;
        json_AMS_MMixer.TopPPV.value = (Value_AMS_NMixer_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_AMS_MMixer.VOPPPV = {}
        json_AMS_MMixer.VOPPPV.unit = 'MPa';
        json_AMS_MMixer.VOPPPV.min = 0.000;
        json_AMS_MMixer.VOPPPV.max = 20.000;
        json_AMS_MMixer.VOPPPV.value = (Value_AMS_NMixer_VOPPPV.value.value * 0.001).toFixed(3) * 1;
        json_AMS_MMixer.VOPTPV = {}
        json_AMS_MMixer.VOPTPV.unit = 'MPa';
        json_AMS_MMixer.VOPTPV.min = 0.0;
        json_AMS_MMixer.VOPTPV.max = 150.0;
        json_AMS_MMixer.VOPTPV.value = (Value_AMS_NMixer_VOPTPV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_MMixer.TWCSV = {}
        json_AMS_MMixer.TWCSV.unit = 'kg';
        json_AMS_MMixer.TWCSV.min = 0.00;
        json_AMS_MMixer.TWCSV.max = 9999.99;
        json_AMS_MMixer.TWCSV.value = (Value_AMS_NMixer_TWCSV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TWCPV = {}
        json_AMS_MMixer.TWCPV.unit = 'kg';
        json_AMS_MMixer.TWCPV.min = -99.99;
        json_AMS_MMixer.TWCPV.max = 9999.99;
        json_AMS_MMixer.TWCPV.value = (Value_AMS_NMixer_TWCPV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TWMSV = {}
        json_AMS_MMixer.TWMSV.unit = 'kg';
        json_AMS_MMixer.TWMSV.min = 0.00;
        json_AMS_MMixer.TWMSV.max = 9999.99;
        json_AMS_MMixer.TWMSV.value = (Value_AMS_NMixer_TWMSV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TWMPV = {}
        json_AMS_MMixer.TWMPV.unit = 'kg';
        json_AMS_MMixer.TWMPV.min = -99.99;
        json_AMS_MMixer.TWMPV.max = 9999.99;
        json_AMS_MMixer.TWMPV.value = (Value_AMS_NMixer_TWMPV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TWSSV = {}
        json_AMS_MMixer.TWSSV.unit = 'kg';
        json_AMS_MMixer.TWSSV.min = 0.00;
        json_AMS_MMixer.TWSSV.max = 9999.99;
        json_AMS_MMixer.TWSSV.value = (Value_AMS_NMixer_TWSSV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TWSPV = {}
        json_AMS_MMixer.TWSPV.unit = 'kg';
        json_AMS_MMixer.TWSPV.min = -99.99;
        json_AMS_MMixer.TWSPV.max = 9999.99;
        json_AMS_MMixer.TWSPV.value = (Value_AMS_NMixer_TWSPV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.IWSV = {}
        json_AMS_MMixer.IWSV.unit = 'kg';
        json_AMS_MMixer.IWSV.min = 0.00;
        json_AMS_MMixer.IWSV.max = 9999.99;
        json_AMS_MMixer.IWSV.value = (Value_AMS_NMixer_IWSV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.IWPV = {}
        json_AMS_MMixer.IWPV.unit = 'kg';
        json_AMS_MMixer.IWPV.min = -99.99;
        json_AMS_MMixer.IWPV.max = 9999.99;
        json_AMS_MMixer.IWPV.value = (Value_AMS_NMixer_IWPV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.CIWSV = {}
        json_AMS_MMixer.CIWSV.unit = 'kg';
        json_AMS_MMixer.CIWSV.min = 0.00;
        json_AMS_MMixer.CIWSV.max = 9999.99;
        json_AMS_MMixer.CIWSV.value = (Value_AMS_NMixer_CIWSV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.CIWPV = {}
        json_AMS_MMixer.CIWPV.unit = 'kg';
        json_AMS_MMixer.CIWPV.min = -99.99;
        json_AMS_MMixer.CIWPV.max = 9999.99;
        json_AMS_MMixer.CIWPV.value = (Value_AMS_NMixer_CIWPV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TIWSV = {}
        json_AMS_MMixer.TIWSV.unit = 'kg';
        json_AMS_MMixer.TIWSV.min = 0.00;
        json_AMS_MMixer.TIWSV.max = 9999.99;
        json_AMS_MMixer.TIWSV.value = (Value_AMS_NMixer_TIWSV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TIWPV = {}
        json_AMS_MMixer.TIWPV.unit = 'kg';
        json_AMS_MMixer.TIWPV.min = -99.99;
        json_AMS_MMixer.TIWPV.max = 9999.99;
        json_AMS_MMixer.TIWPV.value = (Value_AMS_NMixer_TIWPV.value.value * 0.01).toFixed(2) * 1;
        json_AMS_MMixer.TOLPPV = {}
        json_AMS_MMixer.TOLPPV.unit = 'MPa';
        json_AMS_MMixer.TOLPPV.min = -0.100;
        json_AMS_MMixer.TOLPPV.max = 1.000;
        json_AMS_MMixer.TOLPPV.value = (Value_AMS_NMixer_TOLPPV.value.value * 0.001).toFixed(3) * 1;
        const AMS_MMixer_Bit6 = binaryDigits(Value_AMS_NMixer_Bit32.value.value, 32);
        json_AMS_MMixer.TOGVS = AMS_MMixer_Bit6[31];
        json_AMS_MMixer.TOLDP = AMS_MMixer_Bit6[30];
        json_AMS_MMixer.CIHVV = AMS_MMixer_Bit6[29];
        json_AMS_MMixer.CIHSV = AMS_MMixer_Bit6[28];
        json_AMS_MMixer.CVMAV = AMS_MMixer_Bit6[27];
        json_AMS_MMixer.CVOGVO = AMS_MMixer_Bit6[26];
        json_AMS_MMixer.CVOGVC = AMS_MMixer_Bit6[25];
        json_AMS_MMixer.CVPV = AMS_MMixer_Bit6[24];
        json_AMS_MMixer.CVVV = AMS_MMixer_Bit6[23];
        json_AMS_MMixer.CVEV = AMS_MMixer_Bit6[22];
        json_AMS_MMixer.CMIV = AMS_MMixer_Bit6[21];
        json_AMS_MMixer.MMIV = AMS_MMixer_Bit6[20];
        json_AMS_MMixer.SMIV = AMS_MMixer_Bit6[19];
        json_AMS_MMixer.CIV = AMS_MMixer_Bit6[18];
        json_AMS_MMixer.CFCV = AMS_MMixer_Bit6[17];
        json_AMS_MMixer.CLVL = AMS_MMixer_Bit6[16];
        json_AMS_MMixer.CLVS = AMS_MMixer_Bit6[15];
        json_AMS_MMixer.DWSR = AMS_MMixer_Bit6[14];
        json_AMS_MMixer.DWIV = AMS_MMixer_Bit6[13];
        json_AMS_MMixer.DWFC = AMS_MMixer_Bit6[12];
        json_AMS_MMixer.DWLVL = AMS_MMixer_Bit6[11];
        json_AMS_MMixer.DWLVS = AMS_MMixer_Bit6[10];
        json_AMS_MMixer.SIV = AMS_MMixer_Bit6[9];
        json_AMS_MMixer.SFCV = AMS_MMixer_Bit6[8];
        json_AMS_MMixer.AIV = AMS_MMixer_Bit6[7];
        json_AMS_MMixer.EV = AMS_MMixer_Bit6[6];
        json_AMS_MMixer.VFV = AMS_MMixer_Bit6[5];
        json_AMS_MMixer.VV = AMS_MMixer_Bit6[4];
        json_AMS_MMixer.CIV = AMS_MMixer_Bit6[3];
        json_AMS_MMixer.SLDS = AMS_MMixer_Bit6[2];
        json_AMS_MMixer.VOP = AMS_MMixer_Bit6[1];

        let json_AMS_Slurry1 = {}
        let topic_AMS_Slurry1 = 'sfs.machine.mixer.a.slur1';
        json_AMS_Slurry1.EqStatus = {}
        json_AMS_Slurry1.EqStatus.min = 0;
        json_AMS_Slurry1.EqStatus.max = 9;
        json_AMS_Slurry1.EqStatus.value = Value_AMS_Slurry1_EqStatus.value.value;
        json_AMS_Slurry1.EqCM = {}
        json_AMS_Slurry1.EqCM.min = 0;
        json_AMS_Slurry1.EqCM.max = 9;
        json_AMS_Slurry1.EqCM.value = Value_AMS_Slurry1_EqCM.value.value;
        json_AMS_Slurry1.BatchID = {}
        json_AMS_Slurry1.BatchID.value = Value_AMS_Slurry1_BatchID.value.value;
        json_AMS_Slurry1.ARPMPV = {}
        json_AMS_Slurry1.ARPMPV.unit = 'RPM';
        json_AMS_Slurry1.ARPMPV.min = 0;
        json_AMS_Slurry1.ARPMPV.max = 60;
        json_AMS_Slurry1.ARPMPV.value = Value_AMS_Slurry1_ARPMPV.value.value;
        json_AMS_Slurry1.ACPV = {}
        json_AMS_Slurry1.ACPV.unit = 'Amp';
        json_AMS_Slurry1.ACPV.min = 0.0;
        json_AMS_Slurry1.ACPV.max = 6.0;
        json_AMS_Slurry1.ACPV.value = (Value_AMS_Slurry1_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_Slurry1.PASNo = {}
        json_AMS_Slurry1.PASNo.min = 0;
        json_AMS_Slurry1.PASNo.max = 30;
        json_AMS_Slurry1.PASNo.value = Value_AMS_Slurry1_PASNo.value.value;
        json_AMS_Slurry1.MTimeSV = {}
        json_AMS_Slurry1.MTimeSV.unit = 'Min';
        json_AMS_Slurry1.MTimeSV.min = 0;
        json_AMS_Slurry1.MTimeSV.max = 999;
        json_AMS_Slurry1.MTimeSV.value = Value_AMS_Slurry1_MTimeSV.value.value;
        json_AMS_Slurry1.OT = {}
        json_AMS_Slurry1.OT.unit = 'Min';
        json_AMS_Slurry1.OT.min = 0;
        json_AMS_Slurry1.OT.max = 999;
        json_AMS_Slurry1.OT.value = Value_AMS_Slurry1_OT.value.value;
        json_AMS_Slurry1.LvPV = {}
        json_AMS_Slurry1.LvPV.unit = 'l';
        json_AMS_Slurry1.LvPV.min = 0;
        json_AMS_Slurry1.LvPV.max = 350;
        json_AMS_Slurry1.LvPV.value = Value_AMS_Slurry1_LvPV.value.value;
        json_AMS_Slurry1.TopPPV = {}
        json_AMS_Slurry1.TopPPV.unit = 'MPa';
        json_AMS_Slurry1.TopPPV.min = -0.100;
        json_AMS_Slurry1.TopPPV.max = 0.300;
        json_AMS_Slurry1.TopPPV.value = (Value_AMS_Slurry1_TopPPV.value.value * 0.001).toFixed(3) * 1;
        const AMS_Slurry1_Bit6 = binaryDigits(Value_AMS_Slurry1_Bit6.value.value, 6);
        json_AMS_Slurry1.SILV = AMS_Slurry1_Bit6[5];
        json_AMS_Slurry1.SIV = AMS_Slurry1_Bit6[4];
        json_AMS_Slurry1.DWIV = AMS_Slurry1_Bit6[3];
        json_AMS_Slurry1.AIV = AMS_Slurry1_Bit6[2];
        json_AMS_Slurry1.EV = AMS_Slurry1_Bit6[1];
        json_AMS_Slurry1.VV = AMS_Slurry1_Bit6[0];

        let json_AMS_Slurry2 = {}
        let topic_AMS_Slurry2 = 'sfs.machine.mixer.a.slur2';
        json_AMS_Slurry2.EqStatus = {}
        json_AMS_Slurry2.EqStatus.min = 0;
        json_AMS_Slurry2.EqStatus.max = 9;
        json_AMS_Slurry2.EqStatus.value = Value_AMS_Slurry2_EqStatus.value.value;
        json_AMS_Slurry2.EqCM = {}
        json_AMS_Slurry2.EqCM.min = 0;
        json_AMS_Slurry2.EqCM.max = 9;
        json_AMS_Slurry2.EqCM.value = Value_AMS_Slurry2_EqCM.value.value;
        json_AMS_Slurry2.BatchID = {}
        json_AMS_Slurry2.BatchID.value = Value_AMS_Slurry2_BatchID.value.value;
        json_AMS_Slurry2.ARPMPV = {}
        json_AMS_Slurry2.ARPMPV.unit = 'RPM';
        json_AMS_Slurry2.ARPMPV.min = 0;
        json_AMS_Slurry2.ARPMPV.max = 60;
        json_AMS_Slurry2.ARPMPV.value = Value_AMS_Slurry2_ARPMPV.value.value;
        json_AMS_Slurry2.ACPV = {}
        json_AMS_Slurry2.ACPV.unit = 'Amp';
        json_AMS_Slurry2.ACPV.min = 0.0;
        json_AMS_Slurry2.ACPV.max = 6.0;
        json_AMS_Slurry2.ACPV.value = (Value_AMS_Slurry2_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_AMS_Slurry2.PASNo = {}
        json_AMS_Slurry2.PASNo.min = 0;
        json_AMS_Slurry2.PASNo.max = 30;
        json_AMS_Slurry2.PASNo.value = Value_AMS_Slurry2_PASNo.value.value;
        json_AMS_Slurry2.MTimeSV = {}
        json_AMS_Slurry2.MTimeSV.unit = 'Min';
        json_AMS_Slurry2.MTimeSV.min = 0;
        json_AMS_Slurry2.MTimeSV.max = 999;
        json_AMS_Slurry2.MTimeSV.value = Value_AMS_Slurry2_MTimeSV.value.value;
        json_AMS_Slurry2.OT = {}
        json_AMS_Slurry2.OT.unit = 'Min';
        json_AMS_Slurry2.OT.min = 0;
        json_AMS_Slurry2.OT.max = 999;
        json_AMS_Slurry2.OT.value = Value_AMS_Slurry2_OT.value.value;
        json_AMS_Slurry2.LvPV = {}
        json_AMS_Slurry2.LvPV.unit = 'l';
        json_AMS_Slurry2.LvPV.min = 0;
        json_AMS_Slurry2.LvPV.max = 350;
        json_AMS_Slurry2.LvPV.value = Value_AMS_Slurry2_LvPV.value.value;
        json_AMS_Slurry2.TopPPV = {}
        json_AMS_Slurry2.TopPPV.unit = 'MPa';
        json_AMS_Slurry2.TopPPV.min = -0.100;
        json_AMS_Slurry2.TopPPV.max = 0.300;
        json_AMS_Slurry2.TopPPV.value = (Value_AMS_Slurry2_TopPPV.value.value * 0.001).toFixed(3) * 1;
        const AMS_Slurry2_Bit6 = binaryDigits(Value_AMS_Slurry2_Bit6.value.value, 6);
        json_AMS_Slurry2.SILV = AMS_Slurry2_Bit6[5];
        json_AMS_Slurry2.SIV = AMS_Slurry2_Bit6[4];
        json_AMS_Slurry2.DWIV = AMS_Slurry2_Bit6[3];
        json_AMS_Slurry2.AIV = AMS_Slurry2_Bit6[2];
        json_AMS_Slurry2.EV = AMS_Slurry2_Bit6[1];
        json_AMS_Slurry2.VV = AMS_Slurry2_Bit6[0];

        let json_AP_DP = {}
        let topic_AP_DP = 'sfs.machine.powder.a.dp1';
        const AP_DP_Bit7 = binaryDigits(Value_AP_DP_Bit7.value.value, 7);
        json_AP_DP.MAV = AP_DP_Bit7[6];
        json_AP_DP.MPLS1 = AP_DP_Bit7[5];
        json_AP_DP.MPLS2 = AP_DP_Bit7[4];
        json_AP_DP.MPLS3 = AP_DP_Bit7[3];
        json_AP_DP.MPLS4 = AP_DP_Bit7[2];
        json_AP_DP.MVV1 = AP_DP_Bit7[1];
        json_AP_DP.MVV2 = AP_DP_Bit7[0];
        const AP_DP_Bit4 = binaryDigits(Value_AP_DP_Bit4.value.value, 4);
        json_AP_DP.SAV = AP_DP_Bit4[3];
        json_AP_DP.SIP = AP_DP_Bit4[2];
        json_AP_DP.SOP = AP_DP_Bit4[1];
        json_AP_DP.SVV = AP_DP_Bit4[0];
	json_AP_DP.AMS_MMBID = {}
        json_AP_DP.AMS_MMBID.bcr = Value_AMS_MMBCR_BCR.value.value;
        json_AP_DP.AMS_MMBID.req = Value_AMS_MMBCR_REQ.value.value;
        json_AP_DP.AMS_MMBID.code = Value_AMS_MMBCR_CODE.value.value;
        json_AP_DP.AMS_MMBID.rep = Value_AMS_MMBCR_REP.value.value;
        json_AP_DP.AMC_CMCBCR = {}
        json_AP_DP.AMC_CMCBCR.bcr = Value_AMC_CMCBCR_BCR.value.value;
        json_AP_DP.AMC_CMCBCR.req = Value_AMC_CMCBCR_REQ.value.value;
        json_AP_DP.AMC_CMCBCR.code = Value_AMC_CMCBCR_CODE.value.value;
        json_AP_DP.AMC_CMCBCR.rep = Value_AMC_CMCBCR_REP.value.value;
        json_AP_DP.AP_DP1BCR = {}
        json_AP_DP.AP_DP1BCR.bcr = Value_AP_DP1BCR_BCR.value.value;
        json_AP_DP.AP_DP1BCR.req = Value_AP_DP1BCR_REQ.value.value;
        json_AP_DP.AP_DP1BCR.code = Value_AP_DP1BCR_CODE.value.value;
        json_AP_DP.AP_DP1BCR.rep = Value_AP_DP1BCR_REP.value.value;
        json_AP_DP.AP_DP2BCR = {}
        json_AP_DP.AP_DP2BCR.bcr = Value_AP_DP2BCR_BCR.value.value;
        json_AP_DP.AP_DP2BCR.req = Value_AP_DP2BCR_REQ.value.value;
        json_AP_DP.AP_DP2BCR.code = Value_AP_DP2BCR_CODE.value.value;
        json_AP_DP.AP_DP2BCR.rep = Value_AP_DP2BCR_REP.value.value;
        json_AP_DP.AP_DPSBCR = {}
        json_AP_DP.AP_DPSBCR.bcr = Value_AP_DPSBCR_BCR.value.value;
        json_AP_DP.AP_DPSBCR.req = Value_AP_DPSBCR_REQ.value.value;
        json_AP_DP.AP_DPSBCR.code = Value_AP_DPSBCR_CODE.value.value;
        json_AP_DP.AP_DPSBCR.rep = Value_AP_DPSBCR_REP.value.value;

        let json_AP_MS1 = {}
        let topic_AP_MS1 = 'sfs.machine.powder.a.ms1';
        json_AP_MS1.PWV = {}
        json_AP_MS1.PWV.unit = 'kg';
        json_AP_MS1.PWV.min = -99.99;
        json_AP_MS1.PWV.max = 9999.99;
        json_AP_MS1.PWV.value = (Value_AP_MS1_PWV.value.value * 0.01).toFixed(2) * 1;
        json_AP_MS1.ORPM = {}
        json_AP_MS1.ORPM.unit = 'RPM';
        json_AP_MS1.ORPM.min = 0;
        json_AP_MS1.ORPM.max = 30;
        json_AP_MS1.ORPM.value = Value_AP_MS1_ORPM.value.value;
        const AP_MS1_Bit5 = binaryDigits(Value_AP_MS1_Bit5.value.value, 5);
        json_AP_MS1.APV = AP_MS1_Bit5[4];
        json_AP_MS1.VV = AP_MS1_Bit5[3];
        json_AP_MS1.OGV = AP_MS1_Bit5[2];
        json_AP_MS1.JCLOV = AP_MS1_Bit5[1];
        json_AP_MS1.JCLCV = AP_MS1_Bit5[0];

        let json_AP_MS2 = {}
        let topic_AP_MS2 = 'sfs.machine.powder.a.ms2';
        json_AP_MS2.PWV = {}
        json_AP_MS2.PWV.unit = 'kg';
        json_AP_MS2.PWV.min = -99.99;
        json_AP_MS2.PWV.max = 9999.99;
        json_AP_MS2.PWV.value = (Value_AP_MS2_PWV.value.value * 0.01).toFixed(2) * 1;
        json_AP_MS2.ORPM = {}
        json_AP_MS2.ORPM.unit = 'RPM';
        json_AP_MS2.ORPM.min = 0;
        json_AP_MS2.ORPM.max = 30;
        json_AP_MS2.ORPM.value = Value_AP_MS2_ORPM.value.value;
        const AP_MS2_Bit5 = binaryDigits(Value_AP_MS2_Bit5.value.value, 5);
        json_AP_MS2.APV = AP_MS2_Bit5[4];
        json_AP_MS2.VV = AP_MS2_Bit5[3];
        json_AP_MS2.OGV = AP_MS2_Bit5[2];
        json_AP_MS2.JCLOV = AP_MS2_Bit5[1];
        json_AP_MS2.JCLCV = AP_MS2_Bit5[0];

        let json_AP_SS = {}
        let topic_AP_SS = 'sfs.machine.powder.a.ss1';
        json_AP_SS.PWV = {}
        json_AP_SS.PWV.unit = 'kg';
        json_AP_SS.PWV.min = -99.99;
        json_AP_SS.PWV.max = 9999.99;
        json_AP_SS.PWV.value = (Value_AP_SS_PWV.value.value * 0.01).toFixed(2) * 1;
        json_AP_SS.ORPM = {}
        json_AP_SS.ORPM.unit = 'RPM';
        json_AP_SS.ORPM.min = 0;
        json_AP_SS.ORPM.max = 30;
        json_AP_SS.ORPM.value = Value_AP_SS_ORPM.value.value;
        const AP_SS_Bit5 = binaryDigits(Value_AP_SS_Bit5.value.value, 5);
        json_AP_SS.APV = AP_SS_Bit5[4];
        json_AP_SS.VV = AP_SS_Bit5[3];
        json_AP_SS.OGV = AP_SS_Bit5[2];
        json_AP_SS.JCLOV = AP_SS_Bit5[1];
        json_AP_SS.JCLCV = AP_SS_Bit5[0];

        let json_AP_MDis = {}
        let topic_AP_MDis = 'sfs.machine.powder.a.mdi1';
        json_AP_MDis.PWV = {}
        json_AP_MDis.PWV.unit = 'kg';
        json_AP_MDis.PWV.min = -99.99;
        json_AP_MDis.PWV.max = 9999.99;
        json_AP_MDis.PWV.value = (Value_AP_MDis_PWV.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.ORPM = {}
        json_AP_MDis.ORPM.unit = 'RPM';
        json_AP_MDis.ORPM.min = 0;
        json_AP_MDis.ORPM.max = 15;
        json_AP_MDis.ORPM.value = Value_AP_MDis_ORPM.value.value;
        json_AP_MDis.MWSV1 = {}
        json_AP_MDis.MWSV1.unit = 'kg';
        json_AP_MDis.MWSV1.min = 0.00;
        json_AP_MDis.MWSV1.max = 9999.99;
        json_AP_MDis.MWSV1.value = (Value_AP_MDis_MWSV1.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.MTWPV1 = {}
        json_AP_MDis.MTWPV1.unit = 'kg';
        json_AP_MDis.MTWPV1.min = -99.99;
        json_AP_MDis.MTWPV1.max = 9999.99;
        json_AP_MDis.MTWPV1.value = (Value_AP_MDis_MTWPV1.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.MWT1 = {}
        json_AP_MDis.MWT1.unit = 'sec';
        json_AP_MDis.MWT1.min = 0;
        json_AP_MDis.MWT1.max = 9999;
        json_AP_MDis.MWT1.value = Value_AP_MDis_MWT1.value.value;
        json_AP_MDis.MWSV2 = {}
        json_AP_MDis.MWSV2.unit = 'kg';
        json_AP_MDis.MWSV2.min = 0.00;
        json_AP_MDis.MWSV2.max = 9999.99;
        json_AP_MDis.MWSV2.value = (Value_AP_MDis_MWSV2.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.MTWPV2 = {}
        json_AP_MDis.MTWPV2.unit = 'kg';
        json_AP_MDis.MTWPV2.min = -99.99;
        json_AP_MDis.MTWPV2.max = 9999.99;
        json_AP_MDis.MTWPV2.value = (Value_AP_MDis_MTWPV2.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.MWT2 = {}
        json_AP_MDis.MWT2.unit = 'sec';
        json_AP_MDis.MWT2.min = 0;
        json_AP_MDis.MWT2.max = 9999;
        json_AP_MDis.MWT2.value = Value_AP_MDis_MWT2.value.value;
        json_AP_MDis.TWSV = {}
        json_AP_MDis.TWSV.unit = 'kg';
        json_AP_MDis.TWSV.min = 0.00;
        json_AP_MDis.TWSV.max = 9999.99;
        json_AP_MDis.TWSV.value = (Value_AP_MDis_TWSV.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.TWPV = {}
        json_AP_MDis.TWPV.unit = 'kg';
        json_AP_MDis.TWPV.min = -99.99;
        json_AP_MDis.TWPV.max = 9999.99;
        json_AP_MDis.TWPV.value = (Value_AP_MDis_TWPV.value.value * 0.01).toFixed(2) * 1;
        json_AP_MDis.TWT = {}
        json_AP_MDis.TWT.unit = 'sec';
        json_AP_MDis.TWT.min = 0;
        json_AP_MDis.TWT.max = 9999;
        json_AP_MDis.TWT.value = Value_AP_MDis_TWT.value.value;
        const AP_MDis_Bit3 = binaryDigits(Value_AP_MDis_Bit3.value.value, 3);
        json_AP_MDis.APV = AP_MDis_Bit3[2];
        json_AP_MDis.EH = AP_MDis_Bit3[1];
        json_AP_MDis.OGV = AP_MDis_Bit3[0];

        let json_AP_SDis = {}
        let topic_AP_SDis = 'sfs.machine.powder.a.sdi1';
        json_AP_SDis.PWV = {}
        json_AP_SDis.PWV.unit = 'kg';
        json_AP_SDis.PWV.min = -99.99;
        json_AP_SDis.PWV.max = 9999.99;
        json_AP_SDis.PWV.value = (Value_AP_SDis_PWV.value.value * 0.01).toFixed(2) * 1;
        json_AP_SDis.ORPM = {}
        json_AP_SDis.ORPM.unit = 'RPM';
        json_AP_SDis.ORPM.min = 0;
        json_AP_SDis.ORPM.max = 15;
        json_AP_SDis.ORPM.value = Value_AP_SDis_ORPM.value.value;
        json_AP_SDis.SHWSV = {}
        json_AP_SDis.SHWSV.unit = 'kg';
        json_AP_SDis.SHWSV.min = 0.00;
        json_AP_SDis.SHWSV.max = 9999.99;
        json_AP_SDis.SHWSV.value = (Value_AP_SDis_SHWSV.value.value * 0.01).toFixed(2) * 1;
        json_AP_SDis.SHWPV = {}
        json_AP_SDis.SHWPV.unit = 'kg';
        json_AP_SDis.SHWPV.min = -99.99;
        json_AP_SDis.SHWPV.max = 9999.99;
        json_AP_SDis.SHWPV.value = (Value_AP_SDis_SHWPV.value.value * 0.01).toFixed(2) * 1;
        json_AP_SDis.SHWT = {}
        json_AP_SDis.SHWT.unit = 'sec';
        json_AP_SDis.SHWT.min = 0;
        json_AP_SDis.SHWT.max = 9999;
        json_AP_SDis.SHWT.value = Value_AP_SDis_SHWT.value.value;
        json_AP_SDis.TWSV = {}
        json_AP_SDis.TWSV.unit = 'kg';
        json_AP_SDis.TWSV.min = 0.00;
        json_AP_SDis.TWSV.max = 9999.99;
        json_AP_SDis.TWSV.value = (Value_AP_SDis_TWSV.value.value * 0.01).toFixed(2) * 1;
        json_AP_SDis.TWPV = {}
        json_AP_SDis.TWPV.unit = 'kg';
        json_AP_SDis.TWPV.min = -99.99;
        json_AP_SDis.TWPV.max = 9999.99;
        json_AP_SDis.TWPV.value = (Value_AP_SDis_TWPV.value.value * 0.01).toFixed(2) * 1;
        json_AP_SDis.TWT = {}
        json_AP_SDis.TWT.unit = 'sec';
        json_AP_SDis.TWT.min = 0;
        json_AP_SDis.TWT.max = 9999;
        json_AP_SDis.TWT.value = Value_AP_SDis_TWT.value.value;
        const AP_SDis_Bit3 = binaryDigits(Value_AP_SDis_Bit3.value.value, 3);
        json_AP_SDis.APV = AP_SDis_Bit3[2];
        json_AP_SDis.EH = AP_SDis_Bit3[1];
        json_AP_SDis.OGV = AP_SDis_Bit3[0];
        
        let json_AP_VC = {}
        let topic_AP_VC = 'sfs.machine.powder.a.vc1';
        const AP_AC_Bit5 = binaryDigits(Value_AP_VC_Bit5.value.value, 6);
        json_AP_VC.JCH = AP_AC_Bit5[5];
        json_AP_VC.DC = AP_AC_Bit5[4];
        json_AP_VC.VP = AP_AC_Bit5[3];
        json_AP_VC.VPBV = AP_AC_Bit5[2];
        json_AP_VC.VPCV = AP_AC_Bit5[1];
        json_AP_VC.VPEV = AP_AC_Bit5[0];

        await sendKafkaMessage(topic_ADW_DIWater, json_ADW_DIWater);
        await sendKafkaMessage(topic_AMC_CMixer, json_AMC_CMixer);
        await sendKafkaMessage(topic_AMC_CMCST, json_AMC_CMCST);
        await sendKafkaMessage(topic_AMC_CNTST, json_AMC_CNTST);
        await sendKafkaMessage(topic_AMS_MMixer, json_AMS_MMixer);
        await sendKafkaMessage(topic_AMS_Slurry1, json_AMS_Slurry1);
        await sendKafkaMessage(topic_AMS_Slurry2, json_AMS_Slurry2);
        await sendKafkaMessage(topic_AP_DP, json_AP_DP);
        await sendKafkaMessage(topic_AP_MS1, json_AP_MS1);
        await sendKafkaMessage(topic_AP_MS2, json_AP_MS2);
        await sendKafkaMessage(topic_AP_SS, json_AP_SS);
        await sendKafkaMessage(topic_AP_MDis, json_AP_MDis);
        await sendKafkaMessage(topic_AP_SDis, json_AP_SDis);
        await sendKafkaMessage(topic_AP_VC, json_AP_VC);
        
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

        let redis_value = await redis_client.get('anode_main');

        await collectAndSendData(session, redis_value);

        const run = async () => {
            while (true) {
		redis_value = await redis_client.get('anode_main');
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
        topic: topic, // 전송할 토픽
        messages: [
            { value: JSON.stringify(messages) } // 전송할 메시지
        ],
    });
}

main();
