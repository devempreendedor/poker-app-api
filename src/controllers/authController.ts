import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import User from "@/models/User"
import { addHours } from 'date-fns'
import jwt from 'jsonwebtoken'
import config from "@/config/config"


export async function register(req: Request, res: Response, next: NextFunction) {

  if (await User.doesEmailExist(req.body.email)) {
    throw createHttpError(400, 'Email already exist')
  }

  const result = await User.create(req.body)

  res.status(201).json(result)
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !(await user.doesPasswordMatch(password))) {
    throw createHttpError(401, 'Email or password incorrect')
  }

  const expirationDate: Date = addHours(
    new Date(),
    Number(config.jwt.expirationHours)
  )

  const payload = {
    sub: user.email,
    iat: Math.floor(Date.now() / 1000),
    exp:
      Math.floor(Date.now() / 1000) +
      60 * 60 * Number(config.jwt.expirationHours), // 24 h
    issuer: config.jwt.issuer,
  }

  const token = jwt.sign(payload, config.jwt.secret)

  const result = {
    user: {
      _id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
    expirationDate,
  }

  res.status(200).send(result)
}
