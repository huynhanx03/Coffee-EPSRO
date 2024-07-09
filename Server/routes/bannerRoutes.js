const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');

router.get('/banners', bannerController.getBannersHandler);
router.post('/banner', bannerController.addBannerHandler);
router.delete('/banners/:bannerId', bannerController.deleteBannerHandler);
router.get('/banners/maxBannerId', bannerController.getMaxBannerIdHandler);

module.exports = router;