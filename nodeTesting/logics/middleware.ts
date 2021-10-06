import jwt from "jsonwebtoken";

//secret key for jwt
export const secret: string = "secretKey";

//authorization function
export function isAdmin(req, res, next) {
  const name: string = res.locals.user;

  if (name.startsWith("admin")) {
    next();
  } else {
    res.sendStatus(403);
  }
}

//authenticatin function
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== "undefined") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, data) => {
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
