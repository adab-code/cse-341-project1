const router = require('express').Router();

// Serve Swagger docs and the contact routes from here.
router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    /*
    #swagger.tags = ['Home']
    #swagger.summary = 'Welcome message'
    #swagger.description = 'Base route of the Contacts API. Use /contacts for the CRUD endpoints.'
    #swagger.produces['text/plain'] = { example: 'Welcome to the Contacts API!' }
    #swagger.responses[200] = { description: 'OK - Returns a welcome message.' }
    */
    res.send('Welcome to the Contacts API!');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
