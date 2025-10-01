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

// GET SINGLE - Joel
const getSingleComment = async (req, res) => {
    //#swagger.tags=['Comments - Get Single']
    try {
        const commentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('comments').find({ _id: commentId });
        const comments = await result.toArray();
        
        if (comments.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve comment' });
    }
};

// PUT - Joel
const updateComment = async (req, res) => {
    //#swagger.tags=['Comments - Update Comment']
    try {
        const commentId = new ObjectId(req.params.id);
        const comment = {
            user_id: req.body.user_id,
            username: req.body.username,
            rating: req.body.rating,
            comment: req.body.comment,
            date_posted: req.body.date_posted
        };

        const response = await mongodb.getDatabase().collection('comments').replaceOne({ _id: commentId }, comment);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update comment' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
};

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
const deleteComment = async (req, res) => {
    //#swagger.tags=['Comments - Delete Comment']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid comment id to delete a comment.');
        }
        const commentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('comments').deleteOne({ _id: commentId });
        if (result.deletedCount > 0) {
            return res.status(201).json({ message: 'Comment deleted successfully', commentId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured deleting comment.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllComments,
    getSingleComment,
    updateComment,
    createComment,
    deleteComment
}