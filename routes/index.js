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

/* 

Functions for getting data, use for when db is set up and ready:
USER DATA
router.get("/user/data", auth, async (req, res) => {
  try {
    const user = await myDB.getUser(req.session.email);
    res.send({ user: user });
  } catch (e) {
    console.error("Error", e);
    res.status(400).send({ err: e });
  }
});

PRODUCTS
router.get("/products", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const products = await myDB.getProductsList(req.session.email);
    res.send( {products: products} );
  } catch (e) {
    console.log("Error", e);
    res.status(400).send( { err: e } );
  }
});

SINGLE PRODUCT
router.get("/product/data/:id", async (req, res) => {
  const productId = req.params.id;
  req.session.productId = productId;
  const product = await myDB.getProduct(productId);
  res.redirect("/product")
});

GET SHOPPING CART
router.get("/view/cart", auth, async (req, res) => {
  try {
    const cart = await myDB.getCart(req.session.email);
    res.send( { cart: cart } )
  } catch(e) {
    console.log("Error", e);
    res.status(400).send( { err: e } );
  }
});

POST ROUTES SETUP

router.post("/register", async (req, res) => {
  try{
    const msg = await myDb.register(req.body);
    if(msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send( { register: msg } );
    }
  } catch (e) {
    res.status(400).send ( { err: e} );
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;

    const msg = await myDB.login(email, pwd);
    if( msg[0] === "success" ) {
      req.session.email = email;
      req.session.username = msg[1];
      res.sendStatus(200);
    } else {
      res.status(409).send ({ login: msg[0] });
    }
  } catch(e) {
    console.log("Error", e);
    res.status(400).send( { err: e } );
  }
}); 

router.post("/add/cart", async (req, res) => {
  //
})

router.post("/add/product", async (req, res) => {
  try {
    const msg = await myDB.createProduct(req.body);
    if (msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send( { product: msg } );
    }
  } catch(e) {
    res.status(400).send( { err: e } );
  }
});

*/
