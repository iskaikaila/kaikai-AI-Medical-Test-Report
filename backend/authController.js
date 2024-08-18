const bcrypt = require('bcryptjs');
const pool = require('./db');

exports.registerUser = async (req, res) => {
    const { id, username, password, department, role, phone, email, address } = req.body;

    try {

          // 检查ID是否已存在
          const idCheck = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
          console.log("ID check result:", idCheck.rows);
  
          if (idCheck.rows.length > 0) {
              return res.status(400).json({ message: 'ID already exists' });
          }
        
        // 检查用户名是否已存在
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        console.log("Username check result:", userCheck.rows);

        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (id, username, password, department, role, phone, email, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [id, username, hashedPassword, department, role, phone, email, address]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
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

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



// 获取所有用户
exports.getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ message: 'Server error' });
    }
};



// 删除用户
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', user: result.rows[0] });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
