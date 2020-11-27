/* Template network module */

//Express
const router = require("express").Router();
//Multer
const upload = require("../../modules/fileUpload");

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");

//Validators
const { validationResult } = require("express-validator");
const { Validators } = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

/**
 * @route GET /template/
 * @description Endpoint for get templates
 * @access admin
 */
router.get(
  "/",
  auth,
  authorize(["admin", "owner"]),
  asyncHandler(async (req, res, next) => {
    const templates = await controller.getTemplates();
    response.success(req, res, templates);
  })
);

/**
 * @route GET /template/:id
 * @description Endpoint for get template by id
 * @access admin
 */
router.get(
  "/:id",
  auth,
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const templates = await controller.getTemplates(id);
    response.success(req, res, templates[0]);
  })
);

/**
 * @route POST /template/
 * @description Endpoint for create a template
 * @access admin
 */
router.post(
  "/",
  upload.array("media"),
  Validators,
  auth,
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const { name, description, html, css, js } = req.body;
    const media = req.files;
    const filenames = req.filenames;
    const template = await controller.createTemplate(
      name,
      description,
      html,
      css,
      js,
      media,
      filenames
    );

    response.success(req, res, template, "Template created", 201);
  })
);

/**
 * @route PUT /template/
 * @description Endpoint for update a template by id
 * @access admin
 */
router.put(
  "/:id",
  upload.array("files"),
  Validators,
  auth,
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }
    const { id } = req.params;
    const { name, description, html, css, js, media } = req.body;
    const files = req.files;
    const filenames = req.filenames;
    const result = await controller.updateTemplate(
      id,
      name,
      description,
      html,
      css,
      js,
      media,
      files,
      filenames
    );

    if (result) {
      response.success(req, res, result, "Template updated");
    } else {
      return next(new ResponseError("Template not found", 404));
    }
  })
);

/**
 * @route DELETE /template/:id
 * @description Endpoint for delete a template by id
 * @access admin
 */
router.delete(
  "/:id",
  auth,
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await controller.deleteTemplate(id);
    if (result) {
      response.success(req, res, null, "Template deleted");
    } else {
      return next(new ResponseError("Template not found", 404));
    }
  })
);

module.exports = router;
