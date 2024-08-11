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

export const useGetTaskQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};

export const usePostTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
