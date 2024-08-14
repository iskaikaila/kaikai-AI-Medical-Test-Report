const Report = require('../models/Report');

exports.createReport = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req;

    try {
        const report = new Report({ title, content, createdBy: userId });
        await report.save();

        res.status(201).json({ message: 'Report created', report });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find().populate('createdBy', 'username');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
