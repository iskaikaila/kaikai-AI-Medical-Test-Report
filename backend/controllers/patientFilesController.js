// const pool = require('../db');

// // 获取所有文件或根据 patient_info_id 获取特定患者的文件
// exports.getPatientFiles = async (req, res) => {
//     const { patient_info_id } = req.query;

//     try {
//         let result;
//         if (patient_info_id) {
//             // 验证 patient_info_id 是否为整数
//             if (isNaN(patient_info_id)) {
//                 return res.status(400).json({ message: 'Invalid patient_info_id format. It should be an integer.' });
//             }
//             result = await pool.query('SELECT * FROM patient_files WHERE patient_info_id = $1', [patient_info_id]);
//         } else {
//             result = await pool.query('SELECT * FROM patient_files');
//         }
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error fetching patient files:', err.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// };



// // 添加新文件记录
// exports.addPatientFile = async (req, res) => {
//     const { patient_info_id, file_name, file_path } = req.body;

//     try {
//         const result = await pool.query(
//             'INSERT INTO patient_files (patient_info_id, file_name, file_path) VALUES ($1, $2, $3) RETURNING *',
//             [patient_info_id, file_name, file_path]
//         );
//         res.status(201).json(result.rows[0]);
//     } catch (err) {
//         console.error('Error adding patient file:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
