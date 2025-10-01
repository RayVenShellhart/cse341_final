const express = require('express');
const router = express.Router();
const Controller = require('../controllers/comments')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', Controller.getAllComments);

// router.get('/:id', gamesController.getSingle);

router.post('/', isAuthenticated , validation.saveComment, Controller.createComment);

// router.put('/:id', isAuthenticated ,validation., Controller.update)

router.delete('/:id', isAuthenticated , Controller.deleteComment);

module.exports = router;