const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require('./routes/userRoutes')
const cors = require("cors");

const PORT = 5001

const app = express();


app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/todo", todoRoutes);
app.use("/api/user",userRoutes)

app.get("/", (req, res) => {
  res.send("hello from server");
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something internal !");
});

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
