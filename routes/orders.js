const express = require('express');
const router = express.Router();

const Controller = require('../controllers/orders')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllOrders);

// router.get('/:id', gamesController.getSingle);

router.post('/', validation.saveOrder, Controller.createOrder);

// router.put('/:id', validation., Controller.update)

router.delete('/:id', Controller.deleteOrder);

module.exports = router;