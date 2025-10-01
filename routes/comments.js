const express = require('express');
const router = express.Router();
const Controller = require('../controllers/comments')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllComments);

// router.get('/:id', gamesController.getSingle);

router.post('/', validation.saveComment, Controller.createComment);

// router.put('/:id', validation., Controller.update)

// router.delete('/:id', Controller.delete);

module.exports = router;