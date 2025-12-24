const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
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

const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;