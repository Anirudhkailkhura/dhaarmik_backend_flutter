const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
      location: req.body.location,
    });

    try {
      await newUser.save();
      res.status(201).json({ message: "User successfully created" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({ error: "Could not find the user" });
      }
  
      const decryptedpass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
      const thepassword = decryptedpass.toString(CryptoJS.enc.Utf8);
  
      if (thepassword !== req.body.password) {
        return res.status(401).json({ error: "Wrong Password" });
      }
  
      const userToken = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
        expiresIn: "21d",
      });
  
      const { password, __v, createdAt, ...others } = user._doc;
      res.status(200).json({ ...others, token: userToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to login the user", details: error.message });
    }
  },
  
};
