
import express, { NextFunction, Request, Response } from "express";
import { Pool } from "pg";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middlewares/logger";
import { userRoutes } from "./modules/user/user.routes";
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

//create a todo
app.post("/todos", async(req: Request, res: Response)=>{
  const {user_id, title} = req.body;
  try{
     const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING*`, [user_id, title]);
     res.status(201).json({
      success:true,
      message: 'todo added successfully..',
      data: result.rows[0]
     })
  }catch(err: any){
    res.status(500).json({
      success:false,
      message: err.message,
      details: err
    })
  }
})

//get all todos

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM todos
      `);

    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
});

// todos crud
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);

    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      datails: err,
    });
  }
});

// Get single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// Update todo
app.put("/todos/:id", async (req, res) => {
  const { title, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
      [title, completed, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});


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
