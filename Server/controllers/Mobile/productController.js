const db = require('../../config/firebase');

const getCategories = async (req, res) => {
    try {
        const snapshot = await db.ref('LoaiSanPham/').once('value');
        const categories = snapshot.val();

        return res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

const getProducts = async (req, res) => {
    try {
        const snapshot = await db.ref('SanPham/').once('value');
        const products = snapshot.val();

        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const snapshot = await db.ref('SanPham/' + productId).once('value');
        const product = snapshot.val();

        return res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

const getProductsSale = async (req, res) => {
    try {
        const productsSaleSnapshot = await db.ref('SanPhamGiamGiaHomNay/').once('value');
        const productsSale = productsSaleSnapshot.val();

        return res.status(200).json({ success: true, data: productsSale });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

const getProductsBestSeller = async (req, res) => {
    try {
        const billsSnapshot = await db.ref('HoaDon/').once('value');
        const bills = billsSnapshot.val();

        const products = Object.values(bills).reduce((acc, bill) => {
            const products = Object.values(bill.ChiTietHoaDon).map(product => {
                return {
                    MaSanPham: product.MaSanPham,
                    SoLuong: product.SoLuong
                }
            });


            return [...acc, ...products];
        }, []);

        const totalSold = {}

        products.map((product) => {
            if (totalSold[product.MaSanPham]) {
                totalSold[product.MaSanPham] += product.SoLuong;
            } else {
                totalSold[product.MaSanPham] = product.SoLuong;
            }
        })

        const sortObj = Object.fromEntries(
            Object.entries(totalSold).sort(([,a],[,b]) => b-a)
        )

        return res.status(200).json({ success: true, data: Object.keys(sortObj) });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server!" });
    }
}

module.exports = {
    getCategories,
    getProducts,
    getProductById,
    getProductsSale,
    getProductsBestSeller,
}