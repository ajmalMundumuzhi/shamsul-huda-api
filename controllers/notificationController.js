const Notification = require('../models/Notification');
const cloudinary = require('cloudinary').v2;

const createNotification = async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body is missing '});
    }
    const { message } = req.body;
    try {
        if(!message) {
            return res.status(400).json({message: 'Message is required.'})
        }

        const newNotification = new Notification({
            message,
            createdAt: new Date(),
        })

        const savedNotification = await newNotification.save();
        res.status(201).json({ message: 'Notification created successfully.', notification: savedNotification})
    }
    catch (error) {
        console.error(`Error while creating notification: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json({ notifications });
    }
    catch (error) {
        console.error(`Error while getting all notifications: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
        if(!notification) {
            return res.status(404).json({ message: "Notification not found."})
        }

        res.status(200).json(notification);
    }
    catch (error) {
        console.error(`Error while getting notification by ID: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateNotification = async (req, res) => {
    const { message } = req.body;
    try {
        const notification = await Notification.findById(req.params.id)
        if(!notification) {
            return res.status(404).json({ message: "Notification not found."})
        }

        notification.message = message || notification.message
        const updatedNotification = await notification.save();
        res.status(200).json({message: 'Notification updated successfully.', notification: updatedNotification});
    }
    catch (error) {
        console.error(`Error while updating notification: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id)
        if(!notification) {
            return res.status(404).json({ message: "Notification not found."})
        }

        await notification.deleteOne();
        res.status(200).json({message: 'Notification deleted successfully.'})
    }
    catch (error) {
        console.error(`Error while deleting notification: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
}