import react from "react";

const Todo = ({ text, date, todos, setTodos, todo }) => {
  const handleDelete = () => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };
  const toggleComplete = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      <li className="todo-item">
        <p id="text">{text}</p>
        <p id="date">{date}</p>
      </li>
      <button className="edit-button">edit</button>
      <button onClick={toggleComplete} className="complete-button">
        complete
      </button>
      <button onClick={handleDelete} className="delete-button">
        delete
      </button>
    </div>
  );
};

export default Todo;
