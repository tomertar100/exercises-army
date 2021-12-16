import { useState, useEffect } from "react";
import { Todo } from "../types/todo";

import classnames from "classnames";
import { MdDelete, MdCancel } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
//types

type todoItemProps = {
  text: string;
  date: string;
  todos: Todo[];
  todo: Todo;
  currentTime: Date;
  handleDelete: (task_id: string | null) => Promise<void>;
  toggleComplete: (task_id: string | null, completed: boolean) => Promise<void>;
  toggleEdit: (task_id: string | null, isEditing: boolean) => Promise<void>;
  handleEdit: (
    task_id: string | null,
    isEditing: boolean,
    editText: string,
    editDate: string
  ) => Promise<void>;
};

const TodoItem: React.FC<todoItemProps> = ({
  text,
  date,
  todos,
  todo,
  currentTime,
  handleDelete,
  toggleComplete,
  toggleEdit,
  handleEdit,
}) => {
  //global variables

  //hooks

  useEffect(() => {
    if (
      currentTime > new Date(todo.date) &&
      currentTime.getDate() !== new Date(todo.date).getDate()
    ) {
      todo.overdue = true;
    } else {
      todo.overdue = false;
    }
  }, [currentTime, todos, todo]);

  // functions

  useEffect(() => {
    setEditText(todo.text);
    setEditDate(todo.date);
  }, [todo]);

  const [editText, setEditText] = useState<string>(todo.text);
  const [editDate, setEditDate] = useState<string>(todo.date);

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
            onClick={() => toggleComplete(todo.task_id, todo.completed)}
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
            maxLength={28}
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
          <button
            className="edit-button"
            onClick={() => toggleEdit(todo.task_id, todo.isediting)}
            disabled={todo.completed}
          >
            <FiEdit />
          </button>
        ) : (
          <button
            className="update-button"
            onClick={() =>
              handleEdit(
                todo.task_id,

                todo.isediting,
                editText,
                editDate
              )
            }
          >
            <AiOutlineCheckCircle />
          </button>
        )}

        {!todo.isediting ? (
          <button
            onClick={() => handleDelete(todo.task_id)}
            className="delete-button"
          >
            <MdDelete />
          </button>
        ) : (
          <button
            onClick={() => toggleEdit(todo.task_id, todo.isediting)}
            className="cancel-button"
          >
            <MdCancel />
          </button>
        )}
      </li>
    </div>
  );
};

export default TodoItem;
