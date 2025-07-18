import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import clearanceRoutes from "./src/routes/clearanceRoute.js";
import approvalRoutes from "./src/routes/approvalRoute.js";
import adminRoutes from "./src/routes/adminRoute.js";
import documentRoutes from "./src/routes/documentRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware to handle file uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clearance", clearanceRoutes);
app.use("/api/approval", approvalRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/documents", documentRoutes);

app.get("/", (req, res) =>
  res.send("Online Clearance API built by Edoho Daniel is running ✅")
);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
