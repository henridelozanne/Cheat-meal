const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const usdaIngredientSchema = new Schema({
  name: String,
  ndbno: { type: String, index: { unique: true } }
});

module.exports = mongoose.model("UsdaIngredient", usdaIngredientSchema);
