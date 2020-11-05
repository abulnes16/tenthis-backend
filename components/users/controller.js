/* User controller module */

//Store
const ResponseError = require("../../modules/errorResponse");
const store = require("./store");

/**
 * Get users controller
 * @param {string} id The user id to search
 */
function getUsers(id = null) {
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
async function updateUser(id, name, email, plan, role) {
  let user = {
    name,
    email,
    plan,
    role,
  };

  let filter = { _id: id };
  try {
    const u = await store.update(filter, user);
    if (u.n > 0) {
      return user;
    } else {
      throw new ResponseError("Fail update: User not found", 404);
    }
  } catch (error) {
    return error;
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
  deleteUser
};
