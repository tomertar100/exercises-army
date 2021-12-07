import React, { useState, useEffect } from "react";
import "./App.css";
import { getTodos } from "./axios";

//importing components
import Form from "./components/form";
import TodoList from "./components/todoList";

//room for types

export type Todo = {
  task_id: string | null;
  user_id: number | string | null;
  text: string;
  date: string;
  completed: boolean;
  overdue: boolean;
  isEditing: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const filterHandle = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      case "overdue":
        setFilteredTodos(todos.filter((todo) => todo.overdue === true));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const retrieveTodos = () => {
    const token = sessionStorage.getItem("JWT");
    const user_id = sessionStorage.getItem("user_id");
    getTodos(user_id, token).then((res) => {
      setFilteredTodos(res);
      setTodos(res);
      console.log("fetching response: ", res);
      console.log("todos after fetching: ", todos);
    });
  };

  useEffect(() => {
    retrieveTodos();
  }, []);

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  useEffect(
    () => console.log("todos - after change to todos: ", todos),
    [todos]
  );

  useEffect(() => {
    filterHandle();
  }, [todos, status]);

  return (
    <div className="App">
      <h1>ToDo's</h1>

      <Form
        todos={todos}
        setTodos={setTodos}
        status={status}
        setStatus={setStatus}
        setFilteredTodos={setFilteredTodos}
      />
      <TodoList
        setCurrentTime={setCurrentTime}
        currentTime={currentTime}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
        setFilteredTodos={setFilteredTodos}
      />
    </div>
  );
}

export default App;
