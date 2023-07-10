import { pool } from "../database/config.js";

export async function getAllPosts() {
  const [posts] = await pool.query("SELECT * FROM Post");
  return posts;
}