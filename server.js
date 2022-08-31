import express, { text, urlencoded } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import articleRouter from "./routes/articlesRoute.js";
import Article from "./models/articles.js";
import methodOverride from "method-override";

const app = express();
dotenv.config();

mongoose.connect(process.env.CONNECT_DB, () => {
  console.log("connection to db successful!🚀");
});
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);

app.listen(process.env.PORT, () => {
  console.log("Sever running on locahost:8000");
});
