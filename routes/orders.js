const express = require('express');
const router = express.Router();

const Controller = require('../controllers/orders')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', Controller.getAllOrders);

router.get('/:id', Controller.getSingleOrder);

router.post('/', isAuthenticated ,validation.saveOrder, Controller.createOrder);

router.put('/:id', validation.saveOrder, Controller.updateOrder);

router.delete('/:id', isAuthenticated ,Controller.deleteOrder);

module.exports = router;