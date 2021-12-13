import React, { useState, useEffect } from "react";
import { Todo } from "../App";
import {
  getTodos,
  deleteTodo,
  updateCompleteField,
  updateEditingField,
  updateTodo,
} from "../axios";
import classnames from "classnames";
import { MdDelete, MdCancel } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
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

  const [editText, setEditText] = useState<string>(todo.text);
  const [editDate, setEditDate] = useState<string>(todo.date);
  // const [isOverDue, setIsOverDue] = useState<boolean>(false);
  // const [isCompleted, setIsCompleted] = useState<boolean>();

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
  }, [currentTime, todos]);

  // const filteredClass = () => {
  //   let result;

  //   if (isCompleted) {
  //     result = "completedClass";
  //   } else if (isOverDue && !isCompleted) {
  //     result = "overdueClass";
  //   } else if (!isOverDue && isCompleted) {
  //     result = "completedClass";
  //   } else {
  //     result = "";
  //   }
  //   return result;
  // };

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
    if (!editText || /^\s*$/.test(editText)) {
      return;
    }

    if (editDate === null || editDate === "") {
      return;
    }
    await updateTodo(todo.task_id, editText, editDate, token);
    toggleEdit();
    await retrieveTodos();

    setEditText(todo.text);
    setEditDate(todo.date);
  };

  const todoClasses = classnames({
    "todo-item": true,
    completedClass: todo.completed,
    overdueClass: todo.overdue,
  });

  return (
    <div>
      <li key={todo.task_id} className={todoClasses}>
        {!todo.isediting ? (
          <input
            checked={todo.completed}
            type="checkbox"
            onClick={toggleComplete}
            className="complete-button"
          />
        ) : (
          <input
            type="checkbox"
            checked={false}
            disabled={true}
            className="complete-button"
          />
        )}

        {!todo.isediting ? (
          <p id="text" className="todo-text">
            {text}
          </p>
        ) : (
          <input
            defaultValue={todo.text}
            maxLength={22}
            className="edit-text-input"
            type="text"
            placeholder="Upadte text here..."
            onChange={(e: any) => setEditText(e.target.value)}
          />
        )}
        {!todo.isediting ? (
          <p id="date" className="todo-date">
            {"due:        " + date}
          </p>
        ) : (
          <input
            defaultValue={todo.date}
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
          <button className="update-button" onClick={handleEdit}>
            <AiOutlineCheckCircle />
          </button>
        )}

        {!todo.isediting ? (
          <button onClick={handleDelete} className="delete-button">
            <MdDelete />
          </button>
        ) : (
          <button onClick={toggleEdit} className="cancel-button">
            <MdCancel />
          </button>
        )}
      </li>
    </div>
  );
};

export default TodoItem;
