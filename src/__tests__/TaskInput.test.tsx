import { render, screen, fireEvent } from "@testing-library/react";
import TaskInput from "../components/TaskInput";
import { TaskProvider } from "../context/TaskProvider";

describe("TaskInput Component", () => {
  it("renders input field and button", () => {
    render(
      <TaskProvider>
        <TaskInput />
      </TaskProvider>
    );
    expect(screen.getByPlaceholderText(/enter your task/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  it("displays error for empty input", () => {
    render(
      <TaskProvider>
        <TaskInput />
      </TaskProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(screen.getByText(/task name is required/i)).toBeInTheDocument();
  });

  it("adds a task successfully", () => {
    render(
      <TaskProvider>
        <TaskInput />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText(/enter your task/i);
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(input).toHaveValue(""); // Input should reset
  });
});
