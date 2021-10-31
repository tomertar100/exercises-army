import express from "express";
import { getAllUsers, getUser, createUser } from "../actions/userAction";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const data = await getAllUsers();
  if (data) {
    res.json(data);
  } else {
    res.status(404).json("unable to retrieve data");
  }
});

userRouter.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await getUser(username);
  if (!username) {
    res.status(400).json("missing username field");
  } else {
    if (user) {
      res.json(user);
    } else {
      res.status(401).json("user missing");
    }
  }
});

export default userRouter;
