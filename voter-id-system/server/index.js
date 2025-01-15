const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const voterRoutes = require('./routes/voterRoutes'); // Assuming you will create this file for voter-related routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/voters', voterRoutes); // Adjust the route as necessary

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});