const express = require('express'); // bring in express
const router = express.Router(); // to use the express Router
// within our route we can add a second parameter as middleware
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User'); // import User model
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try{
        // Check if user exists
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }]})
        }
        // Get Users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d:'mm'
        })

        user = new User({ 
            name, 
            email, 
            avatar, 
            password
        });

        // Encrypt password using Bcrypt
        const salt = await bcrypt.genSalt(10);// Hashing.. create salt
        user.password = await bcrypt.hash(password, salt); // creates a hash and put into user password
        await user.save(); // Save user to db

        // Return jsonwebtoken b/c in the frontend we want user to get logged in right away and in order to be logged in, we need to have this token
        res.send('User registered');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;

