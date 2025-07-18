import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import { generateToken } from "../utils/jwt.js";

//Register a new user (Student, Officer, or Admin)
export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    matricNo,
    department,
    faculty,
    position,
  } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        ...(role === "STUDENT" && {
          student: {
            create: {
              matricNo,
              department,
              faculty,
            },
          },
        }),
        ...(role === "OFFICER" && {
          officer: {
            create: {
              position,
              department,
              faculty,
            },
          },
        }),
      },
    });

    const token = generateToken(user);
    res
      .status(201)
      .json({
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

//Login existing user

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({
      user: { id: user.id, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
