const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const Programme = mongoose.model('Activity', activitySchema);
module.exports = Programme;