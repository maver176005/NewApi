const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/config");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const checkAuth = require("./middleware/check-auth");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
