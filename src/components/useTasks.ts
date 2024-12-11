import { useContext } from "react";
import { TaskContext } from "../context/TaskProvider";
import { TaskContextProps } from "../types/task";

// Custom hook to use the tasks context
const useTasks = (): TaskContextProps => {
  const context = useContext(TaskContext);
  // Throw an error if the context is undefined
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  // Return the context
  return context;
};

export default useTasks;
