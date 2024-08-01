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
const nodeId_CNMRead_NMP_EqStatus = "ns=6;s=::CNMRead:NMP.EqStatus";
const nodeId_CNMRead_NMP_EqCM = "ns=6;s=::CNMRead:NMP.EqCM";
const nodeId_CNMRead_NMP_ETC = "ns=6;s=::CNMRead:NMP.ETC";
const nodeId_CNMRead_NMP_LvPV = "ns=6;s=::CNMRead:NMP.LvPV";
const nodeId_CNMRead_NMP_TopPPV = "ns=6;s=::CNMRead:NMP.TopPPV";
const nodeId_CNMRead_NMP_T1PPV = "ns=6;s=::CNMRead:NMP.T1PPV";
const nodeId_CNMRead_NMP_T2PPV = "ns=6;s=::CNMRead:NMP.T2PPV";
const nodeId_CNMRead_NMP_LotNo = "ns=6;s=::CNMRead:NMP.LotNo";
const nodeId_CNMRead_NMP_Bit12 = "ns=6;s=::CNMRead:NMP.Bit12";

const nodeId_CBCRead_BMixer_EqStatus = "ns=6;s=::CBCRead:BMixer.EqStatus";
const nodeId_CBCRead_BMixer_EqCM = "ns=6;s=::CBCRead:BMixer.EqCM";
const nodeId_CBCRead_BMixer_PCStatus = "ns=6;s=::CBCRead:BMixer.PCStatus";
const nodeId_CBCRead_BMixer_BatchID = "ns=6;s=::CBCRead:BMixer.BatchID";
const nodeId_CBCRead_BMixer_ARPMPV = "ns=6;s=::CBCRead:BMixer.ARPMPV";
const nodeId_CBCRead_BMixer_ACPV = "ns=6;s=::CBCRead:BMixer.ACPV";
const nodeId_CBCRead_BMixer_DRPMPV = "ns=6;s=::CBCRead:BMixer.DRPMPV";
const nodeId_CBCRead_BMixer_DCPV = "ns=6;s=::CBCRead:BMixer.DCPV";
const nodeId_CBCRead_BMixer_PASNo = "ns=6;s=::CBCRead:BMixer.PASNo";
const nodeId_CBCRead_BMixer_MTimeSV = "ns=6;s=::CBCRead:BMixer.MTimeSV";
const nodeId_CBCRead_BMixer_MOTPV = "ns=6;s=::CBCRead:BMixer.MOTPV";
const nodeId_CBCRead_BMixer_LvPV = "ns=6;s=::CBCRead:BMixer.LvPV";
const nodeId_CBCRead_BMixer_MTSV = "ns=6;s=::CBCRead:BMixer.MTSV";
const nodeId_CBCRead_BMixer_TPV = "ns=6;s=::CBCRead:BMixer.TPV";
const nodeId_CBCRead_BMixer_MPSV = "ns=6;s=::CBCRead:BMixer.MPSV";
const nodeId_CBCRead_BMixer_TopPPV = "ns=6;s=::CBCRead:BMixer.TopPPV";
const nodeId_CBCRead_BMixer_TWBWSV = "ns=6;s=::CBCRead:BMixer.TWBWSV";
const nodeId_CBCRead_BMixer_TWBWPV = "ns=6;s=::CBCRead:BMixer.TWBWPV";
const nodeId_CBCRead_BMixer_TIWSV = "ns=6;s=::CBCRead:BMixer.TIWSV";
const nodeId_CBCRead_BMixer_WIWPV = "ns=6;s=::CBCRead:BMixer.WIWPV";
const nodeId_CBCRead_BMixer_Bit18 = "ns=6;s=::CBCRead:BMixer.Bit18";

const nodeId_CBCRead_BST_EqStatus = "ns=6;s=::CBCRead:BST.EqStatus";
const nodeId_CBCRead_BST_EqCM = "ns=6;s=::CBCRead:BST.EqCM";
const nodeId_CBCRead_BST_BatchID = "ns=6;s=::CBCRead:BST.BatchID";
const nodeId_CBCRead_BST_ARPMPV = "ns=6;s=::CBCRead:BST.ARPMPV";
const nodeId_CBCRead_BST_ACPV = "ns=6;s=::CBCRead:BST.ACPV";
const nodeId_CBCRead_BST_RPRPM = "ns=6;s=::CBCRead:BST.RPRPM";
const nodeId_CBCRead_BST_LvPV = "ns=6;s=::CBCRead:BST.LvPV";
const nodeId_CBCRead_BST_TopPPV = "ns=6;s=::CBCRead:BST.TopPPV";
const nodeId_CBCRead_BST_TPV = "ns=6;s=::CBCRead:BST.TPV";
const nodeId_CBCRead_BST_Bit4 = "ns=6;s=::CBCRead:BST.Bit4";

const nodeId_CBCRead_CNTST_EqStatus = "ns=6;s=::CBCRead:CNTST.EqStatus";
const nodeId_CBCRead_CNTST_EqCM = "ns=6;s=::CBCRead:CNTST.EqCM";
const nodeId_CBCRead_CNTST_BatchID = "ns=6;s=::CBCRead:CNTST.BatchID";
const nodeId_CBCRead_CNTST_ARPMPV = "ns=6;s=::CBCRead:CNTST.ARPMPV";
const nodeId_CBCRead_CNTST_ACPV = "ns=6;s=::CBCRead:CNTST.ACPV";
const nodeId_CBCRead_CNTST_LvPV = "ns=6;s=::CBCRead:CNTST.LvPV";
const nodeId_CBCRead_CNTST_TopPPV = "ns=6;s=::CBCRead:CNTST.TopPPV";
const nodeId_CBCRead_CNTST_Bit7 = "ns=6;s=::CBCRead:CNTST.Bit7";

const nodeId_CMSRead_MMixer_EqStatus = "ns=6;s=::CMSRead:MMixer.EqStatus";
const nodeId_CMSRead_MMixer_EqCM = "ns=6;s=::CMSRead:MMixer.EqCM";
const nodeId_CMSRead_MMixer_PCStatus = "ns=6;s=::CMSRead:MMixer.PCStatus";
const nodeId_CMSRead_MMixer_BatchID = "ns=6;s=::CMSRead:MMixer.BatchID";
const nodeId_CMSRead_MMixer_PRPMPV = "ns=6;s=::CMSRead:MMixer.PRPMPV";
const nodeId_CMSRead_MMixer_PCPV = "ns=6;s=::CMSRead:MMixer.PCPV";
const nodeId_CMSRead_MMixer_DRPMPV = "ns=6;s=::CMSRead:MMixer.DRPMPV";
const nodeId_CMSRead_MMixer_DCPV = "ns=6;s=::CMSRead:MMixer.DCPV";
const nodeId_CMSRead_MMixer_PASNo = "ns=6;s=::CMSRead:MMixer.PASNo";
const nodeId_CMSRead_MMixer_MTimeSV = "ns=6;s=::CMSRead:MMixer.MTimeSV";
const nodeId_CMSRead_MMixer_MOTPV = "ns=6;s=::CMSRead:MMixer.MOTPV";
const nodeId_CMSRead_MMixer_MTSV = "ns=6;s=::CMSRead:MMixer.MTSV";
const nodeId_CMSRead_MMixer_VTPV = "ns=6;s=::CMSRead:MMixer.VTPV";
const nodeId_CMSRead_MMixer_MPSV = "ns=6;s=::CMSRead:MMixer.MPSV";
const nodeId_CMSRead_MMixer_TopPPV = "ns=6;s=::CMSRead:MMixer.TopPPV";
const nodeId_CMSRead_MMixer_VOPPPV = "ns=6;s=::CMSRead:MMixer.VOPPPV";
const nodeId_CMSRead_MMixer_VOPTPV = "ns=6;s=::CMSRead:MMixer.VOPTPV";
const nodeId_CMSRead_MMixer_TWCSV = "ns=6;s=::CMSRead:MMixer.TWCSV";
const nodeId_CMSRead_MMixer_TWCPV = "ns=6;s=::CMSRead:MMixer.TWCPV";
const nodeId_CMSRead_MMixer_TWMSV = "ns=6;s=::CMSRead:MMixer.TWMSV";
const nodeId_CMSRead_MMixer_TWMPV = "ns=6;s=::CMSRead:MMixer.TWMPV";
const nodeId_CMSRead_MMixer_TWSSV = "ns=6;s=::CMSRead:MMixer.TWSSV";
const nodeId_CMSRead_MMixer_TWSPV = "ns=6;s=::CMSRead:MMixer.TWSPV";
const nodeId_CMSRead_MMixer_IWSV = "ns=6;s=::CMSRead:MMixer.IWSV";
const nodeId_CMSRead_MMixer_IWPV = "ns=6;s=::CMSRead:MMixer.IWPV";
const nodeId_CMSRead_MMixer_CIWSV = "ns=6;s=::CMSRead:MMixer.CIWSV";
const nodeId_CMSRead_MMixer_CIWPV = "ns=6;s=::CMSRead:MMixer.CIWPV";
const nodeId_CMSRead_MMixer_TIWSV = "ns=6;s=::CMSRead:MMixer.TIWSV";
const nodeId_CMSRead_MMixer_TIWPV = "ns=6;s=::CMSRead:MMixer.TIWPV";
const nodeId_CMSRead_MMixer_SBRSV = "ns=6;s=::CMSRead:MMixer.SBRSV";
const nodeId_CMSRead_MMixer_SBRPV = "ns=6;s=::CMSRead:MMixer.SBRPV";
const nodeId_CMSRead_MMixer_TOLPPV = "ns=6;s=::CMSRead:MMixer.TOLPPV";
const nodeId_CMSRead_MMixer_Bit32 = "ns=6;s=::CMSRead:MMixer.Bit32";

const nodeId_CMSRead_Slurry1_EqStatus = "ns=6;s=::CMSRead:Slurry1.EqStatus";
const nodeId_CMSRead_Slurry1_EqCM = "ns=6;s=::CMSRead:Slurry1.EqCM";
const nodeId_CMSRead_Slurry1_BatchID = "ns=6;s=::CMSRead:Slurry1.BatchID";
const nodeId_CMSRead_Slurry1_ARPMPV = "ns=6;s=::CMSRead:Slurry1.ARPMPV";
const nodeId_CMSRead_Slurry1_ACPV = "ns=6;s=::CMSRead:Slurry1.ACPV";
const nodeId_CMSRead_Slurry1_PASNo = "ns=6;s=::CMSRead:Slurry1.PASNo";
const nodeId_CMSRead_Slurry1_MTimeSV = "ns=6;s=::CMSRead:Slurry1.MTimeSV";
const nodeId_CMSRead_Slurry1_OT = "ns=6;s=::CMSRead:Slurry1.OT";
const nodeId_CMSRead_Slurry1_LvPV = "ns=6;s=::CMSRead:Slurry1.LvPV";
const nodeId_CMSRead_Slurry1_TopPPV = "ns=6;s=::CMSRead:Slurry1.TopPPV";
const nodeId_CMSRead_Slurry1_Bit6 = "ns=6;s=::CMSRead:Slurry1.Bit6";

