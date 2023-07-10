import * as postsService from "../services/posts.services.js";
import { response, request } from "express";

export async function getAllPosts(req = request, res = response) {
  return res.json({ message: "Hola mundo" });
  const posts = await postsService.getAllPosts();
  
  return res.json(posts);
}