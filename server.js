import express, { text, urlencoded } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import articleRouter from "./routes/articles.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.CONNECT_DB, () => {
  console.log("connection to db successful!🚀");
});
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test description",
    },
  ];
  res.render("/articles/index", { articles: articles });
});
app.use("/articles", articleRouter);

app.listen(process.env.PORT, () => {
  console.log("Sever running on locahost:5000");
});
