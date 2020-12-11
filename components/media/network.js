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
const { getValidators, uploadValidators } = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");
const { validationResult } = require("express-validator");

/**
 * @route GET /media
 * @query bulk Boolean that indicates if endpoint should
 *             return a specific array of media
 * @description Endpoint for listing media files
 * @access owner
 */
router.get(
  "/",
  getValidators,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { bulk } = req.query;
    let storeId = "";
    if (req.user.role === "owner") {
      storeId = req.user.store;
    }else {
      storeId = req.query.store;
    }
    let files;
    if (bulk) {
      const { media } = req.query;
      const fileIds = JSON.parse(media);
      files = await controller.getBulkMedia(storeId, fileIds);
    } else {
      files = await controller.getMedia(storeId);
    }

    response.success(req, res, files);
  })
);

/**
 * @route GET /media/:id
 * @description Endpoint for listing media file by id
 * @access owner
 */
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

/**
 * @route POST /media
 * @description Endpoint for uploading media files
 * @access owner
 */
router.post(
  "/",
  auth,
  upload.single("media"),
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const filename = req.filenames;
    const file = await controller.createMedia(storeId, filename);

    response.success(req, res, file, "Media created", 201);
  })
);

/**
 * @route DELETE /media/:id
 * @description Endpoint for deleting media files by id
 * @access owner
 */
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
