const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    whatsappNumber: {
        type: String,
        required: true,
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Management = mongoose.model('Management', facultySchema);
module.exports = Management;