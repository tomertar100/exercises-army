import express from "express";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  updateComplete,
  deleteTodo,
  updateEditingTodo,
} from "../actions/todosActions";

const todosRouter = express.Router();

todosRouter.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const data = await getAllTodos({ user_id });
  res.json(data);
});

todosRouter.post("/", async (req, res) => {
  const { user_id, text, date, completed, overdue, isEditing } = req.body;
  // const user_id = req.body.user_id;
  // const text = req.body.text;
  // const date = req.body.date;
  // const completed = req.body.completed;
  // const overdue = req.body.overdue;
  // const isEditing = req.body.isEditing;

  await addTodo({ user_id, text, date, completed, overdue, isEditing });
  res.json("added new todo");
});

todosRouter.patch("/:id/update", async (req, res) => {
  const id = req.params.id;
  const { text, date } = req.body;
  // const text = req.body.text;
  // const date = req.body.date;

  await updateTodo({ id, text, date });
  res.json("todo updated");
});

todosRouter.patch("/:id/complete", async (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;

  await updateComplete({ id, completed });
  res.json("todo complete field updated");
});

todosRouter.patch("/:id/editing", async (req, res) => {
  const id = req.params.id;
  const isEditing = req.body.isEditing;

  await updateEditingTodo({ id, isEditing });
  res.json("todo isEditing field updated");
});

todosRouter.delete("/:id/delete", async (req, res) => {
  const id = req.params.id;
  await deleteTodo({ id });
  res.json("todo deleted");
});

export default todosRouter;