const nodeId_CMSRead_Slurry2_EqStatus = "ns=6;s=::CMSRead:Slurry2.EqStatus";
const nodeId_CMSRead_Slurry2_EqCM = "ns=6;s=::CMSRead:Slurry2.EqCM";
const nodeId_CMSRead_Slurry2_BatchID = "ns=6;s=::CMSRead:Slurry2.BatchID";
const nodeId_CMSRead_Slurry2_ARPMPV = "ns=6;s=::CMSRead:Slurry2.ARPMPV";
const nodeId_CMSRead_Slurry2_ACPV = "ns=6;s=::CMSRead:Slurry2.ACPV";
const nodeId_CMSRead_Slurry2_PASNo = "ns=6;s=::CMSRead:Slurry2.PASNo";
const nodeId_CMSRead_Slurry2_MTimeSV = "ns=6;s=::CMSRead:Slurry2.MTimeSV";
const nodeId_CMSRead_Slurry2_OT = "ns=6;s=::CMSRead:Slurry2.OT";
const nodeId_CMSRead_Slurry2_LvPV = "ns=6;s=::CMSRead:Slurry2.LvPV";
const nodeId_CMSRead_Slurry2_TopPPV = "ns=6;s=::CMSRead:Slurry2.TopPPV";
const nodeId_CMSRead_Slurry2_Bit6 = "ns=6;s=::CMSRead:Slurry2.Bit6";

const nodeId_CPRead_DP_Bit7 = "ns=6;s=::CPRead1:DP.Bit7";
const nodeId_CPRead_DP_Bit4 = "ns=6;s=::CPRead1:DP.Bit4";

const nodeId_CPRead_MS1_PWV = "ns=6;s=::CPRead1:MS1.PWV";
const nodeId_CPRead_MS1_ORPM = "ns=6;s=::CPRead1:MS1.ORPM";
const nodeId_CPRead_MS1_Bit5 = "ns=6;s=::CPRead1:MS1.Bit5";

const nodeId_CPRead_MS2_PWV = "ns=6;s=::CPRead1:MS2.PWV";
const nodeId_CPRead_MS2_ORPM = "ns=6;s=::CPRead1:MS2.ORPM";
const nodeId_CPRead_MS2_Bit5 = "ns=6;s=::CPRead1:MS2.Bit5";

const nodeId_CPRead_LS_PWV = "ns=6;s=::CPRead1:LS.PWV";
const nodeId_CPRead_LS_ORPM = "ns=6;s=::CPRead1:LS.ORPM";
const nodeId_CPRead_LS_Bit5 = "ns=6;s=::CPRead1:LS.Bit5";

const nodeId_CPRead_MDis_PWV = "ns=6;s=::CPRead2:MDis.PWV";
const nodeId_CPRead_MDis_ORPM = "ns=6;s=::CPRead2:MDis.ORPM";
const nodeId_CPRead_MDis_MWSV1 = "ns=6;s=::CPRead2:MDis.MWSV1";
const nodeId_CPRead_MDis_MTWPV1 = "ns=6;s=::CPRead2:MDis.MTWPV1";
const nodeId_CPRead_MDis_MWT1 = "ns=6;s=::CPRead2:MDis.MWT1";
const nodeId_CPRead_MDis_MWSV2 = "ns=6;s=::CPRead2:MDis.MWSV2";
const nodeId_CPRead_MDis_MTWPV2 = "ns=6;s=::CPRead2:MDis.MTWPV2";
const nodeId_CPRead_MDis_MWT2 = "ns=6;s=::CPRead2:MDis.MWT2";
const nodeId_CPRead_MDis_TWSV = "ns=6;s=::CPRead2:MDis.TWSV";
const nodeId_CPRead_MDis_TWPV = "ns=6;s=::CPRead2:MDis.TWPV";
const nodeId_CPRead_MDis_TWT = "ns=6;s=::CPRead2:MDis.TWT";
const nodeId_CPRead_MDis_Bit3 = "ns=6;s=::CPRead2:MDis.Bit3";

const nodeId_CPRead_LDis_PWV = "ns=6;s=::CPRead2:LDis.PWV";
const nodeId_CPRead_LDis_ORPM = "ns=6;s=::CPRead2:LDis.ORPM";
const nodeId_CPRead_LDis_SHWSV = "ns=6;s=::CPRead2:LDis.SHWSV";
const nodeId_CPRead_LDis_SHWPV = "ns=6;s=::CPRead2:LDis.SHWPV";
const nodeId_CPRead_LDis_SHWT = "ns=6;s=::CPRead2:LDis.SHWT";
const nodeId_CPRead_LDis_TWSV = "ns=6;s=::CPRead2:LDis.TWSV";
const nodeId_CPRead_LDis_TWPV = "ns=6;s=::CPRead2:LDis.TWPV";
const nodeId_CPRead_LDis_TWT = "ns=6;s=::CPRead2:LDis.TWT";
const nodeId_CPRead_LDis_Bit3 = "ns=6;s=::CPRead2:LDis.Bit3";

const nodeId_CPRead_VC_Bit5 = "ns=6;s=::CPRead2:VC.Bit5";

const nodeId_CPRead_active = "ns=6;s=::CPRead:ReadBlock_0.Active";

const nodeId_CMSRead_MMBCR_BCR = "ns=6;s=::CMSRead:MMBCR.BCR";
const nodeId_CMSRead_MMBCR_CODE = "ns=6;s=::CMSRead:MMBCR.CODE";
const nodeId_CMSRead_MMBCR_REQ = "ns=6;s=::CMSRead:MMBCR.REQ";
const nodeId_CMSRead_MMBCR_REP = "ns=6;s=::CMSRead:MMBCR.REP";

const nodeId_CBCRead_BINBCR_BCR = "ns=6;s=::CBCRead:BINBCR.BCR";
const nodeId_CBCRead_BINBCR_CODE = "ns=6;s=::CBCRead:BINBCR.CODE";
const nodeId_CBCRead_BINBCR_REQ = "ns=6;s=::CBCRead:BINBCR.REQ";
const nodeId_CBCRead_BINBCR_REP = "ns=6;s=::CBCRead:BINBCR.REP";

const nodeId_CPRead_DP1BCR_BCR = "ns=6;s=::CPRead:DP1BCR.BCR";
const nodeId_CPRead_DP1BCR_CODE = "ns=6;s=::CPRead:DP1BCR.CODE";
const nodeId_CPRead_DP1BCR_REQ = "ns=6;s=::CPRead:DP1BCR.REQ";
const nodeId_CPRead_DP1BCR_REP = "ns=6;s=::CPRead:DP1BCR.REP";

const nodeId_CPRead_DP2BCR_BCR = "ns=6;s=::CPRead:DP2BCR.BCR";
const nodeId_CPRead_DP2BCR_CODE = "ns=6;s=::CPRead:DP2BCR.CODE";
const nodeId_CPRead_DP2BCR_REQ = "ns=6;s=::CPRead:DP2BCR.REQ";
const nodeId_CPRead_DP2BCR_REP = "ns=6;s=::CPRead:DP2BCR.REP";

const nodeId_CPRead_DPLBCR_BCR = "ns=6;s=::CPRead:DPLBCR.BCR";
const nodeId_CPRead_DPLBCR_CODE = "ns=6;s=::CPRead:DPLBCR.CODE";
const nodeId_CPRead_DPLBCR_REQ = "ns=6;s=::CPRead:DPLBCR.REQ";
const nodeId_CPRead_DPLBCR_REP = "ns=6;s=::CPRead:DPLBCR.REP";

const nodeId_CPRead_MDCOM_CODE = "ns=6;s=::CPRead:MDCOM.CODE";
const nodeId_CPRead_MDCOM_REQ = "ns=6;s=::CPRead:MDCOM.REPORT";
const nodeId_CPRead_MDCOM_REP = "ns=6;s=::CPRead:MDCOM.REP";

