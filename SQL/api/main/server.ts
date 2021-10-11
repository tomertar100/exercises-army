import express from "express";
import userRouter from "../routes/userRoutes";

const port = 8000;
const app = express();

app.use(express.json());

app.use("/api/users/", userRouter);

app.listen(port, () => {
  console.log("listening at port " + port);
});
