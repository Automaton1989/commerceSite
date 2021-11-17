const { MongoClient } = require("mongodb");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

const url =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@calendar.ancvz.mongodb.net/commercialSite?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useUnifiedTopology: true });
const db = client.db("commercialSite");
const users = db.collection("users");
//const products = db.collection("products");
//const carts = db.collection("carts");

async function getUser(email) {
  await client.connect();
  const user = await users.find({email:email}).toArray();
  return user;
  client.close();
}

module.exports = {
  getUser
};