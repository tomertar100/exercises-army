import express from "express";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../actions/todosActions";

const todosRouter = express.Router();

todosRouter.get("/todos", async (req, res) => {
  const data = await getAllTodos();
  res.json(data);
});

todosRouter.post("/createtodo", async (req, res) => {
  const text = req.body.text;
  const date = req.body.date;
  const completed = req.body.completed;
  const overdue = req.body.overdue;
  const isEditing = req.body.isEditing;

  await addTodo(text, date, completed, overdue, isEditing);
  res.json("added new todo");
});

todosRouter.put("/updatetodo/:id", async (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  const date = req.body.date;

  await updateTodo(id, text, date);
  res.json("todo updated");
});

todosRouter.delete("/deletetodo:id", async (req, res) => {
  const id = req.params.id;
  await deleteTodo(id);
  res.json("todo deleted");
});

export default todosRouter;
