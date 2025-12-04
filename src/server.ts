
import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middlewares/logger";
import { userRoutes } from "./modules/user/user.routes";
import router from "./modules/todo/todo.routes";
export const app = express();
const port = config.port;


//creating connection pool for postgrad sql
//! you must install pg by npm
//todo: for free database hosting use neon console
// Parser
app.use(express.json());




//initializing database
initDB();

// logger middleware


app.get("/", logger,(req: Request, res: Response) => {
  res.send("Hello World! 1");
});

//api to create new user on database
// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email, age, phone, address } = req.body;

//   try {
//     const result = await pool.query(
//       `
//           INSERT INTO users(name, email, age, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING *
//           `,
//       [name, email, age, phone, address]
//     );

//     res.status(201).json({
//       success: true,
//       message: "data inserted successfully....",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

app.use("/users",userRoutes);

//api to get all users

app.use("/users", userRoutes);

//get a specific user


app.use("/users", userRoutes)

//update a user


app.use("/users", userRoutes)

//delete a user



app.use("/users", userRoutes)

//todo crud

//create a todos

app.use("/todos", router)

//get all todos

app.use("/todos", router);



// Get single todo
app.use("/todos", router);


//update a todo
app.use("/todos", router);

//delete a todos

app.use("/todos", router);


//not found round

app.use((req:Request, res: Response)=>{
  res.status(404).json({
    success:false,
    message: 'route not found',
    path: req.path
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
