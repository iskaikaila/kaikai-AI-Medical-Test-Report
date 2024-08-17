const bcrypt = require('bcryptjs');
const pool = require('./db');
require('dotenv').config();



// 用户注册
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 检查用户名是否已存在
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // 密码加密
        const hashedPassword = await bcrypt.hash(password, 2);

        // 插入新用户
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 用户登录
exports.login = async (req, res) => {
    console.log('Received POST request for login');
    const { username, password } = req.body;

    try {
        // 查找用户
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        // 检查密码是否匹配
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'wrong password' });
        }

        // 登录成功，返回响应
        console.log('Login successful for user:', username);
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
            },
        });

    } catch (err) {
        console.error('Error logging in:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
