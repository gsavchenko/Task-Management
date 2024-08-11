import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
