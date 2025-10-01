const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllUsers = async (req, res) => {
    //#swagger.tags=['Users - Get All']
    const result = await mongodb.getDatabase().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

// GET SINGLE - RayVen

// PUT - RayVen

// POST - Rebecca
const createUser = async (req, res) => {
    //#swagger.tags=['Users - Create User']
    try {
        if (!req.body.user) {
            return res.status(400).json({ message: 'Missing required fields: user is required.' });
        }

        const user = {
            user_id: req.body.user_id,
            username: req.body.username,
            join_date: req.body.join_date,
            location: req.body.location,
            bio: req.body.bio
        };

        const result = await mongodb.getDatabase().collection('users').insertOne(user);
        if (result.acknowledged) {
            return res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured creating user.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE - Rebecca

module.exports = {
    getAllUsers,
    createUser
}