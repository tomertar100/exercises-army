import React, { useState, useEffect } from "react";
//importing more components
import TodoItem from "./todo";
import { Todo } from "../types/todo";
import {
  getTodos,
  deleteTodo,
  updateCompleteField,
  updateEditingField,
  updateTodo,
} from "../axios";

//typescript
type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  currentTime: Date;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  filteredTodos,
  currentTime,
  setFilteredTodos,
  setStatus,
}) => {
  const user_id = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("JWT");

  //states

  const [currentTabClass, setCurrentTabClass] = useState<string>("all");

  //hooks

  useEffect(
    () => console.log("ToDoList filteredTodos: ", filteredTodos),
    [filteredTodos]
  );

  const retrieveTodos = () => {
    getTodos(user_id, token).then((res) => {
      setFilteredTodos(res);
      setTodos(res);
    });
  };

  const handleDelete = async (task_id: string | null) => {
    await deleteTodo(task_id, token);

    await retrieveTodos();
  };
  const toggleComplete = async (task_id: string | null, completed: boolean) => {
    const newCompleted = !completed;
    await updateCompleteField(task_id, newCompleted, token);
    await retrieveTodos();
  };

  const toggleEdit = async (task_id: string | null, isEditing: boolean) => {
    const newEditingState = !isEditing;
    await updateEditingField(task_id, newEditingState, token);
    await retrieveTodos();
  };

  const handleEdit = async (
    task_id: string | null,

    isEditing: boolean,
    editText: string,
    editDate: string
  ) => {
    if (!editText || /^\s*$/.test(editText)) {
      return;
    }

    if (editDate === null || editDate === "") {
      return;
    }
    await updateTodo(task_id, editText, editDate, token);
    toggleEdit(task_id, isEditing);
    await retrieveTodos();
  };

  return (
    <div className="todo-container">
      <div className="tab">
        <button
          className={"todo-button1 " + currentTabClass}
          value="incomplete"
          onClick={(e: any) => {
            setStatus(e.target.value);
            setCurrentTabClass("incomplete");
          }}
        >
          INCOMPLETE
        </button>
        <button
          className={"todo-button2 " + currentTabClass}
          value="completed"
          onClick={(e: any) => {
            setStatus(e.target.value);
            setCurrentTabClass("completed");
          }}
        >
          COMPLETED
        </button>
        <button
          className={"todo-button3 " + currentTabClass}
          value="overdue"
          onClick={(e: any) => {
            setStatus(e.target.value);
            setCurrentTabClass("overdue");
          }}
        >
          OVERDUE
        </button>
        <button
          className={"todo-button4 " + currentTabClass}
          value="all"
          onClick={(e: any) => {
            setStatus(e.target.value);
            setCurrentTabClass("all");
          }}
        >
          ALL
        </button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            currentTime={currentTime}
            text={todo.text}
            date={todo.date}
            todos={todos}
            todo={todo}
            handleDelete={handleDelete}
            toggleComplete={toggleComplete}
            toggleEdit={toggleEdit}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
