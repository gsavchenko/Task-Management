import { useDeleteTaskMutation } from "../api/tasks";
import * as Models from "../models";

type TaskProps = {
  task: Models.Task;
};

export const Task = ({ task }: TaskProps) => {
  const { mutate } = useDeleteTaskMutation();

  const handleDelete = () => {
    mutate(task.id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {task.title}
      </h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="text-gray-500">
        <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p>
          Status:{" "}
          <span className="text-green-600 font-semibold">{task.status}</span>
        </p>
        <p>
          Category:{" "}
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            {task.category}
          </span>
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md opacity-10 hover:opacity-100 transition-opacity duration-300"
      >
        Delete
      </button>
    </div>
  );
};
