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
//const products = db.collection("products");
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
  }
}

module.exports = {
  getUser,
  userLogin,
};