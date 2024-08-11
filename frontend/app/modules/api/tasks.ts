import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Models from "../models";

const API_URL = "http://localhost:3000/api/tasks";

const fetchTasks = async (): Promise<Models.Task[]> => {
  const response = await axios.get<Models.Task[]>(API_URL);
  return response.data;
};

const addTask = async (newTask: Omit<Models.Task, "id">) => {
  const response = await axios.post<Models.Task>(API_URL, newTask);
  return response.data;
};

const deleteTask = async (taskId: string) => {
  await axios.delete(`${API_URL}/${taskId}`);
};

export const taskKeys = {
  all: ["tasks"] as const,
};

export const useGetTaskQuery = () => {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: fetchTasks,
  });
};

export const usePostTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
