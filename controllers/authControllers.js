const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    const { username, email, password, location } = req.body;

    try {
      const saltRounds = 10; // You can adjust the number of salt rounds according to your security requirements
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        location,
      });

      await newUser.save();
      res.status(201).json({ message: "User successfully created" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ error: "Could not find the user" });
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Wrong password" });
      }

      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
        expiresIn: "21d",
      });

      const { password, __v, updatedAt, createdAt, ...others } = user._doc;
      res.status(200).json({ ...others, token: userToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to login", details: error.message });
    }
  },
};
