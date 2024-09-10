const db = require('../config/firebase');
const { binarySearchProduct } = require('../dsa/binarySearch');
const Constants = require('../utils/constants');

const getMaxBillSellId = async () => {
    try {
        const snapshot = await db.ref('HoaDon').once('value');
        const data = snapshot.val();

        if (data) {
            const maxBillSellId = Object.keys(data).reduce((max, current) => current > max ? current : max, "");
            return maxBillSellId;
        }

        return "";
    } catch (error) {
        console.error("Error getting max BillSell ID:", error);
        return "";
    }
};

const addBillSell = async (billSell) => {
    await db.ref(`HoaDon/${billSell.MaHoaDon}`).set(billSell);
};

const updateBillSell = async (billSell) => {
    await db.ref(`HoaDon/${billSell.MaHoaDon}`).update(billSell);
};

const deleteBillSell = async (billSellID) => {
    await db.ref(`HoaDon/${billSellID}`).remove();
};

const getBillSellByTableAndStatus = async (tableID, status) => {
    try {
        // Retrieve the bill by ID
        const billSnapshot = await db.ref('HoaDon').once('value');
        const billData = billSnapshot.val();

        if (!billData) throw new Error('Bill not found');

        var bill = Object.values(billData).find(b => b.TrangThai === status && b.MaBan === tableID)

        if (!bill)
            return null

        // Retrieve all products
        const productSnapshot = await db.ref('SanPham').once('value');
        const productsData = productSnapshot.val();
        const productsArray = Object.values(productsData);
        const productsSize = productsArray.length;

        // Map detail bill information with product details
        const listDetailBill = Object.values(bill.ChiTietHoaDon);

        listDetailBill.forEach(detailBill => {
            const index = binarySearchProduct(productsArray, productsSize, detailBill.MaSanPham);
            
            if (index !== 1) {
                const product = productsArray[index]

                detailBill.TenSanPham = product.TenSanPham;
                detailBill.DanhSachChiTietKichThuocSanPham = Object.values(product.ChiTietKichThuocSanPham);
                detailBill.SelectedProductSize = detailBill.DanhSachChiTietKichThuocSanPham.find(x => x.MaKichThuoc === detailBill.MaKichThuoc);
            }
        });

        bill.DanhSachChiTietHoaDon = listDetailBill;

        return bill;

    } catch (error) {
        console.error("Error searching bills:", error);
        throw error;
    }
};

const updateTableBooking = async (tableID, tableIDNew) => {
    try {
        const bill = await getBillSellByTableAndStatus(tableID, Constants.StatusBill.UNPAID);

        if (bill) {
            await db.ref(`HoaDon/${bill.MaHoaDon}`).update({ MaBan: tableIDNew });
            await db.ref(`Ban/${tableID}`).update({ TrangThai: Constants.StatusTable.FREE });
            await db.ref(`Ban/${tableIDNew}`).update({ TrangThai: Constants.StatusTable.BOOKED });
        }
        else {
            throw new Error("Không có hoá đơn")
        }
    } catch (error) {
        throw error
    }
};

const mergeTables = async (tableID, tableIDNew) => {
    try {
        const bill1 = await getBillSellByTableAndStatus(tableID, Constants.StatusBill.UNPAID);
        const bill2 = await getBillSellByTableAndStatus(tableIDNew, Constants.StatusBill.UNPAID);


        if (bill1 && bill2) {
            let list = [];

            for (let detailBill1 of detailBillList1) {
                let isFind = false;

                for (let detailBill2 of detailBillList2) {
                    if (detailBill2.MaSanPham === detailBill1.MaSanPham && detailBill2.MaKichThuoc === detailBill1.MaKichThuoc) {
                        detailBill2.SoLuong += detailBill1.SoLuong;
                        detailBill2.ThanhTien += detailBill1.ThanhTien;

                        isFind = true;
                        break;
                    }
                }

                if (!isFind) list.push(detailBill1);
            }

            // await deleteBillSell(bill1.MaHoaDon);

            return bill2
        } else {
            return null
        }
    } catch (error) {
        return null
    }
};

module.exports = {
    getMaxBillSellId,
    addBillSell,
    deleteBillSell,
    updateBillSell,
    getBillSellByTableAndStatus,
    updateTableBooking,
    mergeTables
};
