// Core Express setup for the API.
require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3001;

// Parse incoming JSON request bodies.
app.use(express.json());

// Enable CORS so any client can call the API.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Mount the main router.
app.use('/', require('./routes'));

// Fallback for any route that does not exist.
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});

// Central error handler so no request can take the process down.
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
});

// Only start the server once the database is ready.
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and Server is running on port ${port}`);
        });
    }
});
