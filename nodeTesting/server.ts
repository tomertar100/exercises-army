import express from "express";
import { storageArray } from "./storage";
import { isIndexInArray, checkCorrectType } from "./logics/logics";
import jwt from "jsonwebtoken";
import { authenticateToken, isAdmin, secret } from "./logics/middleware";
import nigger from "./routing/regularRouting";
// import errorHandler from "./erroHandler";

const app = express();

type User = { name: string };

//parses body of the request
app.use(express.json());

app.post("/login", (req, res) => {
  const userName: string = req.body.userName;
  const user: User = { name: userName };
  const accessToken = jwt.sign(user, secret);

  res.json({
    userName: userName,
    accessToken: accessToken,
  });
});

app.use("/", authenticateToken);

app.use("/", nigger);

app.all("/login", (req, res) => {
  res.status(405);
});

// app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening at port 3000");
});
