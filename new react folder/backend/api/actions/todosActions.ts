import {
  getAllTodosSql,
  addTodoSql,
  updateTodoSql,
  updateCompleteSql,
  updateEditingTodoSql,
  deleteTodoSql,
} from "../../sql/todosActionsSql";
import {
  GetAllTodos,
  AddTodo,
  UpdateTodo,
  UpdateComplete,
  UpdateEditing,
  DeleteTodo,
} from "../../models/todosActions";

export async function getAllTodos({ user_id }: GetAllTodos) {
  return await getAllTodosSql({ user_id });
}

export async function addTodo({
  user_id,
  text,
  date,
  completed,
  overdue,
  isEditing,
}: AddTodo) {
  return await addTodoSql({
    user_id,
    text,
    date,
    completed,
    overdue,
    isEditing,
  });
}

export async function updateTodo({ id, text, date }: UpdateTodo) {
  return await updateTodoSql({ id, text, date });
}

export async function updateComplete({ id, completed }: UpdateComplete) {
  return await updateCompleteSql({ id, completed });
}

export async function updateEditingTodo({ id, isEditing }: UpdateEditing) {
  return await updateEditingTodoSql({ id, isEditing });
}

export async function deleteTodo({ id }: DeleteTodo) {
  return await deleteTodoSql({ id });
}
