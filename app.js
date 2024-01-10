//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent =
  "Greetings! I'm Ayush Dhanraj, a passionate Software Developer based in Lucknow, India. Currently pursuing my Master's in Computer Science and Engineering, specializing in AI and Data Science at MNNIT Allahabad. With a focus on mobile and app-based solutions, I thrive on transforming ideas into seamless digital experiences. My journey reflects a commitment to staying ahead in the dynamic tech landscape, where creativity meets innovation. Explore my projects and discover the intersection of technology and user-centric design that defines my approach to software development.";
const aboutContent =
  "Hello, I'm Ayush Dhanraj, a mobile and app-based Software Developer from Lucknow, India. Currently pursuing an MTech in AI and Data Science at MNNIT Allahabad, I'm dedicated to crafting innovative digital solutions. My passion lies in creating seamless user experiences through cutting-edge technology. Explore my journey and projects to witness the intersection of creativity and technology in my software development endeavors.";
const contactContent =
  "dhanrajaayush123@gmail.com | ayushdhanraj.work@gmail.com";

const app = express();
const posts = [];

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    staringContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/posts/:post", function (req, res) {
  const nPost = lodash.lowerCase(req.params.post);
  posts.forEach((element) => {
    const cPost = lodash.lowerCase(element.title);
    if (cPost === nPost) {
      res.render("post", { newPost: element });
      console.log("Match!");
    } else {
      console.log("Not a match!");
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  //  console.log(posts);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
