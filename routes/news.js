const express = require("express");
const router = express.Router();
const {
  getNews,
  createNews,
  deleteNews,
  updateNews,
} = require("../controllers/news");
const checkAuth = require("../middleware/check-auth");

router.get("/", getNews);
router.post("/", checkAuth, createNews);
router.delete("/:id", checkAuth, deleteNews);
router.put("/:id", checkAuth, updateNews);

module.exports = router;
