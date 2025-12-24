const express = require('express');
const router = express.Router();
const {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity,
} = require('../controllers/activityController')
const upload = require('../config/cloudinary');
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllActivities, protect)
    .post(upload.single('image'), createActivity, protect)

router.route('/:id')
    .get(getActivityById, protect)
    .put(upload.single('image'), updateActivity, protect)
    .delete(deleteActivity, protect)

module.exports = router;