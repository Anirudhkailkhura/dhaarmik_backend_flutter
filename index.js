const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const productRoute = require("./routers/products")
const authRoute = require("./routers/auth");
const userRoute = require("./routers/users");
const ordersRoute = require("./routers/users")
const port = 3000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/", authRoute)
app.use("/api/products", productRoute);
app.use("/api/ordes", ordersRoute);
app.use("/api/users", userRoute);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
