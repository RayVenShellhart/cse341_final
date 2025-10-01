const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/comments', require('./comments'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World']
    res.send("Add '/users', '/comments', '/orders', or '/products' to the end of the url for database results.")
});

// routes usage here

module.exports = router;