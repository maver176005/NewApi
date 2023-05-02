const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("News", newsSchema);
