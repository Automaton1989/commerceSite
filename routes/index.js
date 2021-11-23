const express = require("express");
const router = express.Router();

const myDB = require("../db/myDB.js");

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

/* GET USER DATA */
router.get("/user/data", async function(req, res) {
  try {
    const username = req.session.username;
    console.log("username in index: ", username);
    res.send({username: username});
  } catch(e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
  
})

router.get("/products", async function(req, res) {
    try {
    const products = await myDB.getProducts();
    res.send({data: products});
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});

router.get("/products/:query", async function(req, res) {
  console.log("IN INDEX.JS")
  try {
    const products = await myDB.getProducts();
    res.send({data: products});
    console.log("RETURNING FROM DB")
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({err: e});
  }
});

/* POST ROUTES */
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const pwd = req.body.pwd;

    const msg = await myDB.userLogin(email, pwd);
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

/* USER REGISTER */
router.post("/register", async (req, res) => {
  try{
    const msg = await myDB.registerUser(req.body);
    if(msg === "success") {
      res.sendStatus(200);
    } else {
      res.status(409).send( { msg: msg } );
    }
  } catch (e) {
    res.status(400).send ( { err: e} );
  }
});

/* SINGLE PRODUCT */
router.get("/product/data/:id", async (req, res) => {
  try{
    const productId = req.params.id;
    const myProduct = await myDB.getProduct(productId);
    if(myProduct.msg === "success") {
      res.send({data: myProduct.product});
    }
  } catch (e) {
    res.status(400).send({err : e});
  }
  
});


module.exports = router;

/* 

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
