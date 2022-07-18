const router = require('express').Router();

const { search, order} = require('../controllers/userController')

router.post('/search', search)
router.post('/checkout', order)


module.exports = { router };