const express = require('express');
const router = express.Router();
const Controller = require('../controllers/comments')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllComments);

router.get('/:id', Controller.getSingleComment);

router.post('/', validation.saveComment, Controller.createComment);

router.put('/:id', validation.saveComment, Controller.updateComment);

// router.delete('/:id', Controller.delete);

module.exports = router;