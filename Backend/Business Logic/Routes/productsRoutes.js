const router = require('express').Router();

// const adminAuth = require("../../Middlewares/adminMiddleware");

const { search, order, getAllProducts, getProductDetails} = require('../Controllers/productsController');
const{setAdmin, addProduct, getAdminProducts, updateProduct, getOneProduct, deleteProduct }=require('../Controllers/adminController')



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
router.post('/deleteProduct', deleteProduct)

module.exports = { router }