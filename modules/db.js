const mongoose = require('mongoose');
require('colors');

class Database {


  constructor(){
    this.connect();
  }

  async connect(){

    const localURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    const uri = process.env.NODE_ENV === 'prod' ? process.env.DB_URI : localURI;
    const config = { useNewUrlParser: true, useUnifiedTopology: true}

    try {
      await mongoose.connect(uri, config);
      console.log('[DB]:Mongodb connected'.green);
    }catch(error){
      console.log('[DB]:', error.red);
    }
  }
}

module.exports = new Database();