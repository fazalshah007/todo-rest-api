import express from "express";
import { signupController } from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { todoController, getAllTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js"
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", signupController);
router.post("/login", loginController);

router.post("/create",auth, todoController);
router.get("/all-todo",auth, getAllTodos);
router.post("/update/:id",auth, updateTodo);
router.get("/delete/:id",auth, deleteTodo);

export default router;