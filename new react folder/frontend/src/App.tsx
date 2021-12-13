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
  isediting: boolean;
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
      case "all":
        setFilteredTodos(todos);
        break;
      case "overdue":
        setFilteredTodos(todos.filter((todo) => todo.overdue === true));
        break;
      default:
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
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

  const onClikcLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
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
    <div>
      <h1 className="user-title">To Do</h1>
      <button className="logout-button" onClick={onClikcLogout}>
        Logout
      </button>
      <div className="App">
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
          setStatus={setStatus}
        />
      </div>
    </div>
  );
}

export default App;
