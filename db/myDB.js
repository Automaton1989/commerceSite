const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const url =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@calendar.ancvz.mongodb.net/commercialSite?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("commercialSite"); 
/* If you want to test from our user collecion, change above to "calendar" db */
const users = db.collection("users");
const products = db.collection("products");
const carts = db.collection("carts");

async function getUser(username) {
  await client.connect();
  try {
    console.log(username);
    const user = await users.findOne({ userName : username });
    return user;
  } catch(e) {
    console.log(e)
  } finally {
    client.close();
  }
}

async function userLogin(email, pwd) {
  await client.connect();
  const user = await users.findOne({ email: email });
  if (!user) {
    return ["User not exists, please register first"];
  }
  try {
    if (await bcrypt.compare(pwd, user.pwd)) {
      console.log(user);
      return ["success", user.userName];
    } else {
      return ["Wrong password or email address, please try again"];
    }
  } catch (e) {
    console.log({ Error: e });
  } finally {
    client.close();
  }
}

/* REGISTER NEW USER INTO DB */
async function registerUser(userInfo) {
  await client.connect();
  const user = await users.findOne({ email: userInfo.email });
  if (user) {
    return "The email exists, please use another email address";
  }
  try {
    const hashedPassword = await bcrypt.hash(userInfo.pwd, 10);
    const newData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      userName: userInfo.userName,
      email: userInfo.email,
      pwd: hashedPassword,
    };
    await users.insertOne(newData);
    return "success";
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function getProducts() {
  await client.connect();
  const res = await products.find().toArray();
  try {
    return res;
  } catch(e) {
    console.log(e)
  } finally {
    client.close();
  }
}

async function getProductsQuery(query) {
  await client.connect();
  console.log("USING QUERY -> QUERY TO DB: ", query);
  const res = await products.find({name: {$regex: query, $options: "$i"}}).toArray();
  console.log(res);
  try {
    return res;
  } catch(e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function getProduct(id) {
  await client.connect();
  try {
    const product = await products.findOne({"_id": new ObjectId(id)});
    console.log("Product in my db: ", product);
    return {product: product, msg: "success"};
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

async function addProductToCart(productInfo, user) {
  await client.connect();
  try {
    console.log(productInfo);
    const product = await products.findOne({"_id": new ObjectId(productInfo.id)});
    if(product == null) {
      console.log("PROBLEM")
      return {msg: "Fail"};
    }
    else {
      console.log("CHECKING CART")
      let checkCart = await carts.findOne({"product": product._id});
      if(checkCart == null) {
        console.log("NO CART")
        const newUser = await users.findOne({"userName": user});
        const newData = {
          product: product._id,
          userName: newUser.userName,
          price: product.price,
          name: product.name,
          number: 1
        }
        await carts.insertOne(newData);
      } else {
        console.log("CART FOUND")
        newVal = checkCart.number + 1;
        await carts.updateOne({"_id": checkCart._id}, {$set: {"number": newVal}});
      }
      return {msg : "success"}
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* GET USER CART INFO */
async function userCart(username) {
  if (!username) {return [];}
  await client.connect();
  try {
    const userCart = await carts.find({userName: username}).toArray();
    console.log("cart in db:", userCart);
    return userCart;
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

/* DELETE PRODUCT FROM THE CART */
async function deleteProduct(id) {
  await client.connect();
  try {
    const product = await carts.remove({_id: ObjectId(id)}, true); //set the justOne parameter to true
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
}

module.exports = {
  getUser,
  userLogin,
  registerUser,
  getProducts,
  getProduct,
  getProductsQuery,
  userCart,
  deleteProduct,
  addProductToCart,
};