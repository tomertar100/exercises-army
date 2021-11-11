import react from "react";
//importing more components
import Todo from "./todo";

const TodoList = ({ todos, setTodos }) => {
  return (
    <div className="todo-container">
      <ul className="todo">
        {todos.map((todo) => (
          <Todo
            text={todo.text}
            date={todo.date}
            key={todo.id}
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
