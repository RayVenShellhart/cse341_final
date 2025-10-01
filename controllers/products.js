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

// GET SINGLE - Joel
const getSingleProduct = async (req, res) => {
    //#swagger.tags=['Products - Get Single']
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('products').find({ _id: productId });
        const products = await result.toArray();
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};

// PUT - RayVen
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products - Update Product']
    try {
        const productId = new ObjectId(req.params.id);
        const product = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            category: req.body.category,
            price: req.body.price,
            release_date: req.body.release_date,
            description: req.body.description
        };

        const response = await mongodb.getDatabase().collection('products').replaceOne({ _id: productId }, product);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update product' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

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

module.exports = {
    getAllProducts,
    getSingleProduct,
    updateProduct,
    createProduct
}