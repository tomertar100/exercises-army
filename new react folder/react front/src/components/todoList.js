import react from "react";
//importing more components
import Todo from "./todo";

const TodoList = ({
  todos,
  setTodos,
  filteredTodos,
  setCurrentTime,
  currentTime,
}) => {
  return (
    <div className="todo-container">
      <ul className="todo">
        {filteredTodos.map((todo) => (
          <Todo
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            filteredTodos={filteredTodos}
            text={todo.text}
            date={todo.date}
            Key={todo.id}
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
