import { renderHook, act } from "@testing-library/react";
import { TaskProvider } from "../context/TaskProvider";
import useTasks from "../components/useTasks";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <TaskProvider>{children}</TaskProvider>
);

describe("TaskProvider", () => {
  it("provides default tasks", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    expect(result.current.tasks.length).toBeGreaterThan(0);
  });

  it("adds a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    act(() => {
      result.current.addTask("New Task");
    });
    expect(result.current.tasks).toContainEqual(
      expect.objectContaining({ text: "New Task" })
    );
  });

  it("toggles task completion", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.toggleTaskCompletion(taskId);
    });
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("edits a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.editTask(taskId, "Updated Task");
    });
    expect(result.current.tasks[0].text).toBe("Updated Task");
  });

  it("deletes a task", () => {
    const { result } = renderHook(() => useTasks(), { wrapper });
    const taskId = result.current.tasks[0].id;
    act(() => {
      result.current.deleteTask(taskId);
    });
    expect(result.current.tasks.find((task) => task.id === taskId)).toBeUndefined();
  });
});
