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

async function updateConfiguration(
  id,
  name,
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
    if (files.favicon) {
      faviconRef = {
        name: files.favicon[0].filename,
        path: generateFilePath(files.favicon[0].filename),
        date: getFormatDate(),
      };
    }

    if (files.logo) {
      logoRef = {
        name: files.logo[0].filename,
        path: generateFilePath(files.logo[0].filename),
        date: getFormatDate(),
      };
    }
  } else {
    faviconRef = favicon;
    logoRef = logo;
  }

  let keywordsArray = [];
  if (keywords) {
    keywordsArray = keywords.split(",");
  }

  const config = {
    logo: logoRef,
    favicon: faviconRef,
    keywords: keywordsArray,
    css,
    js,
    header,
    footer,
    useTemplate,
    template,
  };

  const update = { $set: { configuration: config, name: name } };
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
