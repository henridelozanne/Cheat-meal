const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = cloudinaryStorage({
  cloudinary,
  folder: "my-images",
  allowedFormats: ["jpg", "png", "gif"]
});

const parser = multer({ storage });

// const caloriesApi = axios.create({
//   baseURL: "https://api.nal.usda.gov/ndb/reports/"
// });

router.post("/recipe", parser.single("picture"), function(req, res, next) {
  const { file } = req;
  console.log(
    "--------------------------------------------------------------------"
  );
  console.log(req.body.ingredients);
  const recipe = new Recipe({
    title: req.body.title,
    type: req.body.type,
    difficulty: req.body.difficulty,
    budget: req.body.budget,
    steps: req.body.steps,
    ingredients: req.body.ingredients,
    picture: file.secure_url,
    recommendedDrink: req.body.recommendedDrink
    // creator: root.user.name
  });
  recipe
    .save()
    .then(savedRecipe => {
      res.json({ savedRecipe, picture: user.picture });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });

  // if (
  //   recipe.title === "" ||
  //   recipe.type === "" ||
  //   recipe.difficulty === "" ||
  //   recipe.budget === "" ||
  //   recipe.step1 === "" ||
  //   recipe.recommendedDrink === ""
  // ) {
  //   res.json("recipe", {
  //     errorMessage: "Please fill in all the fields"
  //   });
  //   return;
  // }
});

router.get("/recipe", function(req, res, next) {
  Recipe.find({}, (err, recipe) => {
    if (err) {
      res.json(err);
    }
    res.json(recipe);
  });
});

router.get("/recipe/:id", function(req, res, next) {
  const recipeId = req.params.id;

  Recipe.findById(recipeId, (err, recipe) => {
    if (err) {
      res.json(err);
    }
    res.json(recipe);
  });
});

router.post("/recipe/:id/delete", function(req, res, next) {
  const recipeId = req.params.id;

  Recipe.findByIdAndRemove(recipeId, (err, recipe) => {
    if (err) {
      res.json(err);
    }
    res.json(recipe);
  });
});

router.post("/recipe/:id", function(req, res, next) {
  const recipeId = req.params.id;

  const update = {
    title: req.body.title,
    type: req.body.type,
    difficulty: req.body.difficulty,
    budget: req.body.budget,
    steps: req.body.steps,
    recommendedDrink: req.body.recommendedDrink
    // creator: req.session.currentUser.name
  };

  Recipe.findByIdAndUpdate(recipeId, update, (err, recipe) => {
    if (err) {
      res.json(err);
    }
    res.json(update);
  });
});

// caloriesApi
//   .get(
//     "?ndbno=01009&type=b&format=json&api_key=RsUolzVV2ccHjQFg04PQVHtwOQkZjWVv65Yp9fdu"
//   )
//   .then(res => {
//     const calorieValue = res.report.food.nutrients[4].value;

//     const calories = document.createElement("calories");
//     calories.innerText = calorieValue;
//   })
//   .catch(console.error);

module.exports = router;
