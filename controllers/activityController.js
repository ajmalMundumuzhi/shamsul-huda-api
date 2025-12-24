const Activity = require('../models/Activity');
const cloudinary = require('cloudinary').v2;

const createActivity = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing '});
    }
    const { title, description } = req.body;
    try {
         console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);
        if(!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        if(!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newActivity = new Activity({
            title,
            description,
            image: {
                url: req.file.path,
                public_id: req.file.filename
            },
            createdAt: new Date(),
        })

        const savedActivity = await newActivity.save();
        res.status(201).json({ message: 'Activity created successfully', activity: savedActivity });
    }
    catch (error) {
        console.error(`Error while creating activity: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.status(200).json({ activities });
    }
    catch (error) {
        console.error(`Error while getting all activities: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if(!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.status(200).json({ activity });
    }
    catch (error) {
        console.error(`Error while getting activity by ID: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateActivity = async (req, res) => {
    const { title, description } = req.body;
    try {
        const activity = await Activity.findById(req.params.id);
        if(!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        if(req.file) {
            await cloudinary.uploader.destroy(activity.image.public_id);
            activity.image.url = req.file.path;
            activity.image.public_id = req.file.filename;
        }

        activity.title = title || activity.title;
        activity.description = description || activity.description;
        const updatedActivity = await activity.save();
        res.status(200).json({ message: 'Activity updated successfully', activity: updatedActivity });
    }
    catch (error) {
        console.error(`Error while updating activity: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if(!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }   
        await cloudinary.uploader.destroy(activity.image.public_id);
        await activity.deleteOne();
        res.status(200).json({ message: 'Activity deleted successfully' });
    }
    catch (error) {
        console.error(`Error while deleting activity: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity,
};