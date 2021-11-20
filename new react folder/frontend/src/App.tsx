import React, { FC, useState, useEffect } from "react";
import "./App.css";

//importing components
import Form from "./components/form";
import TodoList from "./components/todoList";

//room for types

export type Todo = {
  text: string;
  date: string;
  completed: boolean;
  overdue: boolean;
  isEditing: boolean;
  id: number;
};

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");
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

  useEffect(() => console.log(todos), [todos]);

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  useEffect(() => {
    filterHandle();
  }, [todos, status]);

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
        status={status}
        setStatus={setStatus}
      />
      <TodoList
        setCurrentTime={setCurrentTime}
        currentTime={currentTime}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
