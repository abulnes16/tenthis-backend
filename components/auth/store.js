/* Auth store module */

//Models
const UserModel = require("../../models/users");

//Store
const companyStore = require("../stores/store");

/**
 * Create user and store if user is not a client
 * @param {object} user The user to create
 * @param {object} company The company to create
 */
async function register(user, company) {
  try {
    const u = new UserModel(user);
    const createUser = await u.save();
    // Create a store if user is not a client
    if (company) {
      company.user = createUser._id;
      await companyStore.add(company);
    }
    //Create user
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
  return UserModel.findOne({ email }).select("+password");
}

module.exports = {
  register,
  getUser,
};
