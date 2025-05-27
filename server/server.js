// server/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Add some initial data
const Service = require('./models/Service');
const seedData = async () => {
  try {
    const count = await Service.countDocuments();
    if (count === 0) {
      await Service.create([
        {
          title: 'Community Cleanup',
          description: 'Help clean up our local parks and streets.',
          location: 'Downtown Community Park',
          date: '2025-04-15'
        },
        {
          title: 'Food Drive',
          description: 'Collect and distribute food to those in need.',
          location: 'Community Center',
          date: '2025-04-20'
        },
        {
          title: 'Senior Home Visit',
          description: 'Spend time with elderly residents at the local senior home.',
          location: 'Sunshine Senior Living',
          date: '2025-04-25'
        },
        {
          title: 'Tree Planting',
          description: 'Help plant trees in our community to improve air quality.',
          location: 'City Park',
          date: '2025-05-01'
        }
      ]);
      console.log('Sample services added');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));