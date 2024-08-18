const express = require('express');
const { registerUser, login, getUsers, deleteUser } = require('../authController');

const router = express.Router();

// 用户注册
router.post('/admin/register', registerUser);

// 用户登录
router.post('/login', login);

router.get('/users', getUsers);

// 删除用户
router.delete('/admin/users/:id', deleteUser);

module.exports = router;

