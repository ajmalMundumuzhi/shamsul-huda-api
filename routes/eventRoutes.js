const express = require('express');
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController')
const upload = require('../config/cloudinary');
const { route } = require('./facultyRoutes');
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllEvents, protect)
    .post(upload.single('image'), createEvent, protect)

router.route('/:id')
    .get(getEventById, protect)
    .put(upload.single('image'), updateEvent, protect)
    .delete(deleteEvent, protect)

module.exports = router