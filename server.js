const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const managementRoutes = require('./routes/managementRoutes');
const eventRoutes = require('./routes/eventRoutes');
const activityRoutes = require('./routes/activityRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const facilityRoutes = require('./routes/facilityRoutes');

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://shamsulhuda-admin.netlify.app',
    'https://shamsulhuda-web.netlify.app',
    'https://shamsulhuda.in',
    
]

app.use(cors({
    origin: function (origin, callback) {
        if(!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes 
app.use('/api/admin', authRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/management', managementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/facilities', facilityRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})