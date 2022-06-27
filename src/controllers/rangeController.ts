import Range from '@/models/Range';
import {Request, Response} from 'express';

export async function createRange(req: any, res: Response) {
  const userId = req.user.sub
  const result = await Range.create({
    ...req.body,
    userId
  })
  res.status(201).json(result)
}

export async function listRange(req: any, res: Response) {
  const userId = req.user.sub
  const result = await Range.find({ userId })
  res.status(200).json(result)
}

export async function findRange(req: any, res: Response) {
  const result = await Range.findById(req.params.id)
  res.status(200).json(result)
}

export async function updateRange(req: any, res: Response) {
  const result = await Range.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(result)
}

export async function deleteRange(req: any, res: Response) {
  await Range.findByIdAndDelete(req.params.id)
  res.status(200).json()
}
