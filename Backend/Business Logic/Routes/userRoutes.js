const router = require('express').Router();

const adminAuth = require("../../Middlewares/adminMiddleware");
const { search, order,setAdmin } = require('../Controllers/userController');

router.post('/search', search)
router.post('/checkout', order)
router.post('/setAdmin', adminAuth, setAdmin )


module.exports = { router };