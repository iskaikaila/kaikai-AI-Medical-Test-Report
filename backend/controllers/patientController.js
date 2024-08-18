const pool = require('../db');  // 假设你有一个已配置的数据库连接池

// 获取所有患者信息
exports.getPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patientlist');
        res.json(result.rows);
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




// 获取所有患者的详细信息
exports.getPatientInfo = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patient_info');
        res.json(result.rows); // 返回患者详细信息数据
    } catch (err) {
        console.error('Error fetching patient information:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 根据 patientlist_id 获取特定患者的详细信息
exports.getPatientInfoById = async (req, res) => {
    const { patientlist_id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM patient_info WHERE patientlist_id = $1', [patientlist_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient information not found' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching patient information by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 添加患者详细信息
exports.addPatientInfo = async (req, res) => {
    const { patientlist_id, symptoms, test_status, result, suggestion } = req.body;

    try {
        const resultQuery = await pool.query(
            'INSERT INTO patient_info (patientlist_id, symptoms, test_status, result, suggestion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [patientlist_id, symptoms, test_status, result, suggestion]
        );
        res.status(201).json(resultQuery.rows[0]);
    } catch (err) {
        console.error('Error adding patient information:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
