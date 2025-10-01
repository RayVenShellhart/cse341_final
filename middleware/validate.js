const validator = require('../helpers/validate');

const saveComment = (req, res, next) => {
    const validationRule = {
        user_id: 'required|string',
        username: 'required|string',
        rating: 'required|string',
        comment: 'required|string',
        date_posted: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveOrder = (req, res, next) => {
    const validationRule = {
        order_id: 'required|string',
        user_id: 'required|string',
        product_id: 'required|string',
        quantity: 'required|string',
        total_price: 'required|string',
        order_date: 'string',
        status: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveUser = (req, res, next) => {
    const validationRule = {
        user_id: 'required|string',
        username: 'required|string',
        join_date: 'required|string',
        location: 'required|string',
        bio: 'string'

    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveProduct = (req, res, next) => {
    const validationRule = {
        product_id: 'required|string',
        product_name: 'required|string',
        category: 'required|string',
        price: 'required|string',
        release_date: 'string',
        decription: 'string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(500).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveComment,
    saveOrder,
    saveUser,
    saveProduct
};