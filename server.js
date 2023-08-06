const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();
const path = require("path")

dotenv.config();
connectDB();

app.use(express.json());

app.use("/user",userRoutes);
app.use("/payment",paymentRoutes);

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});


PORT = process.env.PORT || 5002;
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
