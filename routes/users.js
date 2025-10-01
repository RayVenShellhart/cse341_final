const express = require('express');
const router = express.Router();

const Controller = require('../controllers/users')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllUsers);

router.get('/:id', Controller.getSingleUser);

router.post('/', validation.saveUser, Controller.createUser);

router.put('/:id', validation.saveUser, Controller.updateUser);

// router.delete('/:id', Controller.delete);

module.exports = router;