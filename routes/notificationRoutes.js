const express = require('express')
const router = express.Router();
const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
} = require('../controllers/notificationController');
const upload = require('../config/cloudinary')
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllNotifications, protect)
    .post(upload.single('image'), createNotification, protect)

router.route('/:id')
    .get(getNotificationById, protect)
    .put(upload.single('image'), updateNotification, protect)
    .delete(deleteNotification, protect)

module.exports = router;