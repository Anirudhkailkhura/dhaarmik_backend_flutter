const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    // Fix: Use split(" ") instead of split(" ")(1)
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ error: "You are not authenticated" });
  }
};

module.exports = { verifyToken };
