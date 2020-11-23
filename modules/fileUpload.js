/* File upload module 
  Module that creates configuration for multer middleware
*/

const multer = require("multer");

//Config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const name = req.body.name.replace(/\s*/g, "");
    const extension = file.originalname.split(".").pop();
    const filename = `${name}-${Date.now()}.${extension}`;
    const type = file.mimetype;
    if (req.filenames) {
      req.filenames = [...req.filenames, { name: filename, type }];
    } else {
      req.filenames = [{ name: filename, type }];
    }
    cb(null, filename);
  },
});

module.exports = multer({ storage: storage });
