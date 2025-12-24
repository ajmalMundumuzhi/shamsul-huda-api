const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

const getAllAdmins = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    }
    catch (error) {
        console.error(`Error while get all admin details ${error.message}`);
        res.status(500).json({message: 'Internal server error'})
    }
}

const registerAdmin = async (req, res) => {
    const { username, name, password } = req.body;
    try {
        if(!username || !name || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await Admin.findOne({ username });
        if(existingAdmin) {
            return res.status(409).json({ message: 'Admin with this username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            name,
            password: hashedPassword,
        })

        await newAdmin.save();
        
        if(newAdmin) {
            res.status(201).json({ 
                _id: newAdmin._id,
                username: newAdmin.username,
                name: newAdmin.name,
                token: generateToken(newAdmin._id),
             })
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    }
    catch (error) {
        console.error(`Error while registering admin: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if(admin && (await bcrypt.compare(password, admin.password))) {
            res.status(200).json({
                _id: admin._id,
                username: admin.username,
                name: admin.name,
                token: generateToken(admin._id),
            })
        } else {
            res.status(401).json({ message: 'Invalid username or password.' })
        }
    }
    catch (error) {
        console.error(`Error while logging in admin: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAllAdmins,
}