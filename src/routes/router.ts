import express from 'express';
import { register } from '@/controllers/authController';
import asyncHandler from 'express-async-handler'

const router = express.Router();

router.post('/auth/register', asyncHandler(register));

export default function initRouter(app: express.Application) {
  app.use('/api/v1', router);
}
