const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/comments', require('./comments'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
const passport = require('passport');


router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});
// routes usage here

module.exports = router;