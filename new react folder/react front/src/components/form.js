import react from "react";
import TodoList from "./todoList";

const Form = ({
  inputText,
  setInputText,
  inputDate,
  setInputDate,
  todos,
  setTodos,
  status,
  setStatus,
}) => {
  const handleInputText = (e) => {
    const value = e.target.value;

    setInputText(value);
  };
  const handleInputDate = (e) => {
    const value = e.target.value;

    setInputDate(value);
  };

  const handleSubmitTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: inputText,
        date: inputDate,
        completed: false,
        overdue: false,
        id: Math.random() * 10000,
      },
    ]);
    setInputText("");
    setInputDate("");
  };

  const handleSelect = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        placeholder="Enter A Todo"
        type="text"
        clasName="todo-input"
        onChange={handleInputText}
        value={inputText}
      />
      <input
        type="date"
        className="todo-date-input"
        onChange={handleInputDate}
        value={inputDate}
      />

      <button onClick={handleSubmitTodo} type="submit" className="todo-button">
        <i>+</i>
      </button>
      {/* <div className="selectOptions"> */}
      <select onChange={handleSelect}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="overdue">Overdue</option>
      </select>
      {/* </div> */}
    </form>
  );
};

export default Form;
