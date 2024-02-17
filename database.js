const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

let mongod = null;

const connectDB = async (callback) => {
  try {
    let dbUrl = `${MONGODB_URI}/bookstore`;
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }
    const conn = await mongoose.connect(dbUrl);
    if (typeof callback === "function") {
      callback();
    }
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
