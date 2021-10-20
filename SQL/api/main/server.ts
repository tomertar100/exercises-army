import express from "express";
import postRouter from "../routes/postRoutes";
import userRouter from "../routes/userRoutes";
import commentsRouter from "../routes/commentRoutes";
import jwt from "jsonwebtoken";
import { getUser } from "../actions/userAction";
import { authenticateToken, secretKey } from "./middleware";

const port = 8000;
const app = express();

app.use(express.json());

app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const loginUser = await getUser(username);
  if (loginUser) {
    const accessToken = jwt.sign(username, secretKey);
    res.json({
      username: username,
      accessToken: accessToken,
    });
  } else {
    res.status(401).json("user not found");
  }
});

app.use("/", authenticateToken);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentsRouter);

app.listen(port, () => {
  console.log("listening at port " + port);
});
