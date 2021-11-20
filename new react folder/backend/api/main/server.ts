import express from "express";
import jwt from "jsonwebtoken";
import todosRouter from "../routes/todosRoutes";

const port = 3002;
const app = express();

app.use(express.json());

app.use("/todoapp", todosRouter);

app.listen(port, () => {
  console.log("listening at port: " + port);
});
