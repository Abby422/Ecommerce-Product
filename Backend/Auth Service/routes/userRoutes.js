const express = require('express')
const router = express.Router();

const { Register, login, ProfileUpdate} = require('../controllers/userController')

router.post('/register', Register)
router.post('/login', login)
router.post('/updateProfile', ProfileUpdate )// you need to be a user and logged in to be able to update profile.

module.exports = { router };