const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
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
}, { timestamps: true })

const Facility = mongoose.model('Facility', facultySchema);
module.exports = Facility;