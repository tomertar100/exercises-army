import express from "express";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  updateComplete,
  deleteTodo,
  updateEditingTodo,
} from "../actions/todosActions";
import {
  GetAllTodos,
  AddTodo,
  UpdateTodo,
  UpdateComplete,
  UpdateEditing,
  DeleteTodo,
} from "../../models/todosActions";

const todosRouter = express.Router();

todosRouter.post("/", async (req, res) => {
  const { user_id, text, date, completed, overdue, isEditing }: AddTodo =
    req.body;

  await addTodo({ user_id, text, date, completed, overdue, isEditing });

  if (!user_id || user_id == undefined) {
    res
      .status(400)
      .json({ err: "missing user_id field or invalid user_id field" });
  }
  if (!text || text == undefined) {
    res.status(400).json({ err: "missing text field or invalid text field" });
  }
  if (!date || date == undefined) {
    res.status(400).json({ err: "missing date field or invalid date field" });
  }
  if (completed == undefined) {
    res
      .status(400)
      .json({ err: "missing completed field or invalid completed field" });
  }
  if (overdue == undefined) {
    res
      .status(400)
      .json({ err: "missing overdue field or invalid overdue field" });
  }
  if (isEditing == undefined) {
    res
      .status(400)
      .json({ err: "missing isEditing field or invalid isEditing field" });
  }

  res.status(201).json({ msg: "added new todo" });
});

todosRouter.all("/", (req, res, next) => {
  res.status(405).json({ err: "method not allowed" });
});

todosRouter.get("/:id", async (req, res) => {
  const user_id: string | number = req.params.id;
  const obj: GetAllTodos = { user_id };
  const data: {
    task_id: number;
    user_id: number;
    text: string;
    date: string;
    completed: boolean;
    overdue: boolean;
    isEditing: boolean;
  }[] = await getAllTodos(obj);

  if (!user_id) {
    res.status(400).json({ err: "missing user_id" });
  }
  if (typeof user_id !== "string") {
    res.status(400).json({ err: "invalid user_id eneterd" });
  }
  if (data === undefined || !data) {
    res.status(400).json({ err: "not found" });
  }
  res.status(200).json(data);
});

todosRouter.patch("/:id/update", async (req, res) => {
  const id: string = req.params.id;
  const { text, date }: { text: string; date: string } = req.body;
  const obj: UpdateTodo = { id, text, date };

  await updateTodo(obj);

  if (!id) {
    res.status(400).json({ err: "missing field" });
  }
  if (!text || !date) {
    res.status(400).json({ err: "missing text or date" });
  }

  res.status(200).json({ msg: "todo updated" });
});

todosRouter.patch("/:id/complete", async (req, res) => {
  const id: string = req.params.id;
  const completed: boolean = req.body.completed;
  const obj: UpdateComplete = { id, completed };
  await updateComplete(obj);

  if (!id) {
    res.status(400).json({ err: "missing task_id" });
  }
  if (completed == undefined) {
    res.status(400).json({ err: "missing completed field" });
  }
  res.status(204).json({ msg: "updatesd completed field" });
});

todosRouter.patch("/:id/editing", async (req, res) => {
  const id: string = req.params.id;
  const isEditing: boolean = req.body.isEditing;
  const obj: UpdateEditing = { id, isEditing };
  await updateEditingTodo(obj);

  if (!id) {
    res.status(400).json({ err: "missing task_id" });
  }
  if (isEditing == undefined) {
    res.status(400).json({ err: "missing editing field" });
  }
  res.status(200).json({ msg: "updated isEditing field" });
});

todosRouter.delete("/:id/delete", async (req, res) => {
  const id: string = req.params.id;
  const obj: DeleteTodo = { id };

  await deleteTodo(obj);

  if (!id) {
    res.status(400).json({ err: "missing task_id" });
  }
  res.status(200).json({ msg: "todo deleted" });
});

todosRouter.all("/:id", (req, res, next) => {
  res.status(405).json({ err: "mothod not allowed" });
});

export default todosRouter;
