import {
  getAllTodosSql,
  addTodoSql,
  updateTodoSql,
  updateCompleteSql,
  updateEditingTodoSql,
  deleteTodoSql,
} from "../../sql/todosActionsSql";

export async function getAllTodos(user_id: string | number | null) {
  return await getAllTodosSql(user_id);
}

export async function addTodo(
  user_id: string | number | null,
  text: string,
  date: string,
  completed: boolean,
  overdue: boolean,
  isEditing: boolean
) {
  return await addTodoSql(user_id, text, date, completed, overdue, isEditing);
}

export async function updateTodo(id: string, text: string, date: string) {
  return await updateTodoSql(id, text, date);
}

export async function updateComplete(id: string, completed: boolean) {
  return await updateCompleteSql(id, completed);
}

export async function updateEditingTodo(id: string, isEditing: boolean) {
  return await updateEditingTodoSql(id, isEditing);
}

export async function deleteTodo(id: string) {
  return await deleteTodoSql(id);
}
