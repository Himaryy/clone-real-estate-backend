import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Log inputs
    console.log("Inputs:", { username, email, password: hashedPassword });

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("New User Created:", newUser);
    res.status(201).json("user Created Successfully");
  } catch (error) {
    // Log the full error stack for debugging
    console.error("Error in Register:", error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if exist
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });

    // check password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // Generate Cookie Token and send to user
    res.setHeader("Set-Cookie", "test=" + "myValue").json("succes");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed To Login!" });
  }
};

export const logout = (req, res) => {
  // DB OPERATION
};
