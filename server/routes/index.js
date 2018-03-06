var express = require("express");
var ndb = require("nutrient-database");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "hello" });
});

ndb.search(
  "cheese",
  "",
  "",
  "",
  "RsUolzVV2ccHjQFg04PQVHtwOQkZjWVv65Yp9fdu",
  function(err, response) {
    console.log(JSON.stringify(response));
  }
);

module.exports = router;
