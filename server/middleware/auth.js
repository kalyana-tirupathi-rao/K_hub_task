const jwt = require('jsonwebtoken');
const User = require('../model/user');

const JWT_SECRET = 'your_jwt_secret'; // Replace with the same secret key used in authRoutes.js

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = auth;