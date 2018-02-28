const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: String,
  cost: String
});

module.exports = mongoose.model("Recipe", recipeSchema);
