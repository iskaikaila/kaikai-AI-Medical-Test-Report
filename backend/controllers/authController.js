const bcrypt = require('bcryptjs');
const pool = require('./db');

// 用户注册
exports.registerUser = async (req, res) => {
    const { id, username, password, department, role, phone, email, address } = req.body;

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (id, username, password, department, role, phone, email, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [id, username, hashedPassword, department, role, phone, email, address]
        );

        res.status(201).json({ user: result.rows[0], message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 用户登录
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.json({ user });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
