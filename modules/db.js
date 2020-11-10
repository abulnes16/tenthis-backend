/* Database module */

//Mongoose
const mongoose = require("mongoose");
require("colors");

/**
 *  Database class
 */
class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    const localURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    const uri = process.env.NODE_ENV === "prod" ? process.env.DB_URI : localURI;
    const config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    try {
      await mongoose.connect(uri, config);
      console.log("[DB]:Mongodb connected".green);
    } catch (error) {
      console.log("[DB]:", error.red);
    }
  }
}

module.exports = new Database();
