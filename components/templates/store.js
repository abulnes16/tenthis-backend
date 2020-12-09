/* Template store module */

//Model
const Model = require("../../models/templates");

/**
 * Get templates from database
 * @param {object} filter Templeate filter
 */
function getTemplates(filter) {
  return Model.find(filter);
}

/**
 * Create a template in database
 * @param {object} data Template data
 */
async function saveTemplate(data) {
  try {
    const t = new Model(data);
    t.save();
    return t;
  } catch (error) {
    return error;
  }
}

/**
 * Update a template in database
 * @param {object} filter Template to be updated
 * @param {object} update Template data to be updated
 */
function updateTemplate(filter, update) {
  return Model.findOneAndUpdate(filter, update);
}

/**
 * Delete a template in database
 * @param {object} filter Template to be deleted
 */
function deleteTemplate(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  list: getTemplates,
  add: saveTemplate,
  update: updateTemplate,
  delete: deleteTemplate,
};
