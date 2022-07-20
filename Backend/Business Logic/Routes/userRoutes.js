const router = require('express').Router();

const adminAuth = require("../../Middlewares/adminMiddleware");
const { search, order,setAdmin, getAllProducts } = require('../Controllers/userController');

router.post('/search', search)
router.post('/checkout', order)
router.post('/setAdmin', adminAuth, setAdmin )
router.get('/allProducts', getAllProducts)


module.exports = { router };