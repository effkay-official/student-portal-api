import express from 'express';
import { body } from 'express-validator';
import {
  createStudent,
  getStudent,
  updateStudent,
  uploadProfilePicture,
  deleteStudent
} from '../controllers/studentController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

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
router.post('/:id/upload', upload.single('profilePicture'), uploadProfilePicture);
router.delete('/:id', deleteStudent);

export default router;