import react from "react";

const Form = () => {
  return (
    <form>
      <input type="text" clasName="todo-input" />
      <input type="date" className="todo-date-input" />
      <button type="submit" className="todo-button">
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
