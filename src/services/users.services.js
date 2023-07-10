import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../database/config.js";

export async function getAllUsers() {
  const [users] = await pool.query("SELECT * FROM User");
  return users;
}

export async function getUserById(id) {
  const [users] = await pool.query("SELECT * FROM User WHERE id = ?", id);
  return users[0];
}

export async function getUserByEmail(email) {
  const [users] = await pool.query("SELECT * FROM User WHERE email = ?", email);
  return users[0];
}

export async function addUser(data) {
  const id = uuidv4();
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  data = { ...data, id, password };
  await pool.query("INSERT INTO User SET ?", data);
  const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
  return { user: data, token };
}
