const router = require('express').Router();

// const adminAuth = require("../../Middlewares/adminMiddleware");
const { search, order,setAdmin, getAllProducts, getProductDetails, addProduct, getAdminProducts, updateProduct, getOneProduct } = require('../Controllers/productsController');

router.get('/search', search)
router.post('/checkout', order)
// router.post('/setAdmin', adminAuth, setAdmin)
router.post('/allProducts', getAllProducts)
router.get('/product/:id', getProductDetails)
router.post('/addProduct', addProduct)
router.post('/setAdmin', setAdmin)
router.get('/adminProducts', getAdminProducts)
router.post('/updateProduct', updateProduct)
router.get('/getOneProduct/:id', getOneProduct)

module.exports = { router }