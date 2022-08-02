import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRoutes from "./routes/usersRoute.js";
import authRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log(`connected to db`);
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

// app.use("api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connectToMongo();
  console.log(`connected to api`);
});
