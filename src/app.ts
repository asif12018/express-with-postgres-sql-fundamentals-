import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middlewares/logger";
import { userRoutes } from "./modules/user/user.routes";
import router from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.route";
export const app = express();


//creating connection pool for postgrad sql
//! you must install pg by npm
//todo: for free database hosting use neon console
// Parser
app.use(express.json());

//initializing database
initDB();

// logger middleware

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World! 1");
});

//api to create new user on database

app.use("/users", userRoutes);

//api to get all users

app.use("/users", userRoutes);

//get a specific user

app.use("/users", userRoutes);

//update a user

app.use("/users", userRoutes);

//delete a user

app.use("/users", userRoutes);

//todo crud

//create a todos

app.use("/todos", router);

//get all todos

app.use("/todos", router);

// Get single todo
app.use("/todos", router);

//update a todo
app.use("/todos", router);

//delete a todos

app.use("/todos", router);

//auth routes

app.use("/auth", authRoutes);

//not found round

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "route not found",
    path: req.path,
  });
});

export default app