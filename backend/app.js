const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { port, mongoUri } = require('./config');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/report');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Anything that doesn't match the above routes, send back the React index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
