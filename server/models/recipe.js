const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: { type: String, required: [true, "You must give a title"] },
  type: String,
  difficulty: String,
  budget: String,
  steps: Array,
  recommendedDrink: String,
  // creator: String,
  picture: String,
  ingredients: [
    {
      name: String,
      quantity: Number,
      unit: String
    }
  ]
});

module.exports = mongoose.model("Recipe", recipeSchema);
