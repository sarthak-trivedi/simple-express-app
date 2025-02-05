const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.static('public')); // Serve static files if needed

// Load configuration from external file
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const MONGO_URI = config.MONGO_URI || 'mongodb://localhost:27017/notes';
const API_ENDPOINT = config.API_ENDPOINT || 'https://api.github.com';

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Note = mongoose.model('Note', { text: String });

// Render HTML with dynamic data
app.get('/', async (req, res) => {
    try {
        // Fetch message from external API
        const response = await axios.get(API_ENDPOINT);
        const message = response.data.message;

        // Save message to MongoDB
        const note = new Note({ text: message });
        await note.save();

        // Fetch all saved messages
        const notes = await Note.find();

        res.render('index', { message, notes });
    } catch (error) {
        res.render('index', { message: 'Error fetching message', notes: [] });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
