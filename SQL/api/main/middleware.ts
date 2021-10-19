import jwt from "jsonwebtoken";
import express from "express";

export const secretKey = "secret";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.locals.user = data.name;

      next();
    });
  } else {
    res.sendStatus(401);
  }
}
