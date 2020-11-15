/* File upload module 
  Module that creates configuration for multer middleware
*/

const multer = require("multer");

//Config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const name = req.body.name.replace(/\s*/g, "");
    const extension = file.mimetype.replace("image/", "");
    const filename = `${name}-${Date.now()}.${extension}`;
    if (req.filenames) {
      req.filenames = [...req.filenames, filename];
    } else {
      req.filenames = [filename];
    }
    cb(null, filename);
  },
});

module.exports = multer({ storage: storage });
