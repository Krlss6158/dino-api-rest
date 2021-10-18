import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import usersRoutes from "./routes/panel/user.routes";
import authRoutes from "./routes/auth.routes";

import { createRoles, createAdmin} from "./libs/initialSetup";

const app = express();
createRoles();
createAdmin();

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome Routes
app.get("/", (req, res) => {
  res.send('Hellow 🚀')
});

// Routes
app.use("/api/panel/users", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;
