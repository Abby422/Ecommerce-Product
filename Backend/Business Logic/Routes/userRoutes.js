const router = require('express').Router();

const adminAuth = require("../../Middlewares/adminMiddleware");
const { search, order,setAdmin } = require('../Controllers/userController');

router.post('/search', search)
router.post('/checkout', order)
router.post('/setAdmin', adminAuth('testuser1@youtu.be'), setAdmin )


module.exports = { router };