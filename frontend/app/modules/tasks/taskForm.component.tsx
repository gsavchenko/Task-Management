import React, { useState } from "react";
import * as Models from "../models";
import { usePostTaskMutation } from "../api/tasks";

export const TaskForm = () => {
  const { error, mutate } = usePostTaskMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const task: Omit<Models.Task, "id"> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as "todo" | "inProgress" | "done",
      dueDate: new Date(formData.get("dueDate") as string),
      category: formData.get("category") as string,
    };

    mutate(task, {
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Create a New Task
      </h2>
      {error && <p className="text-red-500 mb-4">{error.message}</p>}

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-semibold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-semibold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-gray-700 font-semibold mb-2"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="block text-gray-700 font-semibold mb-2"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="category"
          className="block text-gray-700 font-semibold mb-2"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};
