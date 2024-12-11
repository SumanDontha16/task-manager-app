import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { TaskProvider } from './context/TaskProvider'

const App: React.FC = () => { 
  return (
    <TaskProvider>
      <div className="flex flex-col items-center min-h-screen bg-gray-100">
  {/* Task Manager Header and Input */}
  <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 w-full max-w-xl sticky top-0 z-10 mb-4 sm:mb-8 mt-4 sm:mt-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Task Manager</h2>
    <TaskInput />
  </div>
  
  {/* Task List */}
  <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 w-full max-w-3xl overflow-auto">
    <TaskList />
  </div>
</div>
    </TaskProvider>
  );
};

export default App
