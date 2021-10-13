import express from "express";
import { getAllUsers, getUser, createUser } from "../actions/userAction";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const data = await getAllUsers();
  res.json(data);
});
userRouter.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await createUser(username, password);

  const data = await getAllUsers();
  res.json(data);
});

userRouter.get("/:username", async (req, res) => {
  const username = req.params.username;
  const user = await getUser(username);
  res.json(user);
});

export default userRouter;
