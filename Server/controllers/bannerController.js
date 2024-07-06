const db = require('../config/firebase')

const getBanners = async (req, res) => {
    try {
        const bannersSnapshot = await db.ref('Banner/').once('value')
        const banners = bannersSnapshot.val()

        bannersList = Object.values(banners)

        return res.status(200).json({ success: true, data: bannersList })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Lỗi server!' })
    }
}

module.exports = { getBanners }
