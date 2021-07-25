import express from "express";
import { storageArray } from "./storage";
import { isIndexInArray, checkCorrectType } from "./logics";
import jwt from "jsonwebtoken";
import { authenticateToken, isAdmin, secret } from "./auth";

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

const arrayRouter = express.Router();
app.use("/array", arrayRouter);

//regular routing
app.get("/", (req, res) => {
  const date = new Date().toJSON().slice(0, 10);
  const username = res.locals.user;

  res.json({
    msg: `Hello ${username} today is ${date}`,
  });
});

app.get("/echo", (req, res) => {
  const msg = req.query.msg;
  res.json({
    echo: "the message is: " + msg,
  });
});

//array routing
arrayRouter.get("/", (req, res) => {
  res.json({
    array: storageArray,
  });
});

arrayRouter.get("/:index", (req, res) => {
  const arrayIndex = isIndexInArray(Number(req.params.index), storageArray);
  if (arrayIndex !== -1) {
    const itemInIndex = storageArray[arrayIndex];
    res.json({
      itemInIndex: itemInIndex,
    });
  } else {
    res.status(400).json({
      index: "invalid index",
    });
  }
});

arrayRouter.post("/", isAdmin, (req, res) => {
  const value: string | number = req.body.value;

  if (checkCorrectType(value)) {
    storageArray.push(value);
    res.json({
      array: storageArray,
    });
  } else {
    res.status(400).json({
      value: "invalid value entered",
    });
  }
});

arrayRouter.put("/:index", isAdmin, (req, res) => {
  const value: string | number = req.body.value;
  const arrayIndex = isIndexInArray(Number(req.params.index), storageArray);
  if (arrayIndex !== -1 && checkCorrectType(value)) {
    storageArray[arrayIndex] = value;
    res.json({
      array: storageArray,
    });
  } else {
    res.status(404).json({
      index: "invalid index",
    });
  }
});

arrayRouter.delete("/", isAdmin, (req, res) => {
  storageArray.pop();
  res.json({
    array: storageArray,
  });
});

arrayRouter.delete("/:index", isAdmin, (req, res) => {
  const arrayIndex = isIndexInArray(Number(req.params.index), storageArray);
  if (arrayIndex !== -1) {
    storageArray.splice(arrayIndex, 1);
    res.json({
      array: storageArray,
    });
  } else {
    res.status(400).json({
      index: "invalid index",
    });
  }
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
