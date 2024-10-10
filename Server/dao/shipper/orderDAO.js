const db = require('../../config/firebase');

const getOrdersDAO = async () => {
    try {
        const snapshot = await db.ref('DonHang').once('value');
        const orders = snapshot.val();

        if (!orders) {
            return { success: false, message: 'Không tìm thấy đơn hàng' };
        }

        const freeOrders = Object.values(orders).filter(order => order.MaNhanVien === "");

        return { success: true, data: freeOrders };
    } catch (error) {
        throw new Error('Lỗi server!')
    }   
}

const getOrdersByShipperDAO = async (shipperId) => {
    try {
        const snapshot = await db.ref('DonHang').orderByChild('MaNhanVien').equalTo(shipperId).once('value');
        const orders = snapshot.val();

        if (!orders) {
            return { success: false, message: 'Không tìm thấy đơn hàng' };
        }

        return { success: true, data: orders };
    } catch (error) {
        throw new Error('Lỗi server!')
    }
}

const getOrdersSuccessByShipperDAO = async (shipperId) => {
    try {
        const snapshot = await db.ref('DonHang').orderByChild('MaNhanVien').equalTo(shipperId).once('value');
        const orders = snapshot.val();

        if (!orders) {
            return { success: false, data: [] };
        }

        const successOrders = Object.values(orders).filter(order => order.TrangThai === 0);

        return { success: true, data: successOrders };
    } catch (error) {
        throw new Error('Lỗi server!')
    }
}

module.exports = {
    getOrdersDAO,
    getOrdersByShipperDAO,
    getOrdersSuccessByShipperDAO
}