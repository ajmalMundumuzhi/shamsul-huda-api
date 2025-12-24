const express = require('express');
const router = express.Router();
const {
    getAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
} = require('../controllers/bannerController')
const upload = require('../config/cloudinary');
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllBanners, protect)
    .post(upload.single('image'), createBanner, protect)

router.route('/:id')   
    .get(getBannerById, protect)
    .put(upload.single('image'), updateBanner, protect)
    .delete(deleteBanner, protect)

module.exports = router