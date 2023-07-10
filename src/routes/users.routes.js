import express from "express";
import { addUser, getAllUsers, login } from "../controllers/users.controller.js";
const routes = express.Router();

routes.get("/", getAllUsers);

routes.post("/signup", addUser);

routes.post("/login", login);

export default routes;
