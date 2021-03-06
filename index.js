// Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("colors");
// Routes
const routes = require("./routes");
//Error handler
const errorHandler = require("./middlewares/errorHandler");

//Load environment variables
require("./config");

//Database
require("./modules/db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Initialize static server for serve images
app.use("/uploads", express.static("uploads"));

// Load routes
routes(app);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server listening in ${process.env.API_URL}:${process.env.PORT}`
      .cyan
  );
});
