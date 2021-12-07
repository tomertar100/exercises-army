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
};

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  setCurrentTime,
  currentTime,
  setFilteredTodos,
}: TodoListProps) => {
  useEffect(
    () => console.log("ToDoList filteredTodos: ", filteredTodos),
    [filteredTodos]
  );

  return (
    <div className="todo-container">
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
