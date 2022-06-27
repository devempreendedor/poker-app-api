import Folder from '@/models/Folder';
import {Request, Response} from 'express';

export async function createFolder(req: any, res: Response) {
  const userId = req.user.sub
  const result = await Folder.create({
    ...req.body,
    userId
  })
  res.status(201).json(result)
}

export async function listFolder(req: any, res: Response) {
  const userId = req.user.sub
  const result = await Folder.find({ userId })
  res.status(200).json(result)
}

export async function findFolder(req: any, res: Response) {
  const result = await Folder.findById(req.params.id)
  res.status(200).json(result)
}

export async function updateFolder(req: any, res: Response) {
  const result = await Folder.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(result)
}

export async function deleteFolder(req: any, res: Response) {
  await Folder.findByIdAndDelete(req.params.id)
  res.status(200).json()
}
