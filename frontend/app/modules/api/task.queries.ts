import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Models from "../models";

const API_URL = "http://localhost:3000/api/tasks";

const fetchTasks = async (): Promise<Models.Task[]> => {
  const response = await axios.get<Models.Task[]>(API_URL);
  return response.data;
};

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};
