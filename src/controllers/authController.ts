import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import User from "@/models/User"


export async function register(req: Request, res: Response, next: NextFunction) {

  if (await User.doesEmailExist(req.body.email)) {
    throw createHttpError(400, 'Email already exist')
  }

  const result = await User.create(req.body)

  res.status(201).json(result)
}
