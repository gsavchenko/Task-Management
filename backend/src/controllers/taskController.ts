import { Request, Response } from "express";
import prisma from "../config/database";
import asyncHandler from "../middleware/asyncHandler";

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

export const getTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id },
  });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
});

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await prisma.task.create({
    data: req.body,
  });
  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(task);
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await prisma.task.delete({
    where: { id: req.params.id },
  });
  res.status(204).end();
});
