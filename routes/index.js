const router = require('express').Router();

// Serve Swagger docs and the user routes from here.
router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags['Home']
    res.send('Welcome to the home page!');
});
// router.get('/', (req, res) => {res.send('Welcome to the home page!')});

router.use('/users', require('./users'));

module.exports = router;
