import express from "express";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173", // TODO: DO NOT HARDCODE FOR PRODUCTION
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

export default app;
