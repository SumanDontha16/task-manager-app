// Definition of the Task interface
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Interface for the TaskContextProps
export interface TaskContextProps {
  tasks: Task[];
  addTask: (text: string) => void;
  editTask: (taskId: number, newText: string) => void;
  toggleTaskCompletion: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
}
