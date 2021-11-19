import React, { useState, useEffect } from "react";
import { Todo } from "../App";
//types

type todoItemProps = {
  text: string;
  date: string;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todo: Todo;
  currentTime: Date;
};
const TodoItem = ({
  text,
  date,
  todos,
  setTodos,
  todo,
  currentTime,
}: todoItemProps) => {
  const [editText, setEditText] = useState("");
  const [editDate, setEditDate] = useState("");

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

  const handleDelete = () => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };
  const toggleComplete = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const toggleEdit = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, isEditing: true };
        }
        return item;
      })
    );
  };

  const handleEdit = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
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
      <li key={todo.id} className="todo-item">
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
      ) : null}
      {!todo.isEditing ? (
        <button onClick={handleDelete} className="delete-button">
          delete
        </button>
      ) : null}
    </div>
  );
};

export default TodoItem;
