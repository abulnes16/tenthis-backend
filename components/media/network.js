/* Media routes module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Multer
const upload = require("../../modules/fileUpload");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");

//Validators
const { getValidators } = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

router.get(
  "/",
  getValidators,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { bulk } = req.query;
    const storeId = req.user.store;
    let files;

    if (bulk) {
      const { media } = req.body;
      files = await controller.getBulkMedia(storeId, media);
    } else {
      files = await controller.getMedia(storeId);
    }

    response.success(req, res, files);
  })
);

router.get(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const { id } = req.params;
    const file = await controller.getMedia(storeId, id);
    response.success(req, res, file[0]);
  })
);

router.post(
  "/",
  upload.single("media"),
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const filename = req.filenames;

    const file = await controller.createMedia(storeId, filename);

    response.success(req, res, file, "Media created", 201);
  })
);

router.delete(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const { id } = req.params;

    const result = await controller.deleteMedia(storeId, id);

    if (result) {
      response.success(req, res, result, "Media deleted");
    } else {
      return next(new ResponseError("Media not found", 404));
    }
  })
);

module.exports = router;