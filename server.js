// Core Express setup for the API.
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3001;

// Parse incoming JSON request bodies.
app.use(bodyParser.json());
// Enable CORS so any client can call the API.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Mount the main router.
app.use('/',require('./routes'));

// Only start the server once the database is ready.
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } 
    else {app.listen(port, () => {console.log(`Database is listening and Server is running on port ${port}`)});
    }
});

require('dotenv').config();