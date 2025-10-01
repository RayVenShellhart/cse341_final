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

// GET SINGLE - Joel
const getSingleUser = async (req, res) => {
    //#swagger.tags=['Users - Get Single']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('users').find({ _id: userId });
        const users = await result.toArray();
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

// PUT - Joel
const updateUser = async (req, res) => {
    //#swagger.tags=['Users - Update User']
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            user_id: req.body.user_id,
            username: req.body.username,
            join_date: req.body.join_date,
            location: req.body.location,
            bio: req.body.bio
        };

        const response = await mongodb.getDatabase().collection('users').replaceOne({ _id: userId }, user);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

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
    getSingleUser,
    updateUser,
    createUser
}