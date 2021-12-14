import { useState, useEffect } from "react";
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

  //states
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>("all");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  //hooks

  useEffect(() => {
    retrieveTodos();
  }, []);

  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  useEffect(() => {
    filterHandle();
  }, [todos, status]);

  //functions

  const retrieveTodos = () => {
    const token = sessionStorage.getItem("JWT");
    const user_id = sessionStorage.getItem("user_id");
    getTodos(user_id, token).then((res) => {
      setFilteredTodos(res);
      setTodos(res);
    });
  };

  const onClikcLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h1 className="user-title">To Do</h1>
      <button className="logout-button" onClick={onClikcLogout}>
        Logout
      </button>
      <div className="App">
        <Form setTodos={setTodos} setFilteredTodos={setFilteredTodos} />
        <TodoList
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
