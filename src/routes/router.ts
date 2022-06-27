import express from 'express';
import { register, login } from '@/controllers/authController';
import { createFolder, deleteFolder, findFolder, listFolder, updateFolder } from "@/controllers/folderController"
import asyncHandler from 'express-async-handler'
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const router = express.Router();

router.post('/auth/register', asyncHandler(register));
router.post('/auth/login', asyncHandler(login));

// Authenticated
router.use(isAuthenticated)

router.post('/folders', asyncHandler(createFolder))
router.get('/folders', asyncHandler(listFolder))
router.get('/folders/:id', asyncHandler(findFolder))
router.put('/folders/:id', asyncHandler(updateFolder))
router.delete('/folders/:id', asyncHandler(deleteFolder))

export default function initRouter(app: express.Application) {
  app.use('/api/v1', router);
}
