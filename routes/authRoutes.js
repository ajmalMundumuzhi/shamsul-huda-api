const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
} = require('../controllers/authController');
const upload = require('../config/cloudinary');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(getAllAdmins)

router.post('/register', protect, registerAdmin)
router.post('/login',loginAdmin)

module.exports = router;