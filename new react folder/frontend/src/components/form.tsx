import React, { useState, useEffect } from "react";
import { Todo } from "../App";
import { createTodo, getTodos } from "../axios";

//types

type FormProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Form = ({
  todos,
  setTodos,
  status,
  setStatus,
  setFilteredTodos,
}: FormProps) => {
  const user_id = sessionStorage.getItem("user_id");

  const token = sessionStorage.getItem("JWT");

  const retrieveTodos = () => {
    getTodos(user_id, token).then((res) => {
      setFilteredTodos(res);
      setTodos(res);
      setNewTask(intialNewTaskState);
    });
  };

  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000).toString();
  };

  const intialNewTaskState: Todo = {
    task_id: "",
    user_id: user_id,
    text: "",
    date: "",
    completed: false,
    overdue: false,
    isediting: false,
  };

  const [newTask, setNewTask] = useState<Todo>(intialNewTaskState);

  const handleSubmitTodo = async (e: any) => {
    e.preventDefault();
    if (!newTask.text || /^\s*$/.test(newTask.text)) {
      return;
    }

    if (newTask.date === null || newTask.date === "") {
      return;
    }

    await createTodo(
      newTask.task_id,
      newTask.user_id,
      newTask.text,
      newTask.date,
      newTask.completed,
      newTask.overdue,
      newTask.isediting,
      token
    );

    await retrieveTodos();
  };

  return (
    <form>
      <input
        placeholder="Enter A Todo"
        type="text"
        className="todo-input"
        onChange={(e: any) => {
          setNewTask({
            ...newTask,
            text: e.target.value,
            task_id: generateRandomId(),
          });
        }}
        value={newTask.text}
      />
      <input
        type="date"
        className="todo-date-input"
        onChange={(e: any) => {
          setNewTask({
            ...newTask,
            date: e.target.value,
            task_id: generateRandomId(),
          });
          console.log("new task date change: ", newTask);
        }}
        value={newTask.date}
      />

      <button onClick={handleSubmitTodo} type="submit" className="todo-button">
        <i>Add</i>
      </button>

      <select onChange={(e: any) => setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        <option value="overdue">Overdue</option>
      </select>
    </form>
  );
};

export default Form;
