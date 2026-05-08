import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }
};

export default protect;