const express = require('express');
const app = express();

const { connectDB } = require('./config/db');

app.use(express.json());

connectDB();

app.use("/api", require("./routes/app.route"));
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/todo", require("./routes/todo.route"));

//404 handler
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found", x
  });
});



module.exports = app;
