const express = require('express');
const router = express.Router();
const Controller = require('../controllers/comments')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', Controller.getAllComments);

router.get('/:id', Controller.getSingleComment);

router.post('/', isAuthenticated, validation.saveComment, Controller.createComment);

router.put('/:id', isAuthenticated, validation.saveComment, Controller.updateComment);

router.delete('/:id', isAuthenticated, Controller.deleteComment);

module.exports = router;