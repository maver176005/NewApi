const News = require("../models/news");

exports.getNews = async (req, res) => {
  const news = await News.find();
  res.status(200).json(news);
};

exports.createNews = async (req, res) => {
  const { title, content } = req.body;
  const news = new News({
    title,
    content,
    creator: req.userData.userId,
  });
  await news.save();
  res.status(201).json({ message: "News created", news });
};

exports.deleteNews = async (req, res) => {
  const { id } = req.params;
  await News.deleteOne({ _id: id, creator: req.userData.userId });
  res.status(200).json({ message: "News deleted" });
};

exports.updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    if (news.creator.toString() !== req.userData.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    news.title = title;
    news.content = content;

    await news.save();

    res.status(200).json({ message: "News updated", news });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
