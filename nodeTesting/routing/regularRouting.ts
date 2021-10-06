import express from "express";
import arrayRouter from "./arrayRouting";
const app = express();

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

app.use("/array/", arrayRouter);

app.all("/", (req, res) => {
  res.status(405).json({
    method: "invalid method used",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    route: "invaid route",
  });
});

export default app;
