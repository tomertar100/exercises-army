import React, { useState, useEffect } from "react";
//importing more components
import TodoItem from "./todo";
import { Todo } from "../types/todo";

//typescript
type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  currentTime: Date;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  currentTime,
  setFilteredTodos,
  setStatus,
}: TodoListProps) => {
  //state

  const [currentTabClass, setCurrentTabClass] = useState<string>("all");

  //hooks

  useEffect(
    () => console.log("ToDoList filteredTodos: ", filteredTodos),
    [filteredTodos]
  );

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
            setTodos={setTodos}
            todo={todo}
            setFilteredTodos={setFilteredTodos}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
