/* Product controller module */

// Store
const store = require("./store");

//Modules
const { getFormatDate } = require("../../modules/date");
const {
  generateFilePath,
  updateFiles,
  deleteFiles,
} = require("../../modules/files");

/**
 * Get products controller
 * Get products from database, if id is provided
 * return the product with current id
 * @param {string} storeId Store id
 * @param {string} id Product id
 */
function getProducts(storeId, id = null, category = null) {
  let filter = { store: storeId };
  if (id) {
    filter = { ...filter, _id: id };
  }

  if (category !== "" && category !== null) {
    filter = { ...filter, category };
  }


  return store.list(filter);
}

/**
 * Create product controller
 * Create a product in database with data provided
 * @param {string} name Product name
 * @param {string} description Product description
 * @param {number} price Product price
 * @param {string} category Product category
 * @param {number} quantity Product quantity
 * @param {string} tags Product tags
 * @param {Array} media Product media
 * @param {Array<string>} filenames Product media filenames
 * @param {string} storeId Store id
 */
async function createProduct(
  name,
  description,
  price,
  category,
  quantity,
  tags,
  media,
  filenames,
  storeId
) {
  let files = [];
  let tagsArray;
  if (media && filenames) {
    files = filenames.map((file) => ({
      name: file.name,
      path: generateFilePath(file.name),
      date: getFormatDate(),
    }));
  }

  tagsArray = tags.split(",");

  const product = {
    name,
    description,
    price,
    category,
    quantity,
    tags: tagsArray,
    store: storeId,
    media: files,
  };

  try {
    const p = await store.add(product);
    return p;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Update product controller
 * Update a product in database with data provided
 * filter by id
 * @param {string} name Product name
 * @param {string} description Product description
 * @param {number} price Product price
 * @param {string} category Product category
 * @param {number} quantity Product quantity
 * @param {Array[string]} tags Product tags
 * @param {Array} media Product media
 * @param {Array} files Array of files
 * @param {Array[string]} filenames Product media filenames
 * @param {string} storeId Store id
 */
async function updateProduct(
  id,
  name,
  description,
  price,
  category,
  quantity,
  tags,
  media,
  files,
  filenames,
  storeId
) {
  const productFiles = updateFiles(media, files, filenames);

  const product = {
    _id: id,
    name,
    description,
    price,
    category,
    quantity,
    tags,
    store: storeId,
    media: productFiles,
  };

  const filter = { _id: id };

  try {
    const p = await store.update(filter, product);
    return p ? product : false;
  } catch (error) {
    return error;
  }
}

/**
 * Delete product controller
 * Delete a product in database filter by id
 * @param {string} id Product id
 * @param {string} storeId Store id
 */
async function deleteProduct(id, storeId) {
  let filter = { _id: id, store: storeId };
  try {
    const product = await store.list(filter);

    if (product.length !== 0) {
      deleteFiles(product[0]);
    }

    const result = await store.delete(filter);
    return result.deletedCount > 0 ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
