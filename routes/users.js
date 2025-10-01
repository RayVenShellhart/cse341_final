const express = require('express');
const router = express.Router();

const Controller = require('../controllers/users')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', Controller.getAllUsers);

router.get('/:id', Controller.getSingleUser);

router.post('/', isAuthenticated, validation.saveUser, Controller.createUser);

router.put('/:id', isAuthenticated, validation.saveUser, Controller.updateUser);

router.delete('/:id', isAuthenticated, Controller.deleteUser);

module.exports = router;