import React from "react";
import "./App.css";
//importing components
import Form from "./components/form.js";
import TodoList from "./components/todoList.js";

function App() {
  return (
    <div className="App">
      <h1>ToDo's</h1>
      <Form />
      <TodoList />
    </div>
  );
}

export default App;
