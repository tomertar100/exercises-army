import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  // eslint-disable-next-line
  const [todos, setTodos] = useState([]);

  const addToDo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    if (todo.date === null || todo.date === "") {
      return;
    }

    setTodos([todo, ...todos]);
  };

  const removeTodo = (id) => {
    const removeArray = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArray);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>My To-Do List: </h1>
      <TodoForm onSubmit={addToDo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
    </div>
  );
}

export default TodoList;
