/* File upload module 
  Module that creates configuration for multer middleware
*/

const multer = require("multer");

//Config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = multer({ storage: storage });
