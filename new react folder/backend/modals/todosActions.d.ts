export type GetAllTodos = {
  user_id: string | number | null;
};

export type AddTodo = {
  user_id: string | number | null;
  text: string;
  date: string;
  completed: boolean;
  overdue: boolean;
  isEditing: boolean;
};

export type UpdateTodo = {
  id: string;
  text: string;
  date: string;
};

export type UpdateComplete = {
  id: string;
  completed: boolean;
};

export type UpdateEditing = {
  id: string;
  isEditing: boolean;
};

export type DeleteTodo = {
  id: string;
};
