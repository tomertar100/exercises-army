import React, { useState, useEffect } from "react";
import { Todo } from "../App";
import {
  getTodos,
  deleteTodo,
  updateCompleteField,
  updateEditingField,
  updateTodo,
} from "../axios";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
//types

type todoItemProps = {
  text: string;
  date: string;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
  currentTime: Date;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type UpdatedTask = {
  text: string;
  date: string;
};
const TodoItem = ({
  text,
  date,
  todos,
  setTodos,
  todo,
  currentTime,
  setFilteredTodos,
}: todoItemProps) => {
  //global variables

  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("JWT");

  const InitialUpdatedTask: UpdatedTask = {
    text: "",
    date: "",
  };

  //states

  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

  const [updatedTask, setUpdatedTask] =
    useState<UpdatedTask>(InitialUpdatedTask);

  //functions

  const retrieveTodos = () => {
    getTodos(user_id, token).then((res) => {
      setFilteredTodos(res);
      setTodos(res);
    });
  };

  useEffect(() => {
    if (
      currentTime > new Date(todo.date) &&
      currentTime.getDate() !== new Date(todo.date).getDate()
    ) {
      todo.overdue = true;
    } else {
      todo.overdue = false;
    }
  }, [currentTime]);

  const handleDelete = async () => {
    await deleteTodo(todo.task_id, token);
    await retrieveTodos();
  };
  const toggleComplete = async () => {
    const newCompleted = !todo.completed;
    await updateCompleteField(todo.task_id, newCompleted, token);
    await retrieveTodos();
  };

  const toggleEdit = async () => {
    const newEditingState = !todo.isediting;
    await updateEditingField(todo.task_id, newEditingState, token);
    await retrieveTodos();
  };

  const handleEdit = async () => {
    await updateTodo(todo.task_id, editText, editDate, token);
    toggleEdit();
    await retrieveTodos();

    setEditText("");
    setEditDate("");
  };

  return (
    <div>
      <li key={todo.task_id} className="todo-item">
        {!todo.isediting ? (
          <input
            type="checkbox"
            onClick={toggleComplete}
            className="complete-button"
          />
        ) : null}

        {!todo.isediting ? (
          <p id="text" className="todo-text">
            {text}
          </p>
        ) : (
          <input
            className="edit-text-input"
            type="text"
            placeholder="Update A Todo"
            onChange={(e: any) => setEditText(e.target.value)}
          />
        )}
        {!todo.isediting ? (
          <p id="date" className="todo-date">
            {"due:        " + date}
          </p>
        ) : (
          <input
            className="edit-date-input"
            type="date"
            onChange={(e: any) => setEditDate(e.target.value)}
          />
        )}

        {!todo.isediting ? (
          <button className="edit-button" onClick={toggleEdit}>
            <FiEdit />
          </button>
        ) : (
          <button onClick={handleEdit}>update</button>
        )}

        {/* // <button className="cancel-button" onClick={toggleEdit}>
          //   cancel
          // </button> */}

        {!todo.isediting ? (
          <button onClick={handleDelete} className="delete-button">
            <MdDelete />
          </button>
        ) : null}
      </li>
    </div>
  );
};

export default TodoItem;
