import path from "path";
import express from "express";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { seedAdmin } from "./seeders/admin.seeder.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.route.js";
import morgan from 'morgan'
import cors from "cors";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/upload", express.static(path.join(process.cwd(), "upload")));

// Routes
app.use('/admin', adminRoutes);
app.use('/', userRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);

    console.log("MongoDB connected");

    await seedAdmin();

    app.listen(env.PORT, () => {
      console.log(`Server running at ${env.BASE_URL}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
