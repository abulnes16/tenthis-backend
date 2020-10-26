// Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('colors');
// Routes
const routes = require('./routes');

//Load environment variables
require('./config');

//Database 
require('./modules/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Load routes
routes(app);

app.listen(process.env.API_PORT, ()=>{
  console.log(`Server listening in http://localhost:${process.env.API_PORT}`.cyan);
})