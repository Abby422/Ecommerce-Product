const express = require('express')
const router = express.Router()

const {sendEmail} = require('../controllers/mailController')

router.get('/registration', sendEmail)

module.exports = router;