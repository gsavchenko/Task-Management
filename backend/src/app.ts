import express from "express";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
