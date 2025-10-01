const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllComments = async (req, res) => {
    //#swagger.tags=['Comments - Get All']
    const result = await mongodb.getDatabase().collection('comments').find();
    result.toArray().then((comments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments);
    });
};

// GET SINGLE - RayVen

// PUT - RayVen

// POST - Rebecca
const createComment = async (req, res) => {
    //#swagger.tags=['Comments - Create Comment']
    try {
        if (!req.body.comment) {
            return res.status(400).json({ message: 'Missing required fields: comment is required.' });
        }

        const comment = {
            user_id: req.body.user_id,
            username: req.body.username,
            rating: req.body.rating,
            comment: req.body.comment,
            date_posted: req.body.date_posted
        };

        const result = await mongodb.getDatabase().collection('comments').insertOne(comment);
        if (result.acknowledged) {
            return res.status(201).json({ message: 'Comment created successfully', commentId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured creating comment.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE - Rebecca

module.exports = {
    getAllComments,
    createComment
}