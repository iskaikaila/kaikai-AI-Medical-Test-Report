const express = require('express');
const { registerUser, login } = require('../authController');

const router = express.Router();

// 用户注册
router.post('/admin/register', registerUser);

// 用户登录
router.post('/login', login);

module.exports = router;
