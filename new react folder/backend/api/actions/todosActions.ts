import {
  getAllTodosSql,
  addTodoSql,
  updateTodoSql,
  deleteTodoSql,
} from "../../sql/todosActionsSql";

export async function getAllTodos() {
  return await getAllTodosSql;
}

export async function addTodo(text, date, completed, overdue, isEditing) {
  return await addTodoSql(text, date, completed, overdue, isEditing);
}

export async function updateTodo(id, text, date) {
  return await updateTodoSql(id, text, date);
}

export async function deleteTodo(id) {
  return await deleteTodoSql(id);
}
