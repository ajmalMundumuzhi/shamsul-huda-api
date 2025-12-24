const Event = require('../models/Event');
const cloudinary = require('cloudinary').v2;

const createEvent = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing '});
    }

    const {title, description} = req.body;
    try {
        if(!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        if(!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const newEvent = new Event({
            title,
            description,
            image: {
                url: req.file.path,
                public_id: req.file.filename,
            },
            createdAt: new Date(),
        })
        const savedEvent = await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    }
    catch (error) {
        console.error(`Error while creating event: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    }
    catch (error) {
        console.error(`Error while getting all events: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ event });
    }
    catch (error) {
        console.error(`Error while getting event by ID: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateEvent = async (req, res) => {
    const { title, description } = req.body;
    try {
        const event = await Event.findById(req.params.id);
        if(!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if(req.file) {
            await cloudinary.uploader.destroy(event.image.public_id);
            event.image.url = req.file.path;
            event.image.public_id = req.file.filename;            
        }

        event.title = title || event.title;
        event.description = description || event.description;
        const updatedEvent = await event.save();
        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    }
    catch (error) {
        console.error(`Error while updating event: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await cloudinary.uploader.destroy(event.image.public_id);
        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(`Error while deleting event: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }  
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};