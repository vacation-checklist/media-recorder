require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const questionRoutes = require("./routes/question");

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/media", require("./routes/media"));
app.use("/email", require("./routes/email")); // <-- Important
app.use("/questions", questionRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});