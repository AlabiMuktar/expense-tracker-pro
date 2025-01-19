const express = require('express');
const register = require('./controllers/register');
const login = require('./controllers/login');
const auth = require('../../middleware/auth');
const userDashboardData = require('./controllers/userDashboard');
const forgotPassword = require('./controllers/forgotPassword');
const resetPassword = require('./controllers/resetPassword');

const usersRoutes = express.Router();

usersRoutes.post('/register', register)

usersRoutes.post('/login', login)

usersRoutes.post('/forgotpassword', forgotPassword)
usersRoutes.post('/resetpassword', resetPassword)

usersRoutes.use(auth)

usersRoutes.get('/dashboard', userDashboardData)



module.exports = usersRoutes;