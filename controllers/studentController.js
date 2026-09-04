const Student = require('../models/Student');
const { validationResult } = require('express-validator');

exports.createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, registrationNumber, email } = req.body;

  try {
    const existing = await Student.findOne({ $or: [{ email }, { registrationNumber }] });
    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await Student.create({ name, registrationNumber, email });

    res.status(201).json({
      id: student._id,
      name: student.name,
      registrationNumber: student.registrationNumber,
      email: student.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      id: student._id,
      name: student.name,
      registrationNumber: student.registrationNumber,
      email: student.email,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (req.body.registrationNumber || req.body.email) {
    return res.status(400).json({ message: 'Registration number and email cannot be modified' });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.name = name;
    await student.save();

    res.status(200).json({
      id: student._id,
      name: student.name,
      registrationNumber: student.registrationNumber,
      email: student.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.deleteOne();
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};