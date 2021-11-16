import React, { useState, useEffect } from "react";
import "./App.css";
//importing components
import Form from "./components/form.js";
import TodoList from "./components/todoList.js";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const today =
    currentTime.getDate() +
    "-" +
    (currentTime.getMonth() + 1) +
    "-" +
    currentTime.getFullYear();

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

  useEffect(() => console.log(todos), [todos]);

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  useEffect(() => {
    filterHandle();
  }, [todos, status]);

  return (
    <div className="App">
      <h1 display="block">ToDo's</h1>

      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        inputDate={inputDate}
        setInputDate={setInputDate}
        status={status}
        setStatus={setStatus}
      />
      <TodoList
        setCurrentTime={setCurrentTime}
        currentTime={currentTime}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
        inputText={inputText}
        inputDate={inputDate}
      />
    </div>
  );
}

export default App;
