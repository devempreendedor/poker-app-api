import express from 'express';
import { register, login } from '@/controllers/authController';
import { createFolder, deleteFolder, findFolder, listFolder, updateFolder } from "@/controllers/folderController"
import asyncHandler from 'express-async-handler'
import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { createRange, deleteRange, findRange, listRange, updateRange } from '@/controllers/rangeController';

const router = express.Router();

router.post('/auth/register', asyncHandler(register));
router.post('/auth/login', asyncHandler(login));

// Authenticated
router.use(isAuthenticated)

// Folders
router.post('/folders', asyncHandler(createFolder))
router.get('/folders', asyncHandler(listFolder))
router.get('/folders/:id', asyncHandler(findFolder))
router.put('/folders/:id', asyncHandler(updateFolder))
router.delete('/folders/:id', asyncHandler(deleteFolder))

// Ranges
router.post('/ranges', asyncHandler(createRange))
router.get('/ranges', asyncHandler(listRange))
router.get('/ranges/:id', asyncHandler(findRange))
router.put('/ranges/:id', asyncHandler(updateRange))
router.delete('/ranges/:id', asyncHandler(deleteRange))

export default function initRouter(app: express.Application) {
  app.use('/api/v1', router);
}
