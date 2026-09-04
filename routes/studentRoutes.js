const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createStudent, getStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

const createStudentValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('registrationNumber')
    .trim()
    .notEmpty()
    .withMessage('Registration number is required')
    .matches(/^[A-Z0-9-]+$/)
    .withMessage('Invalid format'),
  body('email').trim().isEmail().withMessage('Invalid email'),
];

router.post('/', createStudentValidation, createStudent);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;