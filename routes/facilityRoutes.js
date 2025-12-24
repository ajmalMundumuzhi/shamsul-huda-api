const express = require('express');
const router = express.Router();
const {
    getAllFacilities,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility,
} = require('../controllers/facilityController')
const upload = require('../config/cloudinary');
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllFacilities, protect)
    .post(upload.single('image'), createFacility, protect)

router.route('/:id')
    .get(getFacilityById, protect)
    .put(upload.single('image'), updateFacility, protect)
    .delete(deleteFacility, protect)

module.exports = router;