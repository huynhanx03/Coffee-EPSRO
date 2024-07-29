const db = require('../config/firebase');


const addCustomerRank = async (customerID, detailRank) => {
    await db.ref(`ChiTietMucDoThanThiet/${customerID}/ChiTiet/${detailRank.MaMucDoThanThiet}`).set(detailRank);
};

const addInitialCustomerRank = async (customerID) => {
    await db.ref(`ChiTietMucDoThanThiet/${customerID}`).update({ MaKhachHang: customerID });
};

const deleteDetailRank = async (userID) => {
    await db.ref(`ChiTietMucDoThanThiet/${userID}`).remove();
};

module.exports = {
    addCustomerRank,
    addInitialCustomerRank,
    deleteDetailRank
};