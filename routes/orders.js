const express = require('express');
const router = express.Router();

const Controller = require('../controllers/orders')
const validation = require('../middleware/validate');


router.get('/', Controller.getAllOrders);

router.get('/:id', Controller.getSingleOrder);

router.post('/', validation.saveOrder, Controller.createOrder);

router.put('/:id', validation.saveOrder, Controller.updateOrder);

// router.delete('/:id', Controller.delete);

module.exports = router;