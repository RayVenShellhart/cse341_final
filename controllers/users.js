const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllUsers = async (req, res) => {
    try {
    //#swagger.tags=['Users - Get All']
    const result = await mongodb.getDatabase().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Error fetching list'})
    }
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
  const user = {
    user_id: req.body.user_id,
    username: req.body.username,
    join_date: req.body.join_date,
    location: req.body.location,
    bio: req.body.bio
  };

  try {
    const response = await mongodb
      .getDatabase()
      .collection('users')
      .insertOne(user);

    if (response.acknowledged) {
      return res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create User' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error creating User' });
  }
};

// DELETE - Rebecca
const deleteUser = async (req, res) => {
    //#swagger.tags=['Users - Delete User']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid user id to delete a user.');
        }
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('users').deleteOne({ _id: userId });
        if (result.deletedCount > 0) {
            return res.status(201).json({ message: 'User deleted successfully', userId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured deleting user.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    createUser,
    deleteUser
}