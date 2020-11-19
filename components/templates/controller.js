/* Template controller module */

//Store
const store = require("./store");

//Module
const { getFormatDate } = require("../../modules/date");
const { deleteFiles, updateFiles } = require("../../modules/files");

/**
 * Get template controller, list the templates
 * in database, if id is pass to it list the template
 * with current id
 * @param {string} id Template id
 */
function getTemplates(id = null) {
  let filter = {};
  if (id !== null) {
    filter = { _id: id };
  }

  return store.list(filter);
}

/**
 * Create template controller.
 * Create a template in database
 * @param {string} name Template name
 * @param {string} description  Template description
 * @param {string} html Template HTML
 * @param {string} css Template CSS
 * @param {string} js Template JS
 * @param {Array} media Template images
 */
function createTemplate(name, description, html, css, js, media, filenames) {
  let files = [];
  let templateJS = "";
  let templateCSS = "";

  if (media && filenames) {
    //Map the files to be save in database
    files = filenames.map((file) => ({
      name: file,
      path: generateFilePath(file),
      date: getFormatDate(),
    }));
  }
  if (js) {
    templateJS = js;
  }
  if (css) {
    templateCSS = css;
  }

  let template = {
    name,
    description,
    html,
    css: templateCSS,
    js: templateJS,
    media: files,
  };

  return store.add(template);
}

/**
 * Update template controller
 * Update a template in database
 * @param {string} id Template id to be updated
 * @param {string} name Template name
 * @param {string} description Template description
 * @param {string} html Template HTML
 * @param {string} css Template CSS
 * @param {string} js Template JS
 * @param {Array} media Template images
 * @param {Array} files Multer files
 * @param {Array} filenames Array of uploaded files
 */
async function updateTemplate(
  id,
  name,
  description,
  html,
  css,
  js,
  media,
  files,
  filenames
) {
  
  let templateFiles = updateFiles(media, files, filenames);

  let template = {
    name,
    description,
    html,
    css,
    js,
    media: templateFiles,
  };

  let filter = { _id: id };

  try {
    const t = await store.update(filter, template);
    return t ? true : false;
  } catch (error) {
    return error;
  }
}

/**
 * Template delete controller
 * Delete a template in database
 * @param {string} id Template id to be deleted
 */
async function deleteTemplate(id) {
  try {
    let filter = { _id: id };
    const template = await store.list(filter);
    deleteFiles(template[0]);
    const result = await store.delete(filter);
    return result.deletedCount > 0 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
