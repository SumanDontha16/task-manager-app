import { createContext, ReactNode, useState } from "react";
import { Task, TaskContextProps } from "../types/task";
import { dummyTasks } from "../utils/dummyTasks";

// Create the context
const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Create the provider
const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([...dummyTasks]);

  // Add a new task
  const addTask = (text: string) => {
    if (text.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        text,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
  };
 // Edit an existing task
  const editTask = (taskId: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  //  Toggle the completion status of a task
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, toggleTaskCompletion, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
