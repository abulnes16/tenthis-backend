/* Auth store module */

//Models
const UserModel = require("../../models/users");
const StoreModel = require("../../models/stores");

/**
 * Create user and store if user is not a client
 * @param {object} user The user to create
 * @param {object} company The company to create
 */
async function register(user, company) {
  try {
    // Create a store if user is not a client
    if (company) {
      const s = new StoreModel(company);
      const createStore = await s.save();
      // Aggregate store id in user object
      user.store = createStore._id;
    }
    //Create user
    const u = new UserModel(user);
    const createUser = await u.save();
    return createUser;
  } catch (error) {
    return error;
  }
}

/**
 * Get user to check login
 * @param {string} email The user email
 */
async function getUser(email) {
  return UserModel.findOne({ email });
}

module.exports = {
  register,
  getUser,
};
