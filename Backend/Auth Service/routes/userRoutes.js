const express = require('express');
const { getAllUsers, Register, login, ProfileUpdate} = require('../Controllers/userController');
const router = express.Router();


router.post('/register', Register)
router.post('/login', login)
router.post('/updateProfile', ProfileUpdate )// you need to be a user and logged in to be able to update profile.
router.get('/getAllUsers', getAllUsers)

module.exports = { router };