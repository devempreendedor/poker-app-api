import express from 'express';
import { register, login } from '@/controllers/authController';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/auth/register', asyncHandler(register));
router.post('/auth/login', asyncHandler(login));

export default function initRouter(app: express.Application) {
  app.use('/api/v1', router);
}
