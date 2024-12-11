import { useState } from "react";
import useTasks from "./useTasks"

//structure of the task input form using TypeScript
interface TaskInputForm {
  taskName: string;
}

const TaskInput: React.FC = () => {
  // Task-related operations from the context
  const { addTask, tasks } = useTasks();

  // State to manage the form data and errors
  const [form, setForm] = useState<TaskInputForm>({ taskName: "" });
  const [errors, setErrors] = useState<{ taskName?: string }>({});

  // Form validation
  const validate = (): boolean => {
    const newErrors: { taskName?: string } = {};
    const specialCharRegex = /[^a-zA-Z0-9\s]/;

    // Task name validation
    if (!form.taskName.trim()) {
      newErrors.taskName = "Task name is required";
    } else if (form.taskName.length < 3) {
      newErrors.taskName = "Task name must be at least 3 characters long";
    } else if (specialCharRegex.test(form.taskName)) {
      newErrors.taskName = "Task name must not contain special characters";
    } else if (tasks.some(task => task.text.toLowerCase() === form.taskName.toLowerCase())) {
      newErrors.taskName = "Task name must be unique";
    }

    // Update the errors state
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addTask(form.taskName); // Add the task
      setForm({ taskName: "" }); // Reset the form
      setErrors({}); // Clear errors
    }
  };

  return (
    // Task input form
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          name="taskName"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.taskName ? "border-red-500" : ""
          }`}
          type="text"
          placeholder="Enter your task..."
          value={form.taskName}
          onChange={handleChange}
        />
        {/* Task name error message */}
        {errors.taskName && (
          <p className="text-red-500 text-xs italic mt-2">{errors.taskName}</p>
        )}
      </div>
      {/* Add task button */}
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;