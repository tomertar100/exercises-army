import react from "react";
import TodoList from "./todoList";

const Form = ({
  inputText,
  setInputText,
  inputDate,
  setInputDate,
  todos,
  setTodos,
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
        id: Math.random() * 10000,
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
        clasName="todo-input"
        onChange={handleInputText}
      />
      <input
        type="date"
        className="todo-date-input"
        onChange={handleInputDate}
      />

      <button onClick={handleSubmitTodo} type="submit" className="todo-button">
        <i>+</i>
      </button>
      {/* <div className="selectOptions"> */}
      <select>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
      {/* </div> */}
    </form>
  );
};

export default Form;
