const express = require("express");
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const productRoute = require("./routers/products");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/users");
const cartRoute = require("./routers/cart");
const ordersRoute = require("./routers/users");

const port = 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(morgan("combined"));
app.use(cors())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/", authRoute);
app.use("/api/products", productRoute);
app.use("/api/ordes", ordersRoute);
app.use("/api/cart", cartRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
