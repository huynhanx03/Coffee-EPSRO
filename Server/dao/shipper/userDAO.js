const db = require('../../config/firebase');

const shipperLoginDAO = async (username, password) => {
    try {
        const snapshot = await db.ref('NguoiDung').orderByChild('TaiKhoan').equalTo(username).once('value');
        const userData = snapshot.val();

        if (!userData || userData[Object.keys(userData)[0]].VaiTro !== 3) {
            return { success: false, message: 'Không tìm thấy người dùng' };
        }

        if (password !== userData[Object.keys(userData)[0]].MatKhau) {
            return { success: false, message: 'Sai tài khoản hoặc mật khẩu' };
        }

        const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '5h' });

        return { success: true, token, data: userData[Object.keys(userData)[0]] };

    } catch (error) {
        throw new Error('Lỗi server!')
    }
}

const getProfitByShipperDAO = async (shipperId) => {
    try {
        if (!shipperId) {
            return { success: false, message: 'Không tìm thấy mã shipper' };
        }

        const snapshot = await db.ref('DonHang').orderByChild('MaNhanVien').equalTo(shipperId).once('value');
        const profits = snapshot.val();

        if (!profits) {
            return { success: true, data: [] };
        }

        const profitAndDay = Object.keys(profits).map(key => {
            return {
                Ngay: profits[key].Ngay,
                DoanhThu: profits[key].PhiVanChuyen
            }
        })

        return { success: true, data: profitAndDay };
    } catch (error) {
        throw new Error('Lỗi server!')
    }
}

const setStatusShipperDAO = async (shipperId, status) => {
    try {
        const snapshot = await db.ref('NhanVien').orderByChild('MaNhanVien').equalTo(shipperId).once('value');
        const shipperData = snapshot.val();

        console.log(shipperData[Object.keys(shipperData)[0]].MaChucVu);

        if (!shipperData || shipperData[Object.keys(shipperData)[0]].MaChucVu != "CD0004") {
            throw new Error('Không tìm thấy mã shipper');
        }

        await db.ref('NhanVien/' + shipperId).update({
            TrangThai: status,
        })

        return { success: true, message: 'Cập nhật trạng thái thành công' };
    } catch (error) {
        if (error.message === 'Không tìm thấy mã shipper') {
            throw new Error(error.message)
        }
        throw new Error('Lỗi server!')
    }
}

module.exports = {
    shipperLoginDAO,
    getProfitByShipperDAO,
    setStatusShipperDAO
}