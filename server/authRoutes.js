const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model/user');

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret key

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'Signup successful. You can now login to your account.' });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);
        res.json({ message: 'Login successful', token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;