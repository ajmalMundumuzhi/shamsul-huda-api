const Banner = require('../models/Banner');
const cloudinary = require('cloudinary').v2;

const createBanner = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const newBanner = new Banner({
            image: {
                url: req.file.path,
                public_id: req.file.filename
            },
            createdAt: new Date(),
        })
        const savedBanner = await newBanner.save();
        res.status(201).json({ message: 'Banner created successfully', banner: savedBanner });
    }
    catch (error) {
        console.error(`Error while creating banner: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({ banners });
    }
    catch (error) {
        console.error(`Error while getting all banners: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getBannerById = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if(!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json({ banner });
    }
    catch (error) {
        console.error(`Error while getting banner by ID: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);

        if(req.file) {
            await cloudinary.uploader.destroy(banner.image.public_id);
            banner.image.url = req.file.path;
            banner.image.public_id = req.file.filename;
        }

        const updatedBanner = await banner.save(); 
        res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
    }
    catch (error) {
        console.error(`Error while updating banner: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if(!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        await cloudinary.uploader.destroy(banner.image.public_id);
        await banner.deleteOne();
        res.status(200).json({ message: 'Banner deleted successfully' });
    }
    catch (error) {
        console.error(`Error while deleting banner: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createBanner,
    getAllBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
};