const express = require('express');
const router = express.Router();

const Controller = require('../controllers/products')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', Controller.getAllProducts);

// router.get('/:id', gamesController.getSingle);

router.post('/', isAuthenticated ,validation.saveProduct, Controller.createProduct);

// router.put('/:id', isAuthenticated ,validation., Controller.update)

router.delete('/:id', isAuthenticated ,Controller.deleteProduct);

module.exports = router;