import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../components/TaskList";
import { TaskProvider } from "../context/TaskProvider";

describe("TaskList Component", () => {
  it("renders tasks in a table", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it("toggles task completion", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );
    const task = screen.getByText(/buy groceries/i); // Dummy task
    fireEvent.click(task);
    expect(task).toHaveClass("cursor-pointer");
  });

  it("edits a task", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );
    const editButton = screen.getAllByText(/edit/i)[0];
    fireEvent.click(editButton);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated Task" } });

    const saveButton = screen.getByText(/save/i);
    fireEvent.click(saveButton);

    expect(screen.getByText(/updated task/i)).toBeInTheDocument();
  });

  it("deletes a task", () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    );
    const deleteButton = screen.getAllByText(/delete/i)[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/buy groceries/i)).not.toBeInTheDocument();
  });
});
