const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllProducts = async (req, res) => {
    //#swagger.tags=['Products - Get All']
    const result = await mongodb.getDatabase().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
};

// GET SINGLE - RayVen

// PUT - RayVen

// POST - Rebecca
const createProduct = async (req, res) => {
    //#swagger.tags=['Products - Create Product']
    try {
        if (!req.body.product) {
            return res.status(400).json({ message: 'Missing required fields: product is required.' });
        }

        const product = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            category: req.body.category,
            price: req.body.price,
            release_date: req.body.release_date,
            decription: req.body.description
        };

        const result = await mongodb.getDatabase().collection('products').insertOne(product);
        if (result.acknowledged) {
            return res.status(201).json({ message: 'Product created successfully', productId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured creating product.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE - Rebecca
const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products - Delete Product']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid product id to delete a product.');
        }
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('products').deleteOne({ _id: productId });
        if (result.deletedCount > 0) {
            return res.status(201).json({ message: 'Product deleted successfully', productId: result.insertedId });
        } else {
            res.status(500).json(result.error || 'Error occured deleting product.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct
}