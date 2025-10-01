const express = require('express');
const router = express.Router();

const Controller = require('../controllers/products')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllProducts);

// router.get('/:id', gamesController.getSingle);

router.post('/', validation.saveProduct, Controller.createProduct);

// router.put('/:id', validation., Controller.update)

// router.delete('/:id', Controller.delete);

module.exports = router;