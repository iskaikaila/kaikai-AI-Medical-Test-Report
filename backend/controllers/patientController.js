const pool = require('../db');  // 假设你有一个已配置的数据库连接池

// 获取所有患者信息
exports.getPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patientlist');
        res.json(result.rows); // 返回患者数据
    } catch (err) {
        console.error('Error fetching patients:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 添加新患者
exports.addPatient = async (req, res) => {
    const { name, age, gender, test_details } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO patientlist (name, age, gender, test_details) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, age, gender, test_details]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding patient:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