const nodeId_CPRead_LDCOM_CODE = "ns=6;s=::CPRead:LDCOM.CODE";
const nodeId_CPRead_LDCOM_REQ = "ns=6;s=::CPRead:LDCOM.REPORT";
const nodeId_CPRead_LDCOM_REP = "ns=6;s=::CPRead:LDCOM.REP";

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
        const Value_CNMP_NMP_EqStatus = await session.read({ nodeId: nodeId_CNMRead_NMP_EqStatus, attributeId: AttributeIds.Value });
        const Value_CNMP_NMP_EqCM = await session.read({ nodeId: nodeId_CNMRead_NMP_EqCM, attributeId: AttributeIds.Value });
        //const Value_CNMP_NMP_ETC = await session.read({ nodeId: nodeId_CNMRead_NMP_ETC, attributeId: AttributeIds.Value });
        const Value_CNMP_NMP_LvPV = await session.read({ nodeId: nodeId_CNMRead_NMP_LvPV, attributeId: AttributeIds.Value });
        const Value_CNMP_NMP_TopPPV = await session.read({ nodeId: nodeId_CNMRead_NMP_TopPPV, attributeId: AttributeIds.Value });
        const Value_CNMP_NMP_T1PPV = await session.read({ nodeId: nodeId_CNMRead_NMP_T1PPV, attributeId: AttributeIds.Value });
        const Value_CNMP_NMP_T2PPV = await session.read({ nodeId: nodeId_CNMRead_NMP_T2PPV, attributeId: AttributeIds.Value });
        //const Value_CNMP_NMP_LotNo = await session.read({ nodeId: nodeId_CNMRead_NMP_LotNo, attributeId: AttributeIds.Value });
        const Value_CNMP_NMP_Bit12 = await session.read({ nodeId: nodeId_CNMRead_NMP_Bit12, attributeId: AttributeIds.Value });

        const Value_CBC_BMixer_EqStatus = await session.read({ nodeId: nodeId_CBCRead_BMixer_EqStatus, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_EqCM = await session.read({ nodeId: nodeId_CBCRead_BMixer_EqCM, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_PCStatus = await session.read({ nodeId: nodeId_CBCRead_BMixer_PCStatus, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_BatchID = await session.read({ nodeId: nodeId_CBCRead_BMixer_BatchID, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_ARPMPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_ARPMPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_ACPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_ACPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_DRPMPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_DRPMPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_DCPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_DCPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_PASNo = await session.read({ nodeId: nodeId_CBCRead_BMixer_PASNo, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_MTimeSV = await session.read({ nodeId: nodeId_CBCRead_BMixer_MTimeSV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_MOTPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_MOTPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_LvPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_LvPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_MTSV = await session.read({ nodeId: nodeId_CBCRead_BMixer_MTSV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_TPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_TPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_MPSV = await session.read({ nodeId: nodeId_CBCRead_BMixer_MPSV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_TopPPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_TopPPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_TWBWSV = await session.read({ nodeId: nodeId_CBCRead_BMixer_TWBWSV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_TWBWPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_TWBWPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_TIWSV = await session.read({ nodeId: nodeId_CBCRead_BMixer_TIWSV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_WIWPV = await session.read({ nodeId: nodeId_CBCRead_BMixer_WIWPV, attributeId: AttributeIds.Value });
        const Value_CBC_BMixer_Bit18 = await session.read({ nodeId: nodeId_CBCRead_BMixer_Bit18, attributeId: AttributeIds.Value });

        const Value_CBC_BST_EqStatus = await session.read({ nodeId: nodeId_CBCRead_BST_EqStatus, attributeId: AttributeIds.Value });
        const Value_CBC_BST_EqCM = await session.read({ nodeId: nodeId_CBCRead_BST_EqCM, attributeId: AttributeIds.Value });
        const Value_CBC_BST_BatchID = await session.read({ nodeId: nodeId_CBCRead_BST_BatchID, attributeId: AttributeIds.Value });
        const Value_CBC_BST_ARPMPV = await session.read({ nodeId: nodeId_CBCRead_BST_ARPMPV, attributeId: AttributeIds.Value });
        const Value_CBC_BST_ACPV = await session.read({ nodeId: nodeId_CBCRead_BST_ACPV, attributeId: AttributeIds.Value });
        const Value_CBC_BST_RPRPM = await session.read({ nodeId: nodeId_CBCRead_BST_RPRPM, attributeId: AttributeIds.Value });
        const Value_CBC_BST_LvPV = await session.read({ nodeId: nodeId_CBCRead_BST_LvPV, attributeId: AttributeIds.Value });
        const Value_CBC_BST_TopPPV = await session.read({ nodeId: nodeId_CBCRead_BST_TopPPV, attributeId: AttributeIds.Value });
        const Value_CBC_BST_TPV = await session.read({ nodeId: nodeId_CBCRead_BST_TPV, attributeId: AttributeIds.Value });
        const Value_CBC_BST_Bit4 = await session.read({ nodeId: nodeId_CBCRead_BST_Bit4, attributeId: AttributeIds.Value });

        const Value_CBC_CNTST_EqStatus = await session.read({ nodeId: nodeId_CBCRead_CNTST_EqStatus, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_EqCM = await session.read({ nodeId: nodeId_CBCRead_CNTST_EqCM, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_BatchID = await session.read({ nodeId: nodeId_CBCRead_CNTST_BatchID, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_ARPMPV = await session.read({ nodeId: nodeId_CBCRead_CNTST_ARPMPV, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_ACPV = await session.read({ nodeId: nodeId_CBCRead_CNTST_ACPV, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_LvPV = await session.read({ nodeId: nodeId_CBCRead_CNTST_LvPV, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_TopPPV = await session.read({ nodeId: nodeId_CBCRead_CNTST_TopPPV, attributeId: AttributeIds.Value });
        const Value_CBC_CNTST_Bit7 = await session.read({ nodeId: nodeId_CBCRead_CNTST_Bit7, attributeId: AttributeIds.Value });

        const Value_CMS_NMixer_EqStatus = await session.read({ nodeId: nodeId_CMSRead_MMixer_EqStatus, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_EqCM = await session.read({ nodeId: nodeId_CMSRead_MMixer_EqCM, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_PCStatus = await session.read({ nodeId: nodeId_CMSRead_MMixer_PCStatus, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_BatchID = await session.read({ nodeId: nodeId_CMSRead_MMixer_BatchID, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_PRPMPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_PRPMPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_PCPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_PCPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_DRPMPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_DRPMPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_DCPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_DCPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_PASNo = await session.read({ nodeId: nodeId_CMSRead_MMixer_PASNo, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_MTimeSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_MTimeSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_MOTPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_MOTPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_MTSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_MTSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_VTPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_VTPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_MPSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_MPSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TopPPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TopPPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_VOPPPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_VOPPPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_VOPTPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_VOPTPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TWCSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TWCSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TWCPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TWCPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TWMSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TWMSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TWMPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TWMPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TWSSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TWSSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TWSPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TWSPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_IWSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_IWSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_IWPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_IWPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_CIWSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_CIWSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_CIWPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_CIWPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TIWSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TIWSV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TIWPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TIWPV, attributeId: AttributeIds.Value });
        // const Value_CMS_NMixer_SBRSV = await session.read({ nodeId: nodeId_CMSRead_MMixer_SBRSV, attributeId: AttributeIds.Value });
        // const Value_CMS_NMixer_SBRPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_SBRPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_TOLPPV = await session.read({ nodeId: nodeId_CMSRead_MMixer_TOLPPV, attributeId: AttributeIds.Value });
        const Value_CMS_NMixer_Bit32 = await session.read({ nodeId: nodeId_CMSRead_MMixer_Bit32, attributeId: AttributeIds.Value });

        const Value_CMS_Slurry1_EqStatus = await session.read({ nodeId: nodeId_CMSRead_Slurry1_EqStatus, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_EqCM = await session.read({ nodeId: nodeId_CMSRead_Slurry1_EqCM, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_BatchID = await session.read({ nodeId: nodeId_CMSRead_Slurry1_BatchID, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_ARPMPV = await session.read({ nodeId: nodeId_CMSRead_Slurry1_ARPMPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_ACPV = await session.read({ nodeId: nodeId_CMSRead_Slurry1_ACPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_PASNo = await session.read({ nodeId: nodeId_CMSRead_Slurry1_PASNo, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_MTimeSV = await session.read({ nodeId: nodeId_CMSRead_Slurry1_MTimeSV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_OT = await session.read({ nodeId: nodeId_CMSRead_Slurry1_OT, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_LvPV = await session.read({ nodeId: nodeId_CMSRead_Slurry1_LvPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_TopPPV = await session.read({ nodeId: nodeId_CMSRead_Slurry1_TopPPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry1_Bit6 = await session.read({ nodeId: nodeId_CMSRead_Slurry1_Bit6, attributeId: AttributeIds.Value });

        const Value_CMS_Slurry2_EqStatus = await session.read({ nodeId: nodeId_CMSRead_Slurry2_EqStatus, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_EqCM = await session.read({ nodeId: nodeId_CMSRead_Slurry2_EqCM, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_BatchID = await session.read({ nodeId: nodeId_CMSRead_Slurry2_BatchID, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_ARPMPV = await session.read({ nodeId: nodeId_CMSRead_Slurry2_ARPMPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_ACPV = await session.read({ nodeId: nodeId_CMSRead_Slurry2_ACPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_PASNo = await session.read({ nodeId: nodeId_CMSRead_Slurry2_PASNo, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_MTimeSV = await session.read({ nodeId: nodeId_CMSRead_Slurry2_MTimeSV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_OT = await session.read({ nodeId: nodeId_CMSRead_Slurry2_OT, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_LvPV = await session.read({ nodeId: nodeId_CMSRead_Slurry2_LvPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_TopPPV = await session.read({ nodeId: nodeId_CMSRead_Slurry2_TopPPV, attributeId: AttributeIds.Value });
        const Value_CMS_Slurry2_Bit6 = await session.read({ nodeId: nodeId_CMSRead_Slurry2_Bit6, attributeId: AttributeIds.Value });

        const Value_CP_DP_Bit7 = await session.read({ nodeId: nodeId_CPRead_DP_Bit7, attributeId: AttributeIds.Value });
        const Value_CP_DP_Bit4 = await session.read({ nodeId: nodeId_CPRead_DP_Bit4, attributeId: AttributeIds.Value });

        const Value_CP_MS1_PWV = await session.read({ nodeId: nodeId_CPRead_MS1_PWV, attributeId: AttributeIds.Value });
        const Value_CP_MS1_ORPM = await session.read({ nodeId: nodeId_CPRead_MS1_ORPM, attributeId: AttributeIds.Value });
        const Value_CP_MS1_Bit5 = await session.read({ nodeId: nodeId_CPRead_MS1_Bit5, attributeId: AttributeIds.Value });

        const Value_CP_MS2_PWV = await session.read({ nodeId: nodeId_CPRead_MS2_PWV, attributeId: AttributeIds.Value });
        const Value_CP_MS2_ORPM = await session.read({ nodeId: nodeId_CPRead_MS2_ORPM, attributeId: AttributeIds.Value });
        const Value_CP_MS2_Bit5 = await session.read({ nodeId: nodeId_CPRead_MS2_Bit5, attributeId: AttributeIds.Value });
        
        const Value_CP_LS_PWV = await session.read({ nodeId: nodeId_CPRead_LS_PWV, attributeId: AttributeIds.Value });
        const Value_CP_LS_ORPM = await session.read({ nodeId: nodeId_CPRead_LS_ORPM, attributeId: AttributeIds.Value });
        const Value_CP_LS_Bit5 = await session.read({ nodeId: nodeId_CPRead_LS_Bit5, attributeId: AttributeIds.Value });

        const Value_CP_MDis_PWV = await session.read({ nodeId: nodeId_CPRead_MDis_PWV, attributeId: AttributeIds.Value });
        const Value_CP_MDis_ORPM = await session.read({ nodeId: nodeId_CPRead_MDis_ORPM, attributeId: AttributeIds.Value });
        const Value_CP_MDis_MWSV1 = await session.read({ nodeId: nodeId_CPRead_MDis_MWSV1, attributeId: AttributeIds.Value });
        const Value_CP_MDis_MTWPV1 = await session.read({ nodeId: nodeId_CPRead_MDis_MTWPV1, attributeId: AttributeIds.Value });
        const Value_CP_MDis_MWT1 = await session.read({ nodeId: nodeId_CPRead_MDis_MWT1, attributeId: AttributeIds.Value });
        const Value_CP_MDis_MWSV2 = await session.read({ nodeId: nodeId_CPRead_MDis_MWSV2, attributeId: AttributeIds.Value });
        const Value_CP_MDis_MTWPV2 = await session.read({ nodeId: nodeId_CPRead_MDis_MTWPV2, attributeId: AttributeIds.Value });
        const Value_CP_MDis_MWT2 = await session.read({ nodeId: nodeId_CPRead_MDis_MWT2, attributeId: AttributeIds.Value });
        const Value_CP_MDis_TWSV = await session.read({ nodeId: nodeId_CPRead_MDis_TWSV, attributeId: AttributeIds.Value });
        const Value_CP_MDis_TWPV = await session.read({ nodeId: nodeId_CPRead_MDis_TWPV, attributeId: AttributeIds.Value });
        const Value_CP_MDis_TWT = await session.read({ nodeId: nodeId_CPRead_MDis_TWT, attributeId: AttributeIds.Value });
        const Value_CP_MDis_Bit3 = await session.read({ nodeId: nodeId_CPRead_MDis_Bit3, attributeId: AttributeIds.Value });

        const Value_CP_LDis_PWV = await session.read({ nodeId: nodeId_CPRead_LDis_PWV, attributeId: AttributeIds.Value });
        const Value_CP_LDis_ORPM = await session.read({ nodeId: nodeId_CPRead_LDis_ORPM, attributeId: AttributeIds.Value });
        const Value_CP_LDis_SHWSV = await session.read({ nodeId: nodeId_CPRead_LDis_SHWSV, attributeId: AttributeIds.Value });
        const Value_CP_LDis_SHWPV = await session.read({ nodeId: nodeId_CPRead_LDis_SHWPV, attributeId: AttributeIds.Value });
        const Value_CP_LDis_SHWT = await session.read({ nodeId: nodeId_CPRead_LDis_SHWT, attributeId: AttributeIds.Value });
        const Value_CP_LDis_TWSV = await session.read({ nodeId: nodeId_CPRead_LDis_TWSV, attributeId: AttributeIds.Value });
        const Value_CP_LDis_TWPV = await session.read({ nodeId: nodeId_CPRead_LDis_TWPV, attributeId: AttributeIds.Value });
        const Value_CP_LDis_TWT = await session.read({ nodeId: nodeId_CPRead_LDis_TWT, attributeId: AttributeIds.Value });
        const Value_CP_LDis_Bit3 = await session.read({ nodeId: nodeId_CPRead_LDis_Bit3, attributeId: AttributeIds.Value });

        const Value_CP_VC_Bit5 = await session.read({ nodeId: nodeId_CPRead_VC_Bit5, attributeId: AttributeIds.Value });
        
	const Value_CP_active = await session.read({ nodeId: nodeId_CPRead_active, attributeId: AttributeIds.Value });

	const Value_CMS_MMBCR_BCR = await session.read({ nodeId: nodeId_CMSRead_MMBCR_BCR, attributeId: AttributeIds.Value });
	const Value_CMS_MMBCR_REQ = await session.read({ nodeId: nodeId_CMSRead_MMBCR_REQ, attributeId: AttributeIds.Value });
	const Value_CMS_MMBCR_CODE = await session.read({ nodeId: nodeId_CMSRead_MMBCR_CODE, attributeId: AttributeIds.Value });
	const Value_CMS_MMBCR_REP = await session.read({ nodeId: nodeId_CMSRead_MMBCR_REP, attributeId: AttributeIds.Value });

	const Value_CBC_BINBCR_BCR = await session.read({ nodeId: nodeId_CBCRead_BINBCR_BCR, attributeId: AttributeIds.Value });
	const Value_CBC_BINBCR_REQ = await session.read({ nodeId: nodeId_CBCRead_BINBCR_REQ, attributeId: AttributeIds.Value });
	const Value_CBC_BINBCR_CODE = await session.read({ nodeId: nodeId_CBCRead_BINBCR_CODE, attributeId: AttributeIds.Value });
	const Value_CBC_BINBCR_REP = await session.read({ nodeId: nodeId_CBCRead_BINBCR_REP, attributeId: AttributeIds.Value });

	const Value_CP_DP1BCR_BCR = await session.read({ nodeId: nodeId_CPRead_DP1BCR_BCR, attributeId: AttributeIds.Value });
	const Value_CP_DP1BCR_REQ = await session.read({ nodeId: nodeId_CPRead_DP1BCR_REQ, attributeId: AttributeIds.Value });
	const Value_CP_DP1BCR_CODE = await session.read({ nodeId: nodeId_CPRead_DP1BCR_CODE, attributeId: AttributeIds.Value });
	const Value_CP_DP1BCR_REP = await session.read({ nodeId: nodeId_CPRead_DP1BCR_REP, attributeId: AttributeIds.Value });

	const Value_CP_DP2BCR_BCR = await session.read({ nodeId: nodeId_CPRead_DP2BCR_BCR, attributeId: AttributeIds.Value });
	const Value_CP_DP2BCR_REQ = await session.read({ nodeId: nodeId_CPRead_DP2BCR_REQ, attributeId: AttributeIds.Value });
	const Value_CP_DP2BCR_CODE = await session.read({ nodeId: nodeId_CPRead_DP2BCR_CODE, attributeId: AttributeIds.Value });
	const Value_CP_DP2BCR_REP = await session.read({ nodeId: nodeId_CPRead_DP2BCR_REP, attributeId: AttributeIds.Value });

	const Value_CP_DPLBCR_BCR = await session.read({ nodeId: nodeId_CPRead_DPLBCR_BCR, attributeId: AttributeIds.Value });
	const Value_CP_DPLBCR_REQ = await session.read({ nodeId: nodeId_CPRead_DPLBCR_REQ, attributeId: AttributeIds.Value });
	const Value_CP_DPLBCR_CODE = await session.read({ nodeId: nodeId_CPRead_DPLBCR_CODE, attributeId: AttributeIds.Value });
	const Value_CP_DPLBCR_REP = await session.read({ nodeId: nodeId_CPRead_DPLBCR_REP, attributeId: AttributeIds.Value });


        let json_CNMP_NMP = {}
        let topic_CNMP_NMP = 'sfs.machine.nmp.c.nmp1';
	json_CNMP_NMP.BatchID = redis_value;
        json_CNMP_NMP.EqStatus = {}
        json_CNMP_NMP.EqStatus.min = 0;
        json_CNMP_NMP.EqStatus.max = 9;
        json_CNMP_NMP.EqStatus.value = Value_CNMP_NMP_EqStatus.value.value;
        json_CNMP_NMP.EqCM = {}
        json_CNMP_NMP.EqCM.min = 0;
        json_CNMP_NMP.EqCM.max = 9;
        json_CNMP_NMP.EqCM.value = Value_CNMP_NMP_EqCM.value.value;
        json_CNMP_NMP.LvPV = {}
        json_CNMP_NMP.LvPV.unit = "l";
        json_CNMP_NMP.LvPV.min = 0;
        json_CNMP_NMP.LvPV.max = 1000;
        json_CNMP_NMP.LvPV.value = Value_CNMP_NMP_LvPV.value.value;
        json_CNMP_NMP.TopPPV = {}
        json_CNMP_NMP.TopPPV.unit = "MPa";
        json_CNMP_NMP.TopPPV.min = -0.100;
        json_CNMP_NMP.TopPPV.max = 0.300;
        json_CNMP_NMP.TopPPV.value = (Value_CNMP_NMP_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_CNMP_NMP.T1PPV = {}
        json_CNMP_NMP.T1PPV.unit = "MPa";
        json_CNMP_NMP.T1PPV.min = 0;
        json_CNMP_NMP.T1PPV.max = 1.000;
        json_CNMP_NMP.T1PPV.value = (Value_CNMP_NMP_T1PPV.value.value * 0.001).toFixed(3) * 1;
        json_CNMP_NMP.T2PPV = {}
        json_CNMP_NMP.T2PPV.unit = "MPa";
        json_CNMP_NMP.T2PPV.min = 0;
        json_CNMP_NMP.T2PPV.max = 1.000;
        json_CNMP_NMP.T2PPV.value = (Value_CNMP_NMP_T2PPV.value.value * 0.001).toFixed(3) * 1;
        const CNMP_NMP_Bit12 = binaryDigits(Value_CNMP_NMP_Bit12.value.value, 12);
        json_CNMP_NMP.TOGV1 = CNMP_NMP_Bit12[11];
        json_CNMP_NMP.TOGV2 = CNMP_NMP_Bit12[10];
        json_CNMP_NMP.TSP1 = CNMP_NMP_Bit12[9];
        json_CNMP_NMP.TSP2 = CNMP_NMP_Bit12[8];
        json_CNMP_NMP.TOLCV = CNMP_NMP_Bit12[7];
        json_CNMP_NMP.TOL1 = CNMP_NMP_Bit12[6];
        json_CNMP_NMP.TOL2 = CNMP_NMP_Bit12[5];
        json_CNMP_NMP.NCDP = CNMP_NMP_Bit12[4];
        json_CNMP_NMP.NIV = CNMP_NMP_Bit12[3];
        json_CNMP_NMP.AIV = CNMP_NMP_Bit12[2];
        json_CNMP_NMP.EV = CNMP_NMP_Bit12[1];
        json_CNMP_NMP.LHIS = CNMP_NMP_Bit12[0];

        let json_CBC_BMixer = {}
        let topic_CBC_BMixer = 'sfs.machine.binder.c.bmix1';
        json_CBC_BMixer.EqStatus = {}
        json_CBC_BMixer.EqStatus.min = 0;
        json_CBC_BMixer.EqStatus.max = 9;
        json_CBC_BMixer.EqStatus.value = Value_CBC_BMixer_EqStatus.value.value;
        json_CBC_BMixer.EqCM = {}
        json_CBC_BMixer.EqCM.min = 0;
        json_CBC_BMixer.EqCM.max = 9;
        json_CBC_BMixer.EqCM.value = Value_CBC_BMixer_EqCM.value.value;
        json_CBC_BMixer.PCStatus = {}
        json_CBC_BMixer.PCStatus.min = 0;
        json_CBC_BMixer.PCStatus.max = 9;
        json_CBC_BMixer.PCStatus.value = Value_CBC_BMixer_PCStatus.value.value;
        json_CBC_BMixer.BatchID = {}
        json_CBC_BMixer.BatchID.value = Value_CBC_BMixer_BatchID.value.value;
        json_CBC_BMixer.ARPMPV = {}
        json_CBC_BMixer.ARPMPV.unit = 'RPM'
        json_CBC_BMixer.ARPMPV.min = 0;
        json_CBC_BMixer.ARPMPV.max = 60;
        json_CBC_BMixer.ARPMPV.value = Value_CBC_BMixer_ARPMPV.value.value;
        json_CBC_BMixer.ACPV = {}
        json_CBC_BMixer.ACPV.unit = 'Amp'
        json_CBC_BMixer.ACPV.min = 0.0;
        json_CBC_BMixer.ACPV.max = 10.0;
        json_CBC_BMixer.ACPV.value = (Value_CBC_BMixer_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_CBC_BMixer.DRPMPV = {}
        json_CBC_BMixer.DRPMPV.unit = 'RPM'
        json_CBC_BMixer.DRPMPV.min = 0;
        json_CBC_BMixer.DRPMPV.max = 1750;
        json_CBC_BMixer.DRPMPV.value = Value_CBC_BMixer_DRPMPV.value.value;
        json_CBC_BMixer.DCPV = {}
        json_CBC_BMixer.DCPV.unit = 'Amp'
        json_CBC_BMixer.DCPV.min = 0.0;
        json_CBC_BMixer.DCPV.max = 14.0;
        json_CBC_BMixer.DCPV.value = (Value_CBC_BMixer_DCPV.value.value * 0.1).toFixed(1) * 1;
        json_CBC_BMixer.PASNo = {}
        json_CBC_BMixer.PASNo.min = 0;
        json_CBC_BMixer.PASNo.max = 30;
        json_CBC_BMixer.PASNo.value = Value_CBC_BMixer_PASNo.value.value;
        json_CBC_BMixer.MTimeSV = {}
        json_CBC_BMixer.MTimeSV.unit = 'Min'
        json_CBC_BMixer.MTimeSV.min = 0;
        json_CBC_BMixer.MTimeSV.max = 999;
        json_CBC_BMixer.MTimeSV.value = Value_CBC_BMixer_MTimeSV.value.value;
        json_CBC_BMixer.MOTPV = {}
        json_CBC_BMixer.MOTPV.unit = 'Min'
        json_CBC_BMixer.MOTPV.min = 0;
        json_CBC_BMixer.MOTPV.max = 999;
        json_CBC_BMixer.MOTPV.value = Value_CBC_BMixer_MOTPV.value.value;
        json_CBC_BMixer.LvPV = {}
        json_CBC_BMixer.LvPV.unit = 'l'
        json_CBC_BMixer.LvPV.min = 0;
        json_CBC_BMixer.LvPV.max = 350;
        json_CBC_BMixer.LvPV.value = Value_CBC_BMixer_LvPV.value.value;
        json_CBC_BMixer.MTSV = {}
        json_CBC_BMixer.MTSV.unit = '°C'
        json_CBC_BMixer.MTSV.min = 0;
        json_CBC_BMixer.MTSV.max = 150.0;
        json_CBC_BMixer.MTSV.value = (Value_CBC_BMixer_MTSV.value.value * 0.1).toFixed(1) * 1;
        json_CBC_BMixer.TPV = {}
        json_CBC_BMixer.TPV.unit = '°C'
        json_CBC_BMixer.TPV.min = 0;
        json_CBC_BMixer.TPV.max = 150.0;
        json_CBC_BMixer.TPV.value = (Value_CBC_BMixer_TPV.value.value * 0.1).toFixed(1) * 1;
        json_CBC_BMixer.MPSV = {}
        json_CBC_BMixer.MPSV.unit = 'MPa'
        json_CBC_BMixer.MPSV.min = -0.100;
        json_CBC_BMixer.MPSV.max = 0.300;
        json_CBC_BMixer.MPSV.value = (Value_CBC_BMixer_MPSV.value.value * 0.001).toFixed(3) * 1;
        json_CBC_BMixer.TopPPV = {}
        json_CBC_BMixer.TopPPV.unit = 'MPa'
        json_CBC_BMixer.TopPPV.min = -0.100;
        json_CBC_BMixer.TopPPV.max = 0.300;
        json_CBC_BMixer.TopPPV.value = (Value_CBC_BMixer_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_CBC_BMixer.TWBWSV = {}
        json_CBC_BMixer.TWBWSV.unit = 'kg'
        json_CBC_BMixer.TWBWSV.min = 0.00;
        json_CBC_BMixer.TWBWSV.max = 999.99;
        json_CBC_BMixer.TWBWSV.value = (Value_CBC_BMixer_TWBWSV.value.value * 0.01).toFixed(2) * 1;;
        json_CBC_BMixer.TWBWPV = {}
        json_CBC_BMixer.TWBWPV.unit = 'kg'
        json_CBC_BMixer.TWBWPV.min = -99.99;
        json_CBC_BMixer.TWBWPV.max = 999.99;
        json_CBC_BMixer.TWBWPV.value = (Value_CBC_BMixer_TWBWPV.value.value * 0.01).toFixed(2) * 1;
        json_CBC_BMixer.TIWSV = {}
        json_CBC_BMixer.TIWSV.unit = 'kg'
        json_CBC_BMixer.TIWSV.min = 0.00;
        json_CBC_BMixer.TIWSV.max = 999.99;
        json_CBC_BMixer.TIWSV.value = (Value_CBC_BMixer_TIWSV.value.value * 0.01).toFixed(2) * 1;
        json_CBC_BMixer.WIWPV = {}
        json_CBC_BMixer.WIWPV.unit = 'kg'
        json_CBC_BMixer.WIWPV.min = 0.00;
        json_CBC_BMixer.WIWPV.max = 999.99;
        json_CBC_BMixer.WIWPV.value = (Value_CBC_BMixer_WIWPV.value.value * 0.01).toFixed(2) * 1;
        const CBC_BMixer_Bit18 = binaryDigits(Value_CBC_BMixer_Bit18.value.value, 18);
        json_CBC_BMixer.TOGVS = CBC_BMixer_Bit18[17];
        json_CBC_BMixer.TOLDP = CBC_BMixer_Bit18[16];
        json_CBC_BMixer.BMIHV = CBC_BMixer_Bit18[15];
        json_CBC_BMixer.BMIHS = CBC_BMixer_Bit18[14];
        json_CBC_BMixer.MAV = CBC_BMixer_Bit18[13];
        json_CBC_BMixer.OGVO = CBC_BMixer_Bit18[12];
        json_CBC_BMixer.OGVC = CBC_BMixer_Bit18[11];
        json_CBC_BMixer.PV = CBC_BMixer_Bit18[10];
        json_CBC_BMixer.VV = CBC_BMixer_Bit18[9];
        json_CBC_BMixer.BMVEV = CBC_BMixer_Bit18[8];
        json_CBC_BMixer.MMIV = CBC_BMixer_Bit18[7];
        json_CBC_BMixer.NIV = CBC_BMixer_Bit18[6];
        json_CBC_BMixer.NFCV = CBC_BMixer_Bit18[5];
        json_CBC_BMixer.NLVL = CBC_BMixer_Bit18[4];
        json_CBC_BMixer.NLVS = CBC_BMixer_Bit18[3];
        json_CBC_BMixer.AIV = CBC_BMixer_Bit18[2];
        json_CBC_BMixer.EV = CBC_BMixer_Bit18[1];
        json_CBC_BMixer.VFV = CBC_BMixer_Bit18[0];

        let json_CBC_BST = {}
        let topic_CBC_BST = 'sfs.machine.binder.c.bst1';
        json_CBC_BST.EqStatus = {}
        json_CBC_BST.EqStatus.min = 0;
        json_CBC_BST.EqStatus.max = 9;
        json_CBC_BST.EqStatus.value = Value_CBC_BST_EqStatus.value.value;
        json_CBC_BST.EqCM = {}
        json_CBC_BST.EqCM.min = 0;
        json_CBC_BST.EqCM.max = 9;
        json_CBC_BST.EqCM.value = Value_CBC_BST_EqCM.value.value;
        json_CBC_BST.BatchID = {}
        json_CBC_BST.BatchID.value = Value_CBC_BST_BatchID.value.value;
        json_CBC_BST.ARPMPV = {}
        json_CBC_BST.ARPMPV.unit = 'RPM';
        json_CBC_BST.ARPMPV.min = 0;
        json_CBC_BST.ARPMPV.max = 60;
        json_CBC_BST.ARPMPV.value = Value_CBC_BST_ARPMPV.value.value;
        json_CBC_BST.ACPV = {}
        json_CBC_BST.ACPV.unit = 'Amp';
        json_CBC_BST.ACPV.min = 0.0;
        json_CBC_BST.ACPV.max = 6.0;
        json_CBC_BST.ACPV.value = Value_CBC_BST_ACPV.value.value;
        json_CBC_BST.RPRPM = {}
        json_CBC_BST.RPRPM.unit = 'RPM';
        json_CBC_BST.RPRPM.min = 0;
        json_CBC_BST.RPRPM.max = 60;
        json_CBC_BST.RPRPM.value = Value_CBC_BST_RPRPM.value.value;
        json_CBC_BST.LvPV = {}
        json_CBC_BST.LvPV.unit = 'l';
        json_CBC_BST.LvPV.min = 0;
        json_CBC_BST.LvPV.max = 350;
        json_CBC_BST.LvPV.value = Value_CBC_BST_LvPV.value.value;
        json_CBC_BST.TopPPV = {}
        json_CBC_BST.TopPPV.unit = 'MPa';
        json_CBC_BST.TopPPV.min = -0.100;
        json_CBC_BST.TopPPV.max = 0.300;
        json_CBC_BST.TopPPV.value = (Value_CBC_BST_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_CBC_BST.TPV = {}
        json_CBC_BST.TPV.unit = '°C';
        json_CBC_BST.TPV.min = 0.0;
        json_CBC_BST.TPV.max = 150.0;
        json_CBC_BST.TPV.value = (Value_CBC_BST_TPV.value.value * 0.1).toFixed(1) * 1;
        const CBC_BST_Bit4 = binaryDigits(Value_CBC_BST_Bit4.value.value, 4);
        json_CBC_BST.BSIV = CBC_BST_Bit4[3];
        json_CBC_BST.NIV = CBC_BST_Bit4[2];
        json_CBC_BST.AIV = CBC_BST_Bit4[1];
        json_CBC_BST.EV = CBC_BST_Bit4[0];
        
        let json_CBC_CNTST = {}
        let topic_CBC_CNTST = 'sfs.machine.binder.c.cnt1';
        json_CBC_CNTST.EqStatus = {}
        json_CBC_CNTST.EqStatus.min = 0;
        json_CBC_CNTST.EqStatus.max = 9;
        json_CBC_CNTST.EqStatus.value = Value_CBC_CNTST_EqStatus.value.value;
        json_CBC_CNTST.EqCM = {}
        json_CBC_CNTST.EqCM.min = 0;
        json_CBC_CNTST.EqCM.max = 9;
        json_CBC_CNTST.EqCM.value = Value_CBC_CNTST_EqCM.value.value;
        json_CBC_CNTST.BatchID = {}
        json_CBC_CNTST.BatchID.value = Value_CBC_CNTST_BatchID.value.value;
        json_CBC_CNTST.ARPMPV = {}
        json_CBC_CNTST.ARPMPV.unit = "RPM";
        json_CBC_CNTST.ARPMPV.min = 0;
        json_CBC_CNTST.ARPMPV.max = 60;
        json_CBC_CNTST.ARPMPV.value = Value_CBC_CNTST_ARPMPV.value.value;
        json_CBC_CNTST.ACPV = {}
        json_CBC_CNTST.ACPV.unit = "Amp";
        json_CBC_CNTST.ACPV.min = 0.0;
        json_CBC_CNTST.ACPV.max = 3.0;
        json_CBC_CNTST.ACPV.value = (Value_CBC_CNTST_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_CBC_CNTST.LvPV = {}
        json_CBC_CNTST.LvPV.unit = "l";
        json_CBC_CNTST.LvPV.min = 0;
        json_CBC_CNTST.LvPV.max = 300;
        json_CBC_CNTST.LvPV.value = Value_CBC_CNTST_LvPV.value.value;
        json_CBC_CNTST.TopPPV = {}
        json_CBC_CNTST.TopPPV.unit = "MPa";
        json_CBC_CNTST.TopPPV.min = -0.100;
        json_CBC_CNTST.TopPPV.max = 0.300;
        json_CBC_CNTST.TopPPV.value = (Value_CBC_CNTST_TopPPV.value.value * 0.001).toFixed(3) * 1;
        const CBC_CNTST_Bit7 = binaryDigits(Value_CBC_CNTST_Bit7.value.value, 7);
        json_CBC_CNTST.TOGVS = CBC_CNTST_Bit7[6];
        json_CBC_CNTST.TOLVS = CBC_CNTST_Bit7[5];
        json_CBC_CNTST.CCDP = CBC_CNTST_Bit7[4];
        json_CBC_CNTST.CIV = CBC_CNTST_Bit7[3];
        json_CBC_CNTST.NIV = CBC_CNTST_Bit7[2];
        json_CBC_CNTST.AIV = CBC_CNTST_Bit7[1];
        json_CBC_CNTST.EV = CBC_CNTST_Bit7[0];

        let json_CMS_MMixer = {}
        let topic_CMS_MMixer = 'sfs.machine.mixer.c.mmix1';
        json_CMS_MMixer.EqStatus = {}
        json_CMS_MMixer.EqStatus.min = 0;
        json_CMS_MMixer.EqStatus.max = 9;
        json_CMS_MMixer.EqStatus.value = Value_CMS_NMixer_EqStatus.value.value;
        json_CMS_MMixer.EqCM = {}
        json_CMS_MMixer.EqCM.min = 0;
        json_CMS_MMixer.EqCM.max = 9;
        json_CMS_MMixer.EqCM.value = Value_CMS_NMixer_EqCM.value.value;
        json_CMS_MMixer.PCStatus = {}
        json_CMS_MMixer.PCStatus.min = 0;
        json_CMS_MMixer.PCStatus.max = 9;
        json_CMS_MMixer.PCStatus.value = Value_CMS_NMixer_PCStatus.value.value;
        json_CMS_MMixer.BatchID = {}
        json_CMS_MMixer.BatchID.value = redis_value;
        json_CMS_MMixer.PRPMPV = {}
        json_CMS_MMixer.PRPMPV.unit = "RPM";
        json_CMS_MMixer.PRPMPV.min = 0;
        json_CMS_MMixer.PRPMPV.max = 45;
        json_CMS_MMixer.PRPMPV.value = Value_CMS_NMixer_PRPMPV.value.value;
        json_CMS_MMixer.PCPV = {}
        json_CMS_MMixer.PCPV.unit = "Amp";
        json_CMS_MMixer.PCPV.min = 0.0;
        json_CMS_MMixer.PCPV.max = 67.0;
        json_CMS_MMixer.PCPV.value = (Value_CMS_NMixer_PCPV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_MMixer.DRPMPV = {}
        json_CMS_MMixer.DRPMPV.unit = "RPM";
        json_CMS_MMixer.DRPMPV.min = 0;
        json_CMS_MMixer.DRPMPV.max = 1750;
        json_CMS_MMixer.DRPMPV.value = Value_CMS_NMixer_DRPMPV.value.value;
        json_CMS_MMixer.DCPV = {}
        json_CMS_MMixer.DCPV.unit = "Amp";
        json_CMS_MMixer.DCPV.min = 0.0;
        json_CMS_MMixer.DCPV.max = 67.0;
        json_CMS_MMixer.DCPV.value = (Value_CMS_NMixer_DCPV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_MMixer.PASNo = {}
        json_CMS_MMixer.PASNo.min = 0;
        json_CMS_MMixer.PASNo.max = 30;
        json_CMS_MMixer.PASNo.value = Value_CMS_NMixer_PASNo.value.value;
        json_CMS_MMixer.MTimeSV = {}
        json_CMS_MMixer.MTimeSV.unit = 'Min';
        json_CMS_MMixer.MTimeSV.min = 0;
        json_CMS_MMixer.MTimeSV.max = 999;
        json_CMS_MMixer.MTimeSV.value = Value_CMS_NMixer_MTimeSV.value.value;
        json_CMS_MMixer.MOTPV = {}
        json_CMS_MMixer.MOTPV.unit = 'Min';
        json_CMS_MMixer.MOTPV.min = 0;
        json_CMS_MMixer.MOTPV.max = 999;
        json_CMS_MMixer.MOTPV.value = Value_CMS_NMixer_MOTPV.value.value;
        json_CMS_MMixer.MTSV = {}
        json_CMS_MMixer.MTSV.unit = '°C';
        json_CMS_MMixer.MTSV.min = 0.0;
        json_CMS_MMixer.MTSV.max = 150.0;
        json_CMS_MMixer.MTSV.value = (Value_CMS_NMixer_MTSV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_MMixer.VTPV = {}
        json_CMS_MMixer.VTPV.unit = '°C';
        json_CMS_MMixer.VTPV.min = 0.0;
        json_CMS_MMixer.VTPV.max = 150.0;
        json_CMS_MMixer.VTPV.value = (Value_CMS_NMixer_VTPV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_MMixer.MPSV = {}
        json_CMS_MMixer.MPSV.unit = 'MPa';
        json_CMS_MMixer.MPSV.min = -0.100;
        json_CMS_MMixer.MPSV.max = 0.300;
        json_CMS_MMixer.MPSV.value = (Value_CMS_NMixer_MPSV.value.value * 0.001).toFixed(3) * 1;
        json_CMS_MMixer.TopPPV = {}
        json_CMS_MMixer.TopPPV.unit = 'MPa';
        json_CMS_MMixer.TopPPV.min = -0.100;
        json_CMS_MMixer.TopPPV.max = 0.300;
        json_CMS_MMixer.TopPPV.value = (Value_CMS_NMixer_TopPPV.value.value * 0.001).toFixed(3) * 1;
        json_CMS_MMixer.VOPPPV = {}
        json_CMS_MMixer.VOPPPV.unit = 'MPa';
        json_CMS_MMixer.VOPPPV.min = 0.000;
        json_CMS_MMixer.VOPPPV.max = 20.000;
        json_CMS_MMixer.VOPPPV.value = (Value_CMS_NMixer_VOPPPV.value.value * 0.001).toFixed(3) * 1;
        json_CMS_MMixer.VOPTPV = {}
        json_CMS_MMixer.VOPTPV.unit = 'MPa';
        json_CMS_MMixer.VOPTPV.min = 0.0;
        json_CMS_MMixer.VOPTPV.max = 150.0;
        json_CMS_MMixer.VOPTPV.value = (Value_CMS_NMixer_VOPTPV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_MMixer.TWCSV = {}
        json_CMS_MMixer.TWCSV.unit = 'kg';
        json_CMS_MMixer.TWCSV.min = 0.00;
        json_CMS_MMixer.TWCSV.max = 9999.99;
        json_CMS_MMixer.TWCSV.value = (Value_CMS_NMixer_TWCSV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TWCPV = {}
        json_CMS_MMixer.TWCPV.unit = 'kg';
        json_CMS_MMixer.TWCPV.min = -99.99;
        json_CMS_MMixer.TWCPV.max = 9999.99;
        json_CMS_MMixer.TWCPV.value = (Value_CMS_NMixer_TWCPV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TWMSV = {}
        json_CMS_MMixer.TWMSV.unit = 'kg';
        json_CMS_MMixer.TWMSV.min = 0.00;
        json_CMS_MMixer.TWMSV.max = 9999.99;
        json_CMS_MMixer.TWMSV.value = (Value_CMS_NMixer_TWMSV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TWMPV = {}
        json_CMS_MMixer.TWMPV.unit = 'kg';
        json_CMS_MMixer.TWMPV.min = -99.99;
        json_CMS_MMixer.TWMPV.max = 9999.99;
        json_CMS_MMixer.TWMPV.value = (Value_CMS_NMixer_TWMPV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TWSSV = {}
        json_CMS_MMixer.TWSSV.unit = 'kg';
        json_CMS_MMixer.TWSSV.min = 0.00;
        json_CMS_MMixer.TWSSV.max = 9999.99;
        json_CMS_MMixer.TWSSV.value = (Value_CMS_NMixer_TWSSV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TWSPV = {}
        json_CMS_MMixer.TWSPV.unit = 'kg';
        json_CMS_MMixer.TWSPV.min = -99.99;
        json_CMS_MMixer.TWSPV.max = 9999.99;
        json_CMS_MMixer.TWSPV.value = (Value_CMS_NMixer_TWSPV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.IWSV = {}
        json_CMS_MMixer.IWSV.unit = 'kg';
        json_CMS_MMixer.IWSV.min = 0.00;
        json_CMS_MMixer.IWSV.max = 9999.99;
        json_CMS_MMixer.IWSV.value = (Value_CMS_NMixer_IWSV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.IWPV = {}
        json_CMS_MMixer.IWPV.unit = 'kg';
        json_CMS_MMixer.IWPV.min = -99.99;
        json_CMS_MMixer.IWPV.max = 9999.99;
        json_CMS_MMixer.IWPV.value = (Value_CMS_NMixer_IWPV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.CIWSV = {}
        json_CMS_MMixer.CIWSV.unit = 'kg';
        json_CMS_MMixer.CIWSV.min = 0.00;
        json_CMS_MMixer.CIWSV.max = 9999.99;
        json_CMS_MMixer.CIWSV.value = (Value_CMS_NMixer_CIWSV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.CIWPV = {}
        json_CMS_MMixer.CIWPV.unit = 'kg';
        json_CMS_MMixer.CIWPV.min = -99.99;
        json_CMS_MMixer.CIWPV.max = 9999.99;
        json_CMS_MMixer.CIWPV.value = (Value_CMS_NMixer_CIWPV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TIWSV = {}
        json_CMS_MMixer.TIWSV.unit = 'kg';
        json_CMS_MMixer.TIWSV.min = 0.00;
        json_CMS_MMixer.TIWSV.max = 9999.99;
        json_CMS_MMixer.TIWSV.value = (Value_CMS_NMixer_TIWSV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TIWPV = {}
        json_CMS_MMixer.TIWPV.unit = 'kg';
        json_CMS_MMixer.TIWPV.min = -99.99;
        json_CMS_MMixer.TIWPV.max = 9999.99;
        json_CMS_MMixer.TIWPV.value = (Value_CMS_NMixer_TIWPV.value.value * 0.01).toFixed(2) * 1;
        json_CMS_MMixer.TOLPPV = {}
        json_CMS_MMixer.TOLPPV.unit = 'MPa';
        json_CMS_MMixer.TOLPPV.min = -0.100;
        json_CMS_MMixer.TOLPPV.max = 1.000;
        json_CMS_MMixer.TOLPPV.value = (Value_CMS_NMixer_TOLPPV.value.value * 0.001).toFixed(3) * 1;
        const CMS_MMixer_Bit6 = binaryDigits(Value_CMS_NMixer_Bit32.value.value, 32);
        json_CMS_MMixer.TOGVS = CMS_MMixer_Bit6[31];
        json_CMS_MMixer.TOLDP = CMS_MMixer_Bit6[30];
        json_CMS_MMixer.CIHVV = CMS_MMixer_Bit6[29];
        json_CMS_MMixer.CIHSV = CMS_MMixer_Bit6[28];
        json_CMS_MMixer.CVMAV = CMS_MMixer_Bit6[27];
        json_CMS_MMixer.CVOGVO = CMS_MMixer_Bit6[26];
        json_CMS_MMixer.CVOGVC = CMS_MMixer_Bit6[25];
        json_CMS_MMixer.CVPV = CMS_MMixer_Bit6[24];
        json_CMS_MMixer.CVVV = CMS_MMixer_Bit6[23];
        json_CMS_MMixer.CVEV = CMS_MMixer_Bit6[22];
        json_CMS_MMixer.CMIV = CMS_MMixer_Bit6[21];
        json_CMS_MMixer.MMIV = CMS_MMixer_Bit6[20];
        json_CMS_MMixer.LMIV = CMS_MMixer_Bit6[19];
        json_CMS_MMixer.BIV = CMS_MMixer_Bit6[18];
        json_CMS_MMixer.BFCV = CMS_MMixer_Bit6[17];
        json_CMS_MMixer.BLVL = CMS_MMixer_Bit6[16];
        json_CMS_MMixer.BLVS = CMS_MMixer_Bit6[15];
        json_CMS_MMixer.NSRIV = CMS_MMixer_Bit6[14];
        json_CMS_MMixer.NIV = CMS_MMixer_Bit6[13];
        json_CMS_MMixer.NFCV = CMS_MMixer_Bit6[12];
        json_CMS_MMixer.NLVL = CMS_MMixer_Bit6[11];
        json_CMS_MMixer.NLVS = CMS_MMixer_Bit6[10];
        // json_CMS_MMixer.SIV = CMS_MMixer_Bit6[9];
        // json_CMS_MMixer.SFCV = CMS_MMixer_Bit6[8];
        json_CMS_MMixer.AIV = CMS_MMixer_Bit6[7];
        json_CMS_MMixer.EV = CMS_MMixer_Bit6[6];
        json_CMS_MMixer.VFV = CMS_MMixer_Bit6[5];
        json_CMS_MMixer.VV = CMS_MMixer_Bit6[4];
        json_CMS_MMixer.CIV = CMS_MMixer_Bit6[3];
        json_CMS_MMixer.SLDS = CMS_MMixer_Bit6[2];
        json_CMS_MMixer.VOP = CMS_MMixer_Bit6[1];

        let json_CMS_Slurry1 = {}
        let topic_CMS_Slurry1 = 'sfs.machine.mixer.c.slur1';
        json_CMS_Slurry1.EqStatus = {}
        json_CMS_Slurry1.EqStatus.min = 0;
        json_CMS_Slurry1.EqStatus.max = 9;
        json_CMS_Slurry1.EqStatus.value = Value_CMS_Slurry1_EqStatus.value.value;
        json_CMS_Slurry1.EqCM = {}
        json_CMS_Slurry1.EqCM.min = 0;
        json_CMS_Slurry1.EqCM.max = 9;
        json_CMS_Slurry1.EqCM.value = Value_CMS_Slurry1_EqCM.value.value;
        json_CMS_Slurry1.BatchID = {}
        json_CMS_Slurry1.BatchID.value = Value_CMS_Slurry1_BatchID.value.value;
        json_CMS_Slurry1.ARPMPV = {}
        json_CMS_Slurry1.ARPMPV.unit = 'RPM';
        json_CMS_Slurry1.ARPMPV.min = 0;
        json_CMS_Slurry1.ARPMPV.max = 60;
        json_CMS_Slurry1.ARPMPV.value = Value_CMS_Slurry1_ARPMPV.value.value;
        json_CMS_Slurry1.ACPV = {}
        json_CMS_Slurry1.ACPV.unit = 'Amp';
        json_CMS_Slurry1.ACPV.min = 0.0;
        json_CMS_Slurry1.ACPV.max = 6.0;
        json_CMS_Slurry1.ACPV.value = (Value_CMS_Slurry1_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_Slurry1.PASNo = {}
        json_CMS_Slurry1.PASNo.min = 0;
        json_CMS_Slurry1.PASNo.max = 30;
        json_CMS_Slurry1.PASNo.value = Value_CMS_Slurry1_PASNo.value.value;
        json_CMS_Slurry1.MTimeSV = {}
        json_CMS_Slurry1.MTimeSV.unit = 'Min';
        json_CMS_Slurry1.MTimeSV.min = 0;
        json_CMS_Slurry1.MTimeSV.max = 999;
        json_CMS_Slurry1.MTimeSV.value = Value_CMS_Slurry1_MTimeSV.value.value;
        json_CMS_Slurry1.OT = {}
        json_CMS_Slurry1.OT.unit = 'Min';
        json_CMS_Slurry1.OT.min = 0;
        json_CMS_Slurry1.OT.max = 999;
        json_CMS_Slurry1.OT.value = Value_CMS_Slurry1_OT.value.value;
        json_CMS_Slurry1.LvPV = {}
        json_CMS_Slurry1.LvPV.unit = 'l';
        json_CMS_Slurry1.LvPV.min = 0;
        json_CMS_Slurry1.LvPV.max = 350;
        json_CMS_Slurry1.LvPV.value = Value_CMS_Slurry1_LvPV.value.value;
        json_CMS_Slurry1.TopPPV = {}
        json_CMS_Slurry1.TopPPV.unit = 'MPa';
        json_CMS_Slurry1.TopPPV.min = -0.100;
        json_CMS_Slurry1.TopPPV.max = 0.300;
        json_CMS_Slurry1.TopPPV.value = (Value_CMS_Slurry1_TopPPV.value.value * 0.001).toFixed(3) * 1;
        const CMS_Slurry1_Bit6 = binaryDigits(Value_CMS_Slurry1_Bit6.value.value, 6);
        json_CMS_Slurry1.SILV = CMS_Slurry1_Bit6[5];
        json_CMS_Slurry1.SIV = CMS_Slurry1_Bit6[4];
        json_CMS_Slurry1.DWIV = CMS_Slurry1_Bit6[3];
        json_CMS_Slurry1.AIV = CMS_Slurry1_Bit6[2];
        json_CMS_Slurry1.EV = CMS_Slurry1_Bit6[1];
        json_CMS_Slurry1.VV = CMS_Slurry1_Bit6[0];

        // console.log(Value_CMS_Slurry1_EqStatus);

        let json_CMS_Slurry2 = {}
        let topic_CMS_Slurry2 = 'sfs.machine.mixer.c.slur2';
        json_CMS_Slurry2.EqStatus = {}
        json_CMS_Slurry2.EqStatus.min = 0;
        json_CMS_Slurry2.EqStatus.max = 9;
        json_CMS_Slurry2.EqStatus.value = Value_CMS_Slurry2_EqStatus.value.value;
        json_CMS_Slurry2.EqCM = {}
        json_CMS_Slurry2.EqCM.min = 0;
        json_CMS_Slurry2.EqCM.max = 9;
        json_CMS_Slurry2.EqCM.value = Value_CMS_Slurry2_EqCM.value.value;
        json_CMS_Slurry2.BatchID = {}
        json_CMS_Slurry2.BatchID.value = Value_CMS_Slurry2_BatchID.value.value;
        json_CMS_Slurry2.ARPMPV = {}
        json_CMS_Slurry2.ARPMPV.unit = 'RPM';
        json_CMS_Slurry2.ARPMPV.min = 0;
        json_CMS_Slurry2.ARPMPV.max = 60;
        json_CMS_Slurry2.ARPMPV.value = Value_CMS_Slurry2_ARPMPV.value.value;
        json_CMS_Slurry2.ACPV = {}
        json_CMS_Slurry2.ACPV.unit = 'Amp';
        json_CMS_Slurry2.ACPV.min = 0.0;
        json_CMS_Slurry2.ACPV.max = 6.0;
        json_CMS_Slurry2.ACPV.value = (Value_CMS_Slurry2_ACPV.value.value * 0.1).toFixed(1) * 1;
        json_CMS_Slurry2.PASNo = {}
        json_CMS_Slurry2.PASNo.min = 0;
        json_CMS_Slurry2.PASNo.max = 30;
        json_CMS_Slurry2.PASNo.value = Value_CMS_Slurry2_PASNo.value.value;
        json_CMS_Slurry2.MTimeSV = {}
        json_CMS_Slurry2.MTimeSV.unit = 'Min';
        json_CMS_Slurry2.MTimeSV.min = 0;
        json_CMS_Slurry2.MTimeSV.max = 999;
        json_CMS_Slurry2.MTimeSV.value = Value_CMS_Slurry2_MTimeSV.value.value;
        json_CMS_Slurry2.OT = {}
        json_CMS_Slurry2.OT.unit = 'Min';
        json_CMS_Slurry2.OT.min = 0;
        json_CMS_Slurry2.OT.max = 999;
        json_CMS_Slurry2.OT.value = Value_CMS_Slurry2_OT.value.value;
        json_CMS_Slurry2.LvPV = {}
        json_CMS_Slurry2.LvPV.unit = 'l';
        json_CMS_Slurry2.LvPV.min = 0;
        json_CMS_Slurry2.LvPV.max = 350;
        json_CMS_Slurry2.LvPV.value = Value_CMS_Slurry2_LvPV.value.value;
        json_CMS_Slurry2.TopPPV = {}
        json_CMS_Slurry2.TopPPV.unit = 'MPa';
        json_CMS_Slurry2.TopPPV.min = -0.100;
        json_CMS_Slurry2.TopPPV.max = 0.300;
        json_CMS_Slurry2.TopPPV.value = (Value_CMS_Slurry2_TopPPV.value.value * 0.001).toFixed(3) * 1;
        const CMS_Slurry2_Bit6 = binaryDigits(Value_CMS_Slurry2_Bit6.value.value, 6);
        json_CMS_Slurry2.SILV = CMS_Slurry2_Bit6[5];
        json_CMS_Slurry2.SIV = CMS_Slurry2_Bit6[4];
        json_CMS_Slurry2.DWIV = CMS_Slurry2_Bit6[3];
        json_CMS_Slurry2.AIV = CMS_Slurry2_Bit6[2];
        json_CMS_Slurry2.EV = CMS_Slurry2_Bit6[1];
        json_CMS_Slurry2.VV = CMS_Slurry2_Bit6[0];

        let json_CP_DP = {}
        let topic_CP_DP = 'sfs.machine.powder.c.dp1';
        const CP_DP_Bit7 = binaryDigits(Value_CP_DP_Bit7.value.value, 7);
        json_CP_DP.MAV = CP_DP_Bit7[6];
        json_CP_DP.MPLS1 = CP_DP_Bit7[5];
        json_CP_DP.MPLS2 = CP_DP_Bit7[4];
        json_CP_DP.MPLS3 = CP_DP_Bit7[3];
        json_CP_DP.MPLS4 = CP_DP_Bit7[2];
        json_CP_DP.MVV1 = CP_DP_Bit7[1];
        json_CP_DP.MVV2 = CP_DP_Bit7[0];
        const CP_DP_Bit4 = binaryDigits(Value_CP_DP_Bit4.value.value, 4);
        json_CP_DP.LAV = CP_DP_Bit4[3];
        json_CP_DP.LIP = CP_DP_Bit4[2];
        json_CP_DP.LOP = CP_DP_Bit4[1];
        json_CP_DP.LVV = CP_DP_Bit4[0];

        let json_CP_MS1 = {}
        let topic_CP_MS1 = 'sfs.machine.powder.c.ms1';
        json_CP_MS1.PWV = {}
        json_CP_MS1.PWV.unit = 'kg';
        json_CP_MS1.PWV.min = -99.99;
        json_CP_MS1.PWV.max = 9999.99;
        json_CP_MS1.PWV.value = (Value_CP_MS1_PWV.value.value * 0.01).toFixed(2) * 1;
        json_CP_MS1.ORPM = {}
        json_CP_MS1.ORPM.unit = 'RPM';
        json_CP_MS1.ORPM.min = 0;
        json_CP_MS1.ORPM.max = 30;
        json_CP_MS1.ORPM.value = Value_CP_MS1_ORPM.value.value;
        const CP_MS1_Bit5 = binaryDigits(Value_CP_MS1_Bit5.value.value, 5);
        json_CP_MS1.APV = CP_MS1_Bit5[4];
        json_CP_MS1.VV = CP_MS1_Bit5[3];
        json_CP_MS1.OGV = CP_MS1_Bit5[2];
        json_CP_MS1.JCLOV = CP_MS1_Bit5[1];
        json_CP_MS1.JCLCV = CP_MS1_Bit5[0];

        let json_CP_MS2 = {}
        let topic_CP_MS2 = 'sfs.machine.powder.c.ms2';
        json_CP_MS2.PWV = {}
        json_CP_MS2.PWV.unit = 'kg';
        json_CP_MS2.PWV.min = -99.99;
        json_CP_MS2.PWV.max = 9999.99;
        json_CP_MS2.PWV.value = (Value_CP_MS2_PWV.value.value * 0.01).toFixed(2) * 1;
        json_CP_MS2.ORPM = {}
        json_CP_MS2.ORPM.unit = 'RPM';
        json_CP_MS2.ORPM.min = 0;
        json_CP_MS2.ORPM.max = 30;
        json_CP_MS2.ORPM.value = Value_CP_MS2_ORPM.value.value;
        const CP_MS2_Bit5 = binaryDigits(Value_CP_MS2_Bit5.value.value, 5);
        json_CP_MS2.APV = CP_MS2_Bit5[4];
        json_CP_MS2.VV = CP_MS2_Bit5[3];
        json_CP_MS2.OGV = CP_MS2_Bit5[2];
        json_CP_MS2.JCLOV = CP_MS2_Bit5[1];
        json_CP_MS2.JCLCV = CP_MS2_Bit5[0];

        let json_CP_LS = {}
        let topic_CP_LS = 'sfs.machine.powder.c.ls1';
        json_CP_LS.PWV = {}
        json_CP_LS.PWV.unit = 'kg';
        json_CP_LS.PWV.min = -99.99;
        json_CP_LS.PWV.max = 9999.99;
        json_CP_LS.PWV.value = (Value_CP_LS_PWV.value.value * 0.01).toFixed(2) * 1;
        json_CP_LS.ORPM = {}
        json_CP_LS.ORPM.unit = 'RPM';
        json_CP_LS.ORPM.min = 0;
        json_CP_LS.ORPM.max = 30;
        json_CP_LS.ORPM.value = Value_CP_LS_ORPM.value.value;
        const CP_LS_Bit5 = binaryDigits(Value_CP_LS_Bit5.value.value, 5);
        json_CP_LS.APV = CP_LS_Bit5[4];
        json_CP_LS.VV = CP_LS_Bit5[3];
        json_CP_LS.OGV = CP_LS_Bit5[2];
        json_CP_LS.JCLOV = CP_LS_Bit5[1];
        json_CP_LS.JCLCV = CP_LS_Bit5[0];

        let json_CP_MDis = {}
        let topic_CP_MDis = 'sfs.machine.powder.c.mdi1';
        json_CP_MDis.PWV = {}
        json_CP_MDis.PWV.unit = 'kg';
        json_CP_MDis.PWV.min = -99.99;
        json_CP_MDis.PWV.max = 9999.99;
        json_CP_MDis.PWV.value = (Value_CP_MDis_PWV.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.ORPM = {}
        json_CP_MDis.ORPM.unit = 'RPM';
        json_CP_MDis.ORPM.min = 0;
        json_CP_MDis.ORPM.max = 15;
        json_CP_MDis.ORPM.value = Value_CP_MDis_ORPM.value.value;
        json_CP_MDis.MWSV1 = {}
        json_CP_MDis.MWSV1.unit = 'kg';
        json_CP_MDis.MWSV1.min = 0.00;
        json_CP_MDis.MWSV1.max = 9999.99;
        json_CP_MDis.MWSV1.value = (Value_CP_MDis_MWSV1.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.MTWPV1 = {}
        json_CP_MDis.MTWPV1.unit = 'kg';
        json_CP_MDis.MTWPV1.min = -99.99;
        json_CP_MDis.MTWPV1.max = 9999.99;
        json_CP_MDis.MTWPV1.value = (Value_CP_MDis_MTWPV1.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.MWT1 = {}
        json_CP_MDis.MWT1.unit = 'sec';
        json_CP_MDis.MWT1.min = 0;
        json_CP_MDis.MWT1.max = 9999;
        json_CP_MDis.MWT1.value = Value_CP_MDis_MWT1.value.value;
        json_CP_MDis.MWSV2 = {}
        json_CP_MDis.MWSV2.unit = 'kg';
        json_CP_MDis.MWSV2.min = 0.00;
        json_CP_MDis.MWSV2.max = 9999.99;
        json_CP_MDis.MWSV2.value = (Value_CP_MDis_MWSV2.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.MTWPV2 = {}
        json_CP_MDis.MTWPV2.unit = 'kg';
        json_CP_MDis.MTWPV2.min = -99.99;
        json_CP_MDis.MTWPV2.max = 9999.99;
        json_CP_MDis.MTWPV2.value = (Value_CP_MDis_MTWPV2.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.MWT2 = {}
        json_CP_MDis.MWT2.unit = 'sec';
        json_CP_MDis.MWT2.min = 0;
        json_CP_MDis.MWT2.max = 9999;
        json_CP_MDis.MWT2.value = Value_CP_MDis_MWT2.value.value;
        json_CP_MDis.TWSV = {}
        json_CP_MDis.TWSV.unit = 'kg';
        json_CP_MDis.TWSV.min = 0.00;
        json_CP_MDis.TWSV.max = 9999.99;
        json_CP_MDis.TWSV.value = (Value_CP_MDis_TWSV.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.TWPV = {}
        json_CP_MDis.TWPV.unit = 'kg';
        json_CP_MDis.TWPV.min = -99.99;
        json_CP_MDis.TWPV.max = 9999.99;
        json_CP_MDis.TWPV.value = (Value_CP_MDis_TWPV.value.value * 0.01).toFixed(2) * 1;
        json_CP_MDis.TWT = {}
        json_CP_MDis.TWT.unit = 'sec';
        json_CP_MDis.TWT.min = 0;
        json_CP_MDis.TWT.max = 9999;
        json_CP_MDis.TWT.value = Value_CP_MDis_TWT.value.value;
        const CP_MDis_Bit3 = binaryDigits(Value_CP_MDis_Bit3.value.value, 3);
        json_CP_MDis.APV = CP_MDis_Bit3[2];
        json_CP_MDis.EH = CP_MDis_Bit3[1];
        json_CP_MDis.OGV = CP_MDis_Bit3[0];

        let json_CP_LDis = {}
        let topic_CP_LDis = 'sfs.machine.powder.c.ldi1';
        json_CP_LDis.PWV = {}
        json_CP_LDis.PWV.unit = 'kg';
        json_CP_LDis.PWV.min = -99.99;
        json_CP_LDis.PWV.max = 9999.99;
        json_CP_LDis.PWV.value = (Value_CP_LDis_PWV.value.value * 0.01).toFixed(2) * 1;
        json_CP_LDis.ORPM = {}
        json_CP_LDis.ORPM.unit = 'RPM';
        json_CP_LDis.ORPM.min = 0;
        json_CP_LDis.ORPM.max = 15;
        json_CP_LDis.ORPM.value = Value_CP_LDis_ORPM.value.value;
        json_CP_LDis.SHWSV = {}
        json_CP_LDis.SHWSV.unit = 'kg';
        json_CP_LDis.SHWSV.min = 0.00;
        json_CP_LDis.SHWSV.max = 9999.99;
        json_CP_LDis.SHWSV.value = (Value_CP_LDis_SHWSV.value.value * 0.01).toFixed(2) * 1;
        json_CP_LDis.SHWPV = {}
        json_CP_LDis.SHWPV.unit = 'kg';
        json_CP_LDis.SHWPV.min = -99.99;
        json_CP_LDis.SHWPV.max = 9999.99;
        json_CP_LDis.SHWPV.value = (Value_CP_LDis_SHWPV.value.value * 0.01).toFixed(2) * 1;
        json_CP_LDis.SHWT = {}
        json_CP_LDis.SHWT.unit = 'sec';
        json_CP_LDis.SHWT.min = 0;
        json_CP_LDis.SHWT.max = 9999;
        json_CP_LDis.SHWT.value = Value_CP_LDis_SHWT.value.value;
        json_CP_LDis.TWSV = {}
        json_CP_LDis.TWSV.unit = 'kg';
        json_CP_LDis.TWSV.min = 0.00;
        json_CP_LDis.TWSV.max = 9999.99;
        json_CP_LDis.TWSV.value = (Value_CP_LDis_TWSV.value.value * 0.01).toFixed(2) * 1;
        json_CP_LDis.TWPV = {}
        json_CP_LDis.TWPV.unit = 'kg';
        json_CP_LDis.TWPV.min = -99.99;
        json_CP_LDis.TWPV.max = 9999.99;
        json_CP_LDis.TWPV.value = (Value_CP_LDis_TWPV.value.value * 0.01).toFixed(2) * 1;
        json_CP_LDis.TWT = {}
        json_CP_LDis.TWT.unit = 'sec';
        json_CP_LDis.TWT.min = 0;
        json_CP_LDis.TWT.max = 9999;
        json_CP_LDis.TWT.value = Value_CP_LDis_TWT.value.value;
        const CP_LDis_Bit3 = binaryDigits(Value_CP_LDis_Bit3.value.value, 3);
        json_CP_LDis.APV = CP_LDis_Bit3[2];
        json_CP_LDis.EH = CP_LDis_Bit3[1];
        json_CP_LDis.OGV = CP_LDis_Bit3[0];
        
        let json_CP_VC = {}
        let topic_CP_VC = 'sfs.machine.powder.c.vc1';
        const CP_AC_Bit5 = binaryDigits(Value_CP_VC_Bit5.value.value, 6);
        json_CP_VC.JCH = CP_AC_Bit5[5];
        json_CP_VC.DC = CP_AC_Bit5[4];
        json_CP_VC.VP = CP_AC_Bit5[3];
        json_CP_VC.VPBV = CP_AC_Bit5[2];
        json_CP_VC.VPCV = CP_AC_Bit5[1];
        json_CP_VC.VPEV = CP_AC_Bit5[0];
	json_CP_VC.Active = Value_CP_active.value.value;

	json_CP_DP.CMS_MMBID = {}
  	json_CP_DP.CMS_MMBID.bcr = Value_CMS_MMBCR_BCR.value.value;
  	json_CP_DP.CMS_MMBID.req = Value_CMS_MMBCR_REQ.value.value;
  	json_CP_DP.CMS_MMBID.code = Value_CMS_MMBCR_CODE.value.value;
  	json_CP_DP.CMS_MMBID.rep = Value_CMS_MMBCR_REP.value.value;
  	json_CP_DP.CBC_BINBCR = {}
  	json_CP_DP.CBC_BINBCR.bcr = Value_CBC_BINBCR_BCR.value.value;
  	json_CP_DP.CBC_BINBCR.req = Value_CBC_BINBCR_REQ.value.value;
  	json_CP_DP.CBC_BINBCR.code = Value_CBC_BINBCR_CODE.value.value;
  	json_CP_DP.CBC_BINBCR.rep = Value_CBC_BINBCR_REP.value.value;
  	json_CP_DP.CP_DP1BCR = {}
  	json_CP_DP.CP_DP1BCR.bcr = Value_CP_DP1BCR_BCR.value.value;
  	json_CP_DP.CP_DP1BCR.req = Value_CP_DP1BCR_REQ.value.value;
  	json_CP_DP.CP_DP1BCR.code = Value_CP_DP1BCR_CODE.value.value;
  	json_CP_DP.CP_DP1BCR.rep = Value_CP_DP1BCR_REP.value.value;
  	json_CP_DP.CP_DP2BCR = {}
  	json_CP_DP.CP_DP2BCR.bcr = Value_CP_DP2BCR_BCR.value.value;
 	json_CP_DP.CP_DP2BCR.req = Value_CP_DP2BCR_REQ.value.value;
 	json_CP_DP.CP_DP2BCR.code = Value_CP_DP2BCR_CODE.value.value;
 	json_CP_DP.CP_DP2BCR.rep = Value_CP_DP2BCR_REP.value.value;
 	json_CP_DP.CP_DPLBCR = {}
	json_CP_DP.CP_DPLBCR.bcr = Value_CP_DPLBCR_BCR.value.value;
	json_CP_DP.CP_DPLBCR.req = Value_CP_DPLBCR_REQ.value.value;
	json_CP_DP.CP_DPLBCR.code = Value_CP_DPLBCR_CODE.value.value;
	json_CP_DP.CP_DPLBCR.rep = Value_CP_DPLBCR_REP.value.value;

        // console.log(json_CNMP_NMP);
        // console.log(json_CBC_BMixer);
        // console.log(json_CBC_BST);
        // console.log(json_CBC_CNTST);
        // console.log(json_CMS_MMixer);
        // console.log(json_CMS_Slurry1);
        // console.log(json_CMS_Slurry2);
        // console.log(json_CP_DP);
        // console.log(json_CP_MS1);
        // console.log(json_CP_MS2);
        // console.log(json_CP_LS);
        // console.log(json_CP_MDis);
        // console.log(json_CP_LDis);
        // console.log(json_CP_VC);

        await sendKafkaMessage(topic_CNMP_NMP, json_CNMP_NMP);
        await sendKafkaMessage(topic_CBC_BMixer, json_CBC_BMixer);
        await sendKafkaMessage(topic_CBC_BST, json_CBC_BST);
        await sendKafkaMessage(topic_CBC_CNTST, json_CBC_CNTST);
        await sendKafkaMessage(topic_CMS_MMixer, json_CMS_MMixer);
        await sendKafkaMessage(topic_CMS_Slurry1, json_CMS_Slurry1);
        await sendKafkaMessage(topic_CMS_Slurry2, json_CMS_Slurry2);
        await sendKafkaMessage(topic_CP_DP, json_CP_DP);
        await sendKafkaMessage(topic_CP_MS1, json_CP_MS1);
        await sendKafkaMessage(topic_CP_MS2, json_CP_MS2);
        await sendKafkaMessage(topic_CP_LS, json_CP_LS);
        await sendKafkaMessage(topic_CP_MDis, json_CP_MDis);
        await sendKafkaMessage(topic_CP_LDis, json_CP_LDis);
        await sendKafkaMessage(topic_CP_VC, json_CP_VC);
        
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

	let redis_value = await redis_client.get('cathode_main');

        await collectAndSendData(session, redis_value);

        const run = async () => {
            while (true) {
		redis_value = await redis_client.get('cathode_main');
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
