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
//const carts = db.collection("carts");

async function getUser(email) {
  await client.connect();
  const user = await users.find({email:email}).toArray();
  return user;
  client.close();
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

module.exports = {
  getUser,
  userLogin,
  registerUser,
  getProducts,
  getProduct,
};