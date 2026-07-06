require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/media", require("./routes/media"));
app.use("/email", require("./routes/email")); // <-- Important

app.listen(5000, () => {
  console.log("Server running on port 5000");
});