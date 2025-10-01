const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllOrders = async (req, res) => {
    //#swagger.tags=['Orders - Get All']
    const result = await mongodb.getDatabase().collection('orders').find();
    result.toArray().then((orders) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders);
    });
};

// GET SINGLE - Joel
const getSingleOrder = async (req, res) => {
    //#swagger.tags=['Orders - Get Single']
    try {
        const orderId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('orders').find({ _id: orderId });
        const orders = await result.toArray();
        
        if (orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(orders[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
};

// PUT - Joel
const updateOrder = async (req, res) => {
    //#swagger.tags=['Orders - Update Order']
    try {
        const orderId = new ObjectId(req.params.id);
        const order = {
            order_id: req.body.order_id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            order_date: req.body.order_date,
            status: req.body.status
        };

        const response = await mongodb.getDatabase().collection('orders').replaceOne({ _id: orderId }, order);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Order updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update order' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// POST - Rebecca
const createOrder = async (req, res) => {
    //#swagger.tags=['Orders - Create Order']
    try {
        if (!req.body.order) {
            return res.status(400).json({ message: 'Missing required fields: order is required.' });
        }

        const order = {
            order_id: req.body.order_id,
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            order_date: req.body.order_date,
            status: req.body.status
        };

        const result = await mongodb.getDatabase().collection('orders').insertOne(order);
        if (result.acknowledged) {
            return res.status(201).json({ message: 'Order created successfully', orderId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured creating order.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE - Rebecca
const deleteOrder = async (req, res) => {
    //#swagger.tags=['Orders - Delete Order']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid order id to delete a order.');
        }
        const orderId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('orders').deleteOne({ _id: orderId });
        //result.acknowledged = false;
        if (result.deletedCount > 0) {
            return res.status(201).json({ message: 'order deleted successfully', orderId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured deleting order.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    updateOrder,
    createOrder,
    deleteOrder
}