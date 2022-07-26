const router = require('express').Router();

// const adminAuth = require("../../Middlewares/adminMiddleware");
const { search, order,setAdmin, getAllProducts, getProductDetails } = require('../Controllers/userController');

router.get('/search', search)
router.post('/checkout', order)
// router.post('/setAdmin', adminAuth, setAdmin)
router.post('/allProducts', getAllProducts)
router.get('/product/:id', getProductDetails)

module.exports = { router }