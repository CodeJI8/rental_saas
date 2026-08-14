const { response } = require("express");
const prisma = require("../config/prisma");
const jwt =require("jsonwebtoken")
const jwtKey = "token"


const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      orgId: user.orgId,
      
    },
    jwtKey,
    {
      expiresIn: "2h",
    }
  );
};

const register = async (req, res) => {
  try {
    const { name, password, email, orgName } = req.body;

        console.log("REGISTER BODY:", req.body);
    const organization = await prisma.organization.create({
      data: {
        name: orgName,
      },
    });

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
        orgId: organization.id,
      },
    });

      const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (password !== user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
     const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        orgId: user.orgId,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

module.exports = {
  login,
  register,
};
