const db = require('../config/firebase');

const getDiscountProducts = async () => {
    const productSnapshot = await db.ref('SanPham').once('value');
    const productData = productSnapshot.val();

    const result = Object.values(productData)
        .filter(product => product.PhanTramGiam > 0)
        .map(product => ({
            MaSanPham: product.MaSanPham,
            TenSanPham: product.TenSanPham,
            PhanTramGiam: product.PhanTramGiam
        }));

    return result;
};

const updateDiscountFromProduct = async (productID, value) => {
    await db.ref('SanPham/' + productID).update({ PhanTramGiam: value });
};

module.exports = {
    getDiscountProducts,
    updateDiscountFromProduct
};
