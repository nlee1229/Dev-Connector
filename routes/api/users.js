const express = require('express'); // bring in express
const router = express.Router(); // to use the express Router

// create a route
router.get('/', (req, res) => res.send('User route'));

module.exports = router;

