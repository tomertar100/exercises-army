import React, { useState, useEffect } from "react";
import "./App.css";
//importing components
import Form from "./components/form.js";
import TodoList from "./components/todoList.js";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => console.log(todos), [todos]);

  return (
    <div className="App">
      <h1>ToDo's</h1>

      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        inputDate={inputDate}
        setInputDate={setInputDate}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        inputText={inputText}
        inputDate={inputDate}
      />
    </div>
  );
}

export default App;
