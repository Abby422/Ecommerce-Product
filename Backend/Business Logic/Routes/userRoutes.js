const router = require('express').Router();

// const adminAuth = require("../../Middlewares/adminMiddleware");
const { search, order,setAdmin, getAllProducts, getProductDetails } = require('../Controllers/userController');

router.post('/search', search)
router.post('/checkout', order)
// router.post('/setAdmin', adminAuth, setAdmin)
router.get('/allProducts', getAllProducts)
router.get('/product/:id', getProductDetails)

module.exports = { router }