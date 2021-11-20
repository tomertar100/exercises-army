import React, { useEffect } from "react";
import { Todo } from "../App";

//types

type FormProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  inputDate: string;
  setInputDate: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Form = ({
  inputText,
  setInputText,
  inputDate,
  setInputDate,
  todos,
  setTodos,
  status,
  setStatus,
}: FormProps) => {
  const handleSubmitTodo = (e: any) => {
    e.preventDefault();
    if (!inputText || /^\s*$/.test(inputText)) {
      return;
    }

    if (inputDate === null || inputDate === "") {
      return;
    }
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: inputText,
        date: inputDate,
        completed: false,
        overdue: false,
        isEditing: false,
      },
    ]);
    setInputText("");
    setInputDate("");
  };

  return (
    <form>
      <input
        placeholder="Enter A Todo"
        type="text"
        className="todo-input"
        onChange={(e: any) => setInputText(e.target.value)}
        value={inputText}
      />
      <input
        type="date"
        className="todo-date-input"
        onChange={(e: any) => setInputDate(e.target.value)}
        value={inputDate}
      />

      <button onClick={handleSubmitTodo} type="submit" className="todo-button">
        <i>Add</i>
      </button>

      <select onChange={(e: any) => setStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="overdue">Overdue</option>
      </select>
    </form>
  );
};

export default Form;
