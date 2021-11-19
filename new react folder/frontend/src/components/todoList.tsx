import React from "react";
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
};

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  setCurrentTime,
  currentTime,
}: TodoListProps) => {
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
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
