// backend/routes/voterRoutes.js
import express from 'express';
import multer from 'multer';
import { registerVoter, verifyVoter } from '../controllers/voterController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/register',
  upload.fields([
    { name: 'aadharFile', maxCount: 1 },
    { name: 'addressProofFile', maxCount: 1 }
  ]),
  registerVoter
);

router.get('/verify/:id', verifyVoter);

export default router;
