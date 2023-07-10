import express from "express";
import { getAllPosts } from "../controllers/posts.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const routes = express.Router();

routes.get("/", isAuthenticated, getAllPosts);

export default routes;