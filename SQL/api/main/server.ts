import express from "express";
import postRouter from "../routes/postRoutes";
import userRouter from "../routes/userRoutes";

const port = 8000;
const app = express();

app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log("listening at port " + port);
});
