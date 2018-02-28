const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const jwt = require("jwt-simple");
const passport = require("passport");
const config = require("../config");

router.post("/recipe", function(req, res, next) {
  const recipe = new Recipe({
    title: req.body.title,
    cost: req.body.cost
  });
  recipe.save().then(savedRecipe => {
    res.json(savedRecipe);
  });
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
    cost: req.body.cost
  };

  Recipe.findByIdAndUpdate(recipeId, update, (err, recipe) => {
    if (err) {
      res.json(err);
    }
    res.json(update);
  });
});

module.exports = router;
