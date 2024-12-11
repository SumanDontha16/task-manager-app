import { Task } from "../types/task";

export const dummyTasks: Task[] = [
  { id: Date.now() - 20000, text: "Buy groceries", completed: false },
  { id: Date.now() - 10000, text: "Attend meeting at 3 PM", completed: false },
  { id: Date.now(), text: "Finish React project", completed: true },
  { id: Date.now() + 10000, text: "Write documentation", completed: false },
  { id: Date.now() + 20000, text: "Team sync-up call", completed: false },
];