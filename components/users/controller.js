/* User controller module */

//Response
const ResponseError = require("../../modules/errorResponse");

//Store
const store = require("./store");
const companyStore = require("../stores/store");

/**
 * Get users controller
 * @param {string} id The user id to search
 */
async function getUsers(id = null) {
  let filter = {};
  if (id !== null) {
    filter = { _id: id };
  }

  return store.list(filter);
}

/**
 * Update user controller
 * @param {string} id The user id to be updated
 * @param {string} name User name
 * @param {string} email User email
 * @param {string} plan User current plan
 * @param {string} role User role
 */
async function updateUser(id, name, email, plan, role, storeName) {
  let userPlan = null;
  let userStore = null;

  if (plan) {
    userPlan = plan;
  }

  if (storeName) {
    userStore = storeName;
  }

  let user = {
    _id: id,
    name,
    email,
    plan: userPlan,
    role,
    store: userStore,
  };

  let filter = { _id: id };
  try {
    const u = await store.update(filter, user);
    const result = await updateUserStore(storeName, user._id);
    if (u.n > 0) {
      return user;
    } else {
      throw new ResponseError("Fail update: User not found", 404);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Update user store, if the store doesn't exist and
 * storeName is provided then the controller creates a store
 * with the userId. If the store exists and the storeName is null
 * then delete de user store.
 * @param {string} storeName
 * @param {string} userId
 */
async function updateUserStore(storeName, userId) {
  debugger;
  let filter = { user: userId };
  try {
    const company = await companyStore.list(filter);
    if (company && storeName === null) {
      await companyStore.delete(filter);
    } else if (company.length === 0 && storeName !== null) {
      const storeData = {
        name: storeName,
        user: userId,
        description: "",
        products: [],
        categories: [],
        pages: [],
        configuration: null,
        media: [],
        isBlock: false,
        isActive: true,
      };
      await companyStore.add(storeData);
    }
    return true;
  } catch (error) {
    throw new ResponseError("Internal server error", 500);
  }
}

/**
 * User delete controller
 * @param {string} id  User id
 */
async function deleteUser(id) {
  let filter = { _id: id };
  try {
    const result = await store.delete(filter);
    return result.deletedCount > 0 ? true : false;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
