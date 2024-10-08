import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { useGetTaskQuery } from "~/modules/api/tasks";
import { Task } from "~/modules/tasks/task.component";
import { TaskForm } from "~/modules/tasks/taskForm.component";

export const meta: MetaFunction = () => {
  return [
    { title: "Tasks App" },
    {
      name: "description",
      content:
        "A simple task management app built with Remix and Tailwind CSS.",
    },
  ];
};

export default function Index() {
  const { error, data: tasks } = useGetTaskQuery();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  if (tasks)
    return (
      <div className="bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center py-8 text-blue-600">
          My Tasks
        </h1>
        <div className="container mx-auto px-4 mb-8">
          <button
            onClick={toggleForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {showForm ? "Hide Form" : "Add New Task"}
          </button>
          {showForm && <TaskForm />}
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        Oops... Something went wrong!
      </div>
    );

  return <div className="text-gray-500 text-center py-8">Loading...</div>;
}
