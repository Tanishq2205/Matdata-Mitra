import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  // Add validation for new fields
  body('name').notEmpty().withMessage('Name is required'),
  body('aadhar').isLength({ min: 12, max: 12 }).withMessage('Invalid Aadhar'),
  body('dob').isDate().withMessage('Invalid Date of Birth'),
  body('fatherName').notEmpty().withMessage('Father name is required'),
  body('motherName').notEmpty().withMessage('Mother name is required'),
  body('permanentAddress').notEmpty().withMessage('Permanent address required'),
  body('presentAddress').notEmpty().withMessage('Present address required'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('email').isEmail().withMessage('Invalid email'),
  
  // Custom validation after file upload
  (req, res, next) => {
    const errors = validationResult(req);
    
    // Check for uploaded files
    if (!req.files?.aadharFile?.[0]) {
      errors.errors.push({ msg: 'Aadhar file is required' });
    }
    
    if (!req.files?.addressProofFile?.[0]) {
      errors.errors.push({ msg: 'Address proof file is required' });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];