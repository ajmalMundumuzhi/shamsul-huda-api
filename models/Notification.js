const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;