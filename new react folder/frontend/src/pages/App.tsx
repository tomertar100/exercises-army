import { useState, useEffect } from "react";
import "../styles/App.css";
import { getTodos } from "../axios";
import { Todo } from "../types/todo";
//importing components
import NewTaskForm from "../components/form";
import TodoList from "../components/todoList";

const App: React.FC = () => {
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
    alert("user logged out");
    window.location.href = "/";
  };

  const loggedUsername = sessionStorage.getItem("username");

  return (
    <div>
      <h1 className="user-title">To Do</h1>
      <h2 className="username-title">{loggedUsername}</h2>
      <button className="logout-button" onClick={() => onClikcLogout()}>
        Logout
      </button>
      <div className="App">
        <NewTaskForm setTodos={setTodos} setFilteredTodos={setFilteredTodos} />
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
};

export default App;
