import express from "express";
import Article from "./../models/articles.js";
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article === null) res.redirect("/");
  res.render("articles/show", { article: article });
});
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    res.render("articles/new", { article: article });
  }
  await article.save();
});
export default router;