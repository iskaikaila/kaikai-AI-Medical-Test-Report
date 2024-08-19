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


const { v4: isUUID } = require('uuid');

exports.getPatientById = async (req, res) => {
    const { patientId } = req.params;

    // 验证 patientId 是否为有效的 UUID
    if (!isUUID(patientId)) {
        return res.status(400).json({ message: 'Invalid patient ID format. Expected a UUID.' });
    }

    try {
        const result = await pool.query('SELECT * FROM patientlist WHERE id = $1', [patientId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching patient by ID:', err.message);
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



// 获取所有文件或根据 patient_info_id 获取特定患者的文件
exports.getPatientFiles = async (req, res) => {
    const { patient_info_id } = req.query;

    try {
        let result;
        if (patient_info_id) {
            // 验证 patient_info_id 是否为整数
            if (isNaN(patient_info_id)) {
                return res.status(400).json({ message: 'Invalid patient_info_id format. It should be an integer.' });
            }
            result = await pool.query('SELECT * FROM patient_files WHERE patient_info_id = $1', [patient_info_id]);
        } else {
            result = await pool.query('SELECT * FROM patient_files');
        }
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching patient files:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};



// 添加新文件记录
exports.addPatientFile = async (req, res) => {
    const { patient_info_id, file_name, file_path } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO patient_files (patient_info_id, file_name, file_path) VALUES ($1, $2, $3) RETURNING *',
            [patient_info_id, file_name, file_path]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding patient file:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
