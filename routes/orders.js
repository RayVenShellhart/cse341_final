const express = require('express');
const router = express.Router();

const Controller = require('../controllers/orders')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllOrders);

// router.get('/:id', gamesController.getSingle);

router.post('/', Controller.createOrder);

// router.put('/:id', validation., Controller.update)

// router.delete('/:id', Controller.delete);

module.exports = router;