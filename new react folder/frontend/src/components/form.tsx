import React, { useState } from "react";
import { Todo } from "../App";
import { createTodo, getTodos } from "../axios";

//types

type FormProps = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Form = ({ setTodos, setFilteredTodos }: FormProps) => {
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
    <form className="form">
      <div className="labelInputText">
        <label htmlFor="inputText">TASK NAME:</label>
        <input
          maxLength={28}
          id="inputText"
          placeholder="Type here..."
          type="text"
          className="todo-text-input"
          onChange={(e: any) => {
            setNewTask({
              ...newTask,
              text: e.target.value,
              task_id: generateRandomId(),
            });
          }}
          value={newTask.text}
        />
      </div>
      <div className="labelInputDate">
        <label htmlFor="inputDate">DUE DATE:</label>
        <input
          id="inputDate"
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
      </div>
      <div className="todo-button-div">
        <button
          onClick={handleSubmitTodo}
          type="submit"
          className="todo-button"
        >
          <i>New Task</i>
        </button>
      </div>
    </form>
  );
};

export default Form;
