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
      res.status(400).json("password not matching");
    }
  } else {
    res.status(404).json("user not found");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const isUser = await getUser(username);

  if (isUser === undefined) {
    res.status(409).json("user already exists");
  } else {
    await createUser({ username, password });
    res.status(201).json("user created, username: " + username);
  }
});

app.use("/", authenticateToken);
app.use("/todos", todosRouter);

app.all("*", (req, res) => res.status(404).json({ err: "invalid route" }));

app.use(errorHandler);

app.listen(port, () => {
  console.log("listening at port: " + port);
});
