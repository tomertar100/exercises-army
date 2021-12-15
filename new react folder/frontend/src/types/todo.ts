export type Todo = {
  task_id: string | null;
  user_id: number | string | null;
  text: string;
  date: string;
  completed: boolean;
  overdue: boolean;
  isediting: boolean;
};
