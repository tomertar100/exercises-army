import react, { useRef, useEffect } from "react";

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
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

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
    if (!inputText || /^\s*$/.test(inputText)) {
      return;
    }

    if (inputDate === null || inputDate === "") {
      return;
    }
    setTodos([
      ...todos,
      {
        text: inputText,
        date: inputDate,
        completed: false,
        overdue: false,
        isEditing: false,
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
        className="todo-input"
        onChange={handleInputText}
        value={inputText}
        ref={inputRef}
      />
      <input
        type="date"
        className="todo-date-input"
        onChange={handleInputDate}
        value={inputDate}
      />

      <button onClick={handleSubmitTodo} type="submit" className="todo-button">
        <i>Add</i>
      </button>

      <select onChange={handleSelect}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
        <option value="overdue">Overdue</option>
      </select>
    </form>
  );
};

export default Form;
