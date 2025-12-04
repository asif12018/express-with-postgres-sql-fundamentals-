
import  express  from 'express';
import { todoController } from './todo.controller';

const router = express.Router();

router.post("/",todoController.createTodo);

router.get("/", todoController.getAllTodo);

router.get("/:id", todoController.getSingleTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);



export default router;