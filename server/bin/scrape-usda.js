require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");
const UsdaIngredient = require("../models/usdaIngredients");
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://localhost/tweeter");

let nbOfIterations = 0;

UsdaIngredient.deleteMany().then(() => {
  let total = 9000;
  let step = 1500;
  for (let offset = 0; offset < 9000; offset += step) {
    nbOfIterations++;
    axios
      .get("https://api.nal.usda.gov/ndb/search/", {
        params: {
          foo: "bar",
          format: "json",
          q: "",
          sort: "r",
          max: 1500,
          offset: offset,
          api_key: "RsUolzVV2ccHjQFg04PQVHtwOQkZjWVv65Yp9fdu",
          ds: "Standard Reference"
        }
      })
      .then(response => {
        console.log("GET data - offset = ", offset);
        let dataToInsert = response.data.list.item.map(x => ({
          name: x.name,
          ndbno: x.ndbno
        }));
        return UsdaIngredient.create(dataToInsert);
      })
      .then(val => {
        console.log("Success, nb of values pushed: ", val.length);
        nbOfIterations--;
        if (nbOfIterations === 0) {
          mongoose.disconnect();
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
});
