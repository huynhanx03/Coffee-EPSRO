const db = require('../../config/firebase')

const getAllUserChatDAO = async (shipperId) => {
    try {
        const snapshot = await db.ref('chat').once('value')
        const allUserChat = snapshot.val()

        const allUserChatArray = Object.keys(allUserChat).filter(key => allUserChat[key].MaNhanVien === shipperId)

        return allUserChatArray
    } catch (error) {
        throw new Error('Lỗi server!')
    }
}

const makeChatDAO = async (shipperId, userId) => {
    try {
        const snapshot = await db.ref('chat').once('value')
        const allUserChat = snapshot.val()

        const allUserChatArray = Object.keys(allUserChat).filter(key => allUserChat[key].MaNhanVien === shipperId && allUserChat[key].MaKhachHang === userId)

        if (allUserChatArray.length === 0) {
            await db.ref('TinNhan/' + shipperId + '-' + userId).set({
                MaNhanVien: shipperId,
                MaKhachHang: userId,
                User: {
                    MaKhachHang: userId,
                    HinhAnh: '',
                    HoTen: '',
                }
            })
        }
    } catch (error) {
        throw new Error('Lỗi server!')
    }
}

module.exports = { getAllUserChatDAO, makeChatDAO }