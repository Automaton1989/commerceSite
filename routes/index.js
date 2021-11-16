var express = require("express");
var router = express.Router();

//DB CONNECTION HERE ---

/* AUTH CONNECTION HERE */
const auth = (req, res, next) => {
  if(!req.session.email) {
    return res.redirect("index.html")
  }
  next();
}


/* GET ROUTES */
router.get("/", function(req, res) {
  res.status(200).json();
})

router.get("/user/data", function(req, res) {
  res.status(200).json();
})

router.get("/products", function(req, res) {
  res.status(200).json([1, 2, 3]);
});

/* POST ROUTES */


module.exports = router;
