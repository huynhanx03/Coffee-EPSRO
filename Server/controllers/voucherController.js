const db = require('../config/firebase');

const getVoucher = async (req, res) => {
    const userData = req.params.userId;
    try {
        const epochCurrent = new Date().getTime();
        const vouchersSnapshot = await db.ref(`PhieuGiamGia`).once('value')
        const vouchers = vouchersSnapshot.val();

        let vouchersList = [];
        Object.keys(vouchers).forEach(key => {
            vouchersList.push(vouchers[key]);
        });

        vouchersList = vouchersList.filter(voucher => Object.keys(voucher.ChiTiet).includes(userData));
        vouchersList = vouchersList.filter(voucher => voucher.ChiTiet[userData].TrangThai == 'Chưa sử dụng')
        vouchersList = vouchersList.filter(voucher => {
            const formattedExpiryDate = voucher.NgayHetHan.split('/').reverse().join('-');
            const expiredDate = new Date(formattedExpiryDate).getTime();

            return expiredDate + 61199000 >= epochCurrent;
            
        });

        return res.status(200).json({ success: true, data: vouchersList})
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

const updateVoucherUsed = async (req, res) => {
    try {
        const { voucherId, userId } = req.params

        const currentVoucher = await db.ref(`PhieuGiamGia/${voucherId}/ChiTiet/${userId}`).once('value');
        if (!currentVoucher.val()) {
            return res.status(404).json({ success: false, message: "Không tìm thấy voucher!" });
        }

        await db.ref(`PhieuGiamGia/${voucherId}/ChiTiet/${userId}`).update({ TrangThai: 'Đã sử dụng' });

        return res.status(200).json({ success: true, message: "Cập nhật voucher thành công!" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

module.exports = { getVoucher, updateVoucherUsed }