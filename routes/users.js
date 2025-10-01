const express = require('express');
const router = express.Router();

const Controller = require('../controllers/users')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllUsers);

// router.get('/:id', gamesController.getSingle);

router.post('/', Controller.createUser);

// router.put('/:id', validation., Controller.update)

// router.delete('/:id', Controller.delete);

module.exports = router;