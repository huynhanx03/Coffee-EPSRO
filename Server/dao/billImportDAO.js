const db = require('../config/firebase');

const getMaxBillImportId = async () => {
    try {
        const snapshot = await db.ref('PhieuNhapKho').once('value');
        const data = snapshot.val();

        if (data) {
            const maxBillImportId = Object.keys(data).reduce((max, current) => current > max ? current : max, "");
            return maxBillImportId;
        }

        return "";
    } catch (error) {
        console.error("Error getting max BillImport ID:", error);
        return "";
    }
};

const addBillImport = async (billImport) => {
    await db.ref(`PhieuNhapKho/${billImport.MaPhieuNhapKho}`).set(billImport);
};

const deleteBillImport = async (billImportID) => {
    await db.ref(`PhieuNhapKho/${billImportID}`).remove();
};

module.exports = {
    getMaxBillImportId,
    addBillImport,
    deleteBillImport
};