import React, { useState, useEffect } from "react";
import { Todo } from "../App";
import { getTodos, deleteTodo } from "../axios";
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

  //states

  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

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
  const toggleComplete = () => {
    setTodos(
      todos.map((item) => {
        if (item.task_id === todo.task_id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const toggleEdit = () => {
    setTodos(
      todos.map((item) => {
        if (item.task_id === todo.task_id) {
          return { ...item, isEditing: !item.isEditing };
        }
        return item;
      })
    );
  };

  const handleEdit = () => {
    setTodos(
      todos.map((item) => {
        if (item.task_id === todo.task_id) {
          if (!editText || /^\s*$/.test(editText)) {
            return item;
          }
          if (editDate === null || editDate === "") {
            return item;
          }
          todo.text = editText;
          todo.date = editDate;
          return { ...item, isEditing: false };
        }
        return item;
      })
    );
    setEditText("");
    setEditDate("");
  };

  return (
    <div className="todo">
      <li key={todo.task_id} className="todo-item">
        {!todo.isEditing ? (
          <p id="text">{text}</p>
        ) : (
          <input
            type="text"
            value={editText}
            placeholder="Update A Todo"
            onChange={(e: any) => setEditText(e.target.value)}
          />
        )}
        {!todo.isEditing ? (
          <p id="date">due: {date}</p>
        ) : (
          <input
            type="date"
            onChange={(e: any) => setEditDate(e.target.value)}
          />
        )}
      </li>
      {!todo.isEditing ? (
        <button className="edit-button" onClick={toggleEdit}>
          edit
        </button>
      ) : (
        <button onClick={handleEdit}>update</button>
      )}
      {!todo.isEditing ? (
        <button onClick={toggleComplete} className="complete-button">
          complete
        </button>
      ) : (
        <button className="cancel-button" onClick={toggleEdit}>
          cancel
        </button>
      )}
      {!todo.isEditing ? (
        <button onClick={handleDelete} className="delete-button">
          delete
        </button>
      ) : null}
    </div>
  );
};

export default TodoItem;
