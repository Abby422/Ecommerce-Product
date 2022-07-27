const router = require('express').Router();

// const adminAuth = require("../../Middlewares/adminMiddleware");
<<<<<<< HEAD
const { search, order,setAdmin, getAllProducts, getProductDetails, addProduct, getAdminProducts, updateProduct } = require('../Controllers/productsController');
=======
const { search, order,setAdmin, getAllProducts, getProductDetails, addProduct } = require('../Controllers/productsController');
>>>>>>> 1b23419c084a04dae47fb83705ac8c801a2e173b

router.get('/search', search)
router.post('/checkout', order)
// router.post('/setAdmin', adminAuth, setAdmin)
router.post('/allProducts', getAllProducts)
router.get('/product/:id', getProductDetails)
router.post('/addProduct', addProduct)
router.post('/setAdmin', setAdmin)
router.get('/adminProducts', getAdminProducts)
router.post('/updateProduct', updateProduct)

module.exports = { router }