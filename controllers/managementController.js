const Management = require('../models/Management');
const cloudinary = require('cloudinary').v2;

const createManagement = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing '});
    }

    const { name, email, whatsappNumber, role } = req.body;
    try {
        const existingManagement = await Management.findOne({ email });
        if(existingManagement) {
            return res.status(409).json({ message: 'Management with this email already exists' });
        }
        if(!name || !email || !whatsappNumber || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const newManagement = new Management({
            name,
            email,
            whatsappNumber,
            role,
            image: {
                url: req.file.path,
                public_id: req.file.filename
            },
        })

        const savedManagement = await newManagement.save();
        res.status(201).json({ message: 'Management created successfully', management: savedManagement });
    }
    catch (error) {
        console.error(`Error while adding management: ${error.message}`);
        res.status(500).json({message: 'Internal server error'})
    }
}

const getAllManagement = async (req, res) => {
    try {
        const managements = await Management.find();
        res.status(200).json({ managements });
    }
    catch (error) {
        console.error(`Error while get all management details: ${error.message}`);
        res.status(500).json({ message: 'Internal server error'});
    }
}

const getManagementById = async (req, res) => {
    try {
        const management = await Management.findById(req.params.id);
        if(!management) {
            return res.status(404).json({ message: 'Management not found'});
        }
        res.status(200).json({ management });
    }
    catch (error) {
        console.error(`Error while get management details by ID: ${error.message}`)
        res.status(500).json({ message: 'Internal server error'});
    }
}

const updateManagement = async (req, res) => {
    const { name, email, whatsappNumber, role } = req.body;
    try {
        const management = await Management.findById(req.params.id);
        if(!management) {
            return res.status(404).json({ message: 'Management not found'});
        }

        if(req.file) {
            await cloudinary.uploader.destroy(management.image.public_id);
            management.image.url = req.file.path;
            management.image.public_id = req.file.filename;            
        }

        management.name = name || management.name;
        management.email = email || management.email;
        management.whatsappNumber = whatsappNumber || management.whatsappNumber;
        management.role = role || management.role;

        const updatedManagement = await management.save();
        res.status(200).json({ message: 'Management updated successfully', management: updatedManagement });
    }
    catch (error) {
        console.error(`Error while update management details: ${error.message}`);
        res.status(500).json({ message: 'Internal server error'});
    }
}

const deleteManagement = async (req, res) => {
    try {
        const management = await Management.findById(req.params.id);
        if(!management) {
            return res.status(404).json({ message: 'Management not found'});
        }
        await cloudinary.uploader.destroy(management.image.public_id);
        await management.deleteOne();
        res.status(200).json({ message: 'Management deleted successfully' });
    }
    catch (error) {
        console.error(`Error while delete management: ${error.message}`);
        res.status(500).json({ message: 'Internal server error'});
    }
}

module.exports = {
    createManagement,
    getAllManagement,
    getManagementById,
    updateManagement,
    deleteManagement,
}