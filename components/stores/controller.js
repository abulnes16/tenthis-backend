/* Store controller module */

//Store
const store = require("./store");

// Modules
const { generateFilePath } = require("../../modules/files");
const { getFormatDate } = require("../../modules/date");

/**
 * Store controller, get the store
 * @param {string} id Store id
 */
function getStores(user, id = null) {
  let filter = {};

  if (user.role === "client") {
    filter = { isBlock: false };
  }

  if (id !== null) {
    filter = { ...filter, _id: id };
  }

  return store.list(filter);
}

/**
 * Block store controller, set the
 * isBlock to true and isActive to false to
 * block the current store if block flag is true,
 * if block flag is set to false the store is unblock
 * @param {string} id  Store id
 */
function blockStore(id, unblock) {
  let filter = { _id: id };
  let data = unblock
    ? { $set: { isBlock: false, isActive: true } }
    : { $set: { isBlock: true, isActive: false } };

  return store.patch(filter, data);
}

/**
 * Configuration patch controller
 * Update the store configuration data
 * @param {string} id Store id
 * @param {string} name Store name
 * @param {Object} logo Store logo
 * @param {Object} favicon Store favicon
 * @param {string} keywords Store keywords
 * @param {string} css Global store css
 * @param {string} js Global store javascript
 * @param {string} header Global store header
 * @param {string} footer Global store footer
 * @param {boolean} useTemplate Indicates if store use a template or the global css and javascript
 * @param {string} template Template id
 * @param {Array} filenames Filenames that are uploaded
 * @param {Object} files Files that are gonna be uploaded
 */
async function updateConfiguration(
  id,
  name,
  description,
  logo,
  favicon,
  keywords,
  css,
  js,
  header,
  footer,
  useTemplate,
  template,
  filenames,
  files
) {
  let faviconRef = "";
  let logoRef = "";
  if (files && filenames) {
    if (files.faviconImg) {
      faviconRef = {
        name: files.faviconImg[0].filename,
        path: generateFilePath(files.faviconImg[0].filename),
        date: getFormatDate(),
      };
    } else {
      if (favicon) {
        faviconRef = JSON.parse(favicon);
      }
    }

    if (files.logoImg) {
      logoRef = {
        name: files.logoImg[0].filename,
        path: generateFilePath(files.logoImg[0].filename),
        date: getFormatDate(),
      };
    } else {
      if (logo) {
        logoRef = JSON.parse(logo);
      }
    }
  } else {
    faviconRef = JSON.parse(favicon);
    logoRef = JSON.parse(logo);
  }

  let keywordsArray = [];
  if (keywords) {
    keywordsArray = keywords.split(",");
  }

  const useTemplateBool = useTemplate === "true";

  const config = {
    logo: logoRef,
    favicon: faviconRef,
    keywords: keywordsArray,
    css,
    js,
    header,
    footer,
    useTemplate: useTemplateBool,
    template,
  };

  const update = {
    $set: { configuration: config, name: name, description: description },
  };
  const filter = { _id: id };

  try {
    const updateStore = await store.patch(filter, update);
    return updateStore;
  } catch (error) {
    return error;
  }
}

/**
 * Delete store controller, deletes a store
 * by id
 * @param {string} id
 */
function deleteStore(id) {
  let filter = { _id: id };
  return store.delete(filter);
}

module.exports = {
  getStores,
  blockStore,
  updateConfiguration,
  deleteStore,
};
