const Facility = require('../models/Facility');
const cloudinary = require('cloudinary').v2;


const createFacility = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing '});
    }

    const { title, description  } = req.body;
    try {
        if(!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        if(!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newFacility = new Facility({
            title,
            description,
            image: {
                url: req.file.path,
                public_id: req.file.filename,
            },
            createdAt: new Date(),
        })

        const savedFacility = await newFacility.save();
        res.status(201).json({ message: 'Facility created successfully', facility: savedFacility });
    }
    catch (error) {
        console.error(`Error while creating facility: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllFacilities = async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.status(200).json({ facilities });
    }
    catch (error) {
        console.error(`Error while getting all facilities: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getFacilityById = async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        if(!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.status(200).json({ facility });
    }
    catch (error) {
        console.error(`Error while getting facility by ID: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateFacility = async (req, res) => {
    const { title, description } = req.body;
    try {
        const facility = await Facility.findById(req.params.id);
        if(!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        if(req.file) {
            await cloudinary.uploader.destroy(facility.image.public_id);
            facility.image.url = req.file.path;
            facility.image.public_id = req.file.filename;            
        }

        facility.title = title || facility.title;
        facility.description = description || facility.description;

        const updatedFacility = await facility.save();
        res.status(200).json({ message: 'Facility updated successfully', facility: updatedFacility });
    }
    catch (error) {
        console.error(`Error while updating facility: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteFacility = async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        if(!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        await cloudinary.uploader.destroy(facility.image.public_id);
        await facility.deleteOne();
        res.status(200).json({ message: 'Facility deleted successfully' });
    }
    catch (error) {
        console.error(`Error while deleting facility: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

module.exports = {
    createFacility,
    getAllFacilities,
    getFacilityById,
    updateFacility,
    deleteFacility
};