import {
  getAllTodosSql,
  addTodoSql,
  updateTodoSql,
  updateCompleteSql,
  deleteTodoSql,
} from "../../sql/todosActionsSql";

export async function getAllTodos(user_id) {
  return await getAllTodosSql(user_id);
}

export async function addTodo(
  user_id,
  text,
  date,
  completed,
  overdue,
  isEditing
) {
  return await addTodoSql(user_id, text, date, completed, overdue, isEditing);
}

export async function updateTodo(id, text, date) {
  return await updateTodoSql(id, text, date);
}

export async function updateComplete(id, complete) {
  return await updateCompleteSql(id, complete);
}

export async function deleteTodo(id) {
  return await deleteTodoSql(id);
}
