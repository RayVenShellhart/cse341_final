const express = require('express');
const router = express.Router();

const Controller = require('../controllers/orders')
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', Controller.getAllOrders);

// router.get('/:id', Controller.getSingle);

router.post('/', isAuthenticated ,validation.saveOrder, Controller.createOrder);

// router.put('/:id', isAuthenticated ,validation., Controller.update)

router.delete('/:id', isAuthenticated ,Controller.deleteOrder);

module.exports = router;