const express = require('express');
const router = express.Router();

const {
    createFaculty,
    getAllFaculties,
    getFacultyById,
    updateFaculty,
    deleteFaculty,
} = require('../controllers/facultyController');
const upload = require('../config/cloudinary');
const protect = require('../middleware/authMiddleware')

router.route('/')
    .get(getAllFaculties, protect)
    .post(upload.single('image'), createFaculty, protect)

router.route('/:id')
    .get(getFacultyById, protect)
    .put(upload.single('image'), updateFaculty, protect)
    .delete(deleteFaculty, protect)  

module.exports = router;