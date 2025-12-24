const Faculty = require('../models/Faculty');
const cloudinary = require('cloudinary').v2;

const createFaculty = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing '});
    }

    const { name, email, whatsappNumber, role } = req.body;
    try {
        const existingFaculty = await Faculty.findOne({ email });
        if(existingFaculty) {
            return res.status(409).json({ message: 'Faculty with this email already exists' });
        }

        if(!name || !email || !whatsappNumber || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if(!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newFaculty = new Faculty({
            name,
            email,
            whatsappNumber,
            role,
            image: {
                url: req.file.path,
                public_id: req.file.filename
            }
        });

        const savedFaculty = await newFaculty.save();
        res.status(201).json({ message: 'Faculty created successfully', faculty: savedFaculty });
    }
    catch (error) {
        console.error(`Error creating faculty: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.status(200).json({ faculties });
    }
    catch (error) {
        console.error(`Error fetching faculties: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if(!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        res.status(200).json({ faculty });
    }
    catch (error) {
        console.error(`Error fetching faculty: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateFaculty = async (req, res) => {
    const { name, email, whatsappNumber, role } = req.body;
    try {
        const faculty = await Faculty.findById(req.params.id);
        if(!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        if(req.file) {
            await cloudinary.uploader.destroy(faculty.image.public_id);
            faculty.image.url = req.file.path;
            faculty.image.public_id = req.file.filename;
        }

        faculty.name = name || faculty.name;
        faculty.email = email || faculty.email;
        faculty.whatsappNumber = whatsappNumber || faculty.whatsappNumber; 
        faculty.role = role || faculty.role

        const updatedFaculty = await faculty.save();
        res.status(200).json({ message: 'Faculty updated successfully', faculty: updatedFaculty });
    }
    catch (error) {
        console.error(`Error updating faculty: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if(!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        await cloudinary.uploader.destroy(faculty.image.public_id);
        await Faculty.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Faculty deleted successfully' })
    }
    catch (error) {
        console.error(`Error deleting faculty: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createFaculty,
    getAllFaculties,
    getFacultyById,
    updateFaculty,
    deleteFaculty,
}