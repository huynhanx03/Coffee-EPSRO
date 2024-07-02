const db = require('../../config/firebase');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const getNewId = async () => {
    try {
        const userRef = db.ref('KhachHang/');
        const snapshot = await userRef.once('value');
        const users = snapshot.val();
        if (users) {
            const currentId = parseInt(Object.keys(users)[Object.keys(users).length - 1].slice(2));
            const newId = 'KH' + String(currentId + 1).padStart(4, '0');
            return newId;
        } else {
            return 'KH0001';
        }
    } catch (error) {}
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newId = await getNewId();
        const currentTime = new Date();
        const dateCreated = currentTime.toLocaleDateString('vi-VN');
        await db.ref('NguoiDung/' + newId).set({
            TaiKhoan: username,
            Email: email,
            MatKhau: password,
            VaiTro: '2',
            CCCD_CMND: '',
            DiaChi: '',
            GioiTinh: '',
            HoTen: '',
            MaNguoiDung: newId,
            NgayTao: dateCreated,
            SoDienThoai: '',
            HinhAnh: '',
            NgaySinh: '',
        });

        await db.ref('KhachHang/' + newId).set({
            DiemTichLuy: 0,
            MaKhachHang: newId,
        });

        await db.ref('ChiTietMucDoThanThiet/' + newId).set({
            MaKhachHang: newId,
            ChiTiet: {
                TT0001: {
                    MaMucDoThanThiet: 'TT0001',
                    NgayDatDuoc: dateCreated
                }
            }
        
        })

        return res.status(200).json({ success: true, message: 'Đăng ký thành công!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Đăng ký thất bại!" });
    }
};

const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const snapshot = await db.ref('NguoiDung/').orderByChild('TaiKhoan').equalTo(username).once('value');
        const userData = snapshot.val();

        if (!userData) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        if (password != userData[Object.keys(userData)[0]].MatKhau) {
            return res.status(401).json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
        }

        const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '20s' });

        return res.status(200).json({ success: true, token, data: userData[Object.keys(userData)[0]] });
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const snapshot = await db.ref('NguoiDung/' + userId).once('value');
        const userData = snapshot.val();

        if (!userData) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        return res.status(200).json({ success: true, data: userData });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    getUserById
};
