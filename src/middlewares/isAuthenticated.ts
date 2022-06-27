import config from "@/config/config";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken"

async function isAuthenticated(req: any, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split('Bearer ')[1]
  if (!token) {
    return next(createHttpError(401, "A token is required for authentication"));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    req.user = decoded
  } catch (error) {
    return next(createHttpError(401, "Invaalida token"));
  }

  return next()

}

export { isAuthenticated }
