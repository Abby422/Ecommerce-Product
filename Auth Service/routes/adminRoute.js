const express = require('express')
const adminRouter = express.Router();

const {addProducts, deleteProduct} = require('../controllers/adminControllers')

adminRouter.get('/addProducts', addProducts)
adminRouter.get('/deleteproduct', deleteProduct)

module.exports = {adminRouter}