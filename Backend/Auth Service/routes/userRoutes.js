const express = require('express');
const router = express.Router();

const { getAllUsers, Register, login, ProfileUpdate} = require('../Controllers/userController');
const adminAuth = require("../../Middlewares/adminMiddleware");

router.post('/register', Register)
router.post('/login', login)
router.post('/adminLogin', adminAuth, login )
router.post('/updateProfile', ProfileUpdate )// you need to be a user and logged in to be able to update profile.
router.get('/getAllUsers', getAllUsers)

module.exports = { router };