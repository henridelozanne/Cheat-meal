const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");

router.post("/recipe", function(req, res, next) {
  const recipe = new Recipe({
    title: req.body.title,
    type: req.body.type,
    difficulty: req.body.difficulty,
    budget: req.body.budget,
    steps: req.body.steps,

    advisedDrink: req.body.advisedDrink
    // creator = req.session.currentUser.name
  });
  recipe.save().then(savedRecipe => {
    res.json(savedRecipe);
  });

  // if (
  //   recipe.title === "" ||
  //   recipe.type === "" ||
  //   recipe.difficulty === "" ||
  //   recipe.budget === "" ||
  //   recipe.step1 === "" ||
  //   recipe.advisedDrink === ""
  // ) {
  //   res.json("recipe", {
  //     errorMessage: "Please fill in all the fields"
  //   });
  //   return;
  // }
});

router.get("/recipe", function(req, res, next) {
  Recipe.find({}, (err, recipes) => {
    if (err) {
      res.json(err);
    }
    res.json(recipes);
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
    advisedDrink: req.body.advisedDrink
    // creator: req.session.currentUser.name
  };

  Recipe.findByIdAndUpdate(recipeId, update, (err, recipe) => {
    if (err) {
      res.json(err);
    }
    res.json(update);
  });
});

module.exports = router;
