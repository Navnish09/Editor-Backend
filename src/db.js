const { MongoClient } = require("mongodb");
const envs = require("./envVariables");

const client = new MongoClient(envs.MONGO_URL)

const connectToDB = async () => {
    await client.connect();
    console.log("Connected to mongo db");
}

const getDB = (db = "Main") => {
    return client.db(db);
}

module.exports = {
  connectToDB,
  getDB
}