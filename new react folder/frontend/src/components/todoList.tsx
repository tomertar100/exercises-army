import React, { useEffect } from "react";
//importing more components
import TodoItem from "./todo";
import { Todo } from "../App";

//typescript
type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  setCurrentTime: React.Dispatch<React.SetStateAction<Date>>;
  currentTime: Date;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  setCurrentTime,
  currentTime,
  setFilteredTodos,
  setStatus,
}: TodoListProps) => {
  useEffect(
    () => console.log("ToDoList filteredTodos: ", filteredTodos),
    [filteredTodos]
  );

  return (
    <div className="todo-container">
      <div className="tab">
        <button
          value="incomplete"
          onClick={(e: any) => setStatus(e.target.value)}
        >
          Incomplete
        </button>
        <button
          value="completed"
          onClick={(e: any) => setStatus(e.target.value)}
        >
          Completed
        </button>
        <button value="overdue" onClick={(e: any) => setStatus(e.target.value)}>
          Overdue
        </button>
        <button value="all" onClick={(e: any) => setStatus(e.target.value)}>
          All
        </button>
      </div>
      <ul className="todo">
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
