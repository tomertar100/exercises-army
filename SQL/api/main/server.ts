import express from "express";
import postRouter from "../routes/postRoutes";
import userRouter from "../routes/userRoutes";
import commentsRouter from "../routes/commentRoutes";

const port = 8000;
const app = express();

app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentsRouter);

app.listen(port, () => {
  console.log("listening at port " + port);
});
