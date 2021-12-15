import express from "express";
import jwt from "jsonwebtoken";
import todosRouter from "../routes/todosRoutes";
import { authenticateToken, secretKey } from "./middleware";
import { getUser, createUser } from "../actions/userActions";
import { errorHandler } from "./errorhandler";
import cors from "cors";
const port = 3002;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // const username = req.body.username;
  // const password = req.body.password;
  const loginUser = await getUser({ username });
  if (loginUser) {
    if (loginUser.password === password) {
      const accessToken = jwt.sign(username, secretKey);

      res.json({ accessToken: accessToken, user_id: loginUser.user_id });
    } else {
      res.status(401).json("password not matching");
    }
  } else {
    res.status(401).json("user not found");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // const username = req.body.username;
  // const password = req.body.password;

  const isUser = await getUser(username);
  if (!isUser) {
    await createUser({ username, password });
    res.status(201).json("user created, username: " + username);
  }
  res.status(401).json("user already exists");
});

app.use("/", authenticateToken);
app.use("/todos", todosRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log("listening at port: " + port);
});
