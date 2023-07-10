import * as userService from "../services/users.services.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { response, request } from "express";

export async function getAllUsers(req = request, res = response) {
  const users = await userService.getAllUsers();

  return res.json(users);
}

export async function addUser(req = request, res = response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userService.getUserByEmail(email);

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    
    const insert = await userService.addUser(req.body);
    return res.status(201).json({
      message: "User created",
      data: insert,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}

export async function login(req = request, res = response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Paso 1 - Verificar si el usuario existe
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Email is invalid",
      });
    }

    // Paso 2 - Verificar si la contraseña es correcta
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password is invalid",
      });
    }

    // Paso 3 - Generar el token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(200).json({
      message: "User logged",
      data: { user, token },
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
}
