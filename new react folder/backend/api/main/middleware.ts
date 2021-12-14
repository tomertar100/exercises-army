import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const secretKey = "secret";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.locals.user = data?.name;

      return next();
    });
  } else {
    res.sendStatus(401);
  }
}
