const express = require('express');
const router = express.Router(); 

const Controller = require('../controllers/')
const validation = require('../middleware/validate');


// router.get('/', Controller.getAll);

// router.get('/:id', gamesController.getSingle);

// router.post('/',  validation., Controller.create);

// router.put('/:id', validation., Controller.update)

// router.delete('/:id', Controller.delete);

module.exports = router;