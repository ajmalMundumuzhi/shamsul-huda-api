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
app.use(cors());
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