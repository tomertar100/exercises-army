export type getAllTodos = {
  task_id: number;
  user_id: number;
  text: string;
  date: string;
  completed: boolean;
  overdue: boolean;
  isEditing: boolean;
};
