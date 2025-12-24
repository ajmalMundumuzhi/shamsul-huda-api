const express = require('express');
const router = express.Router();
const {
    getAllManagement,
    getManagementById,
    createManagement,
    updateManagement,
    deleteManagement,
} = require('../controllers/managementController');
const upload = require('../config/cloudinary');
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllManagement, protect)
    .post(upload.single('image'), createManagement, protect)

router.route('/:id')
    .get(getManagementById, protect)
    .put(upload.single('image'), updateManagement, protect)
    .delete(deleteManagement, protect)

module.exports = router;