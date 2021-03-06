/* Auth controller module */

//Bcrypt
const bcrypt = require("bcrypt");

//JWT
const jwt = require("jsonwebtoken");

//Errors
const ResponseError = require("../../modules/errorResponse");

//Store
const store = require("./store");

/**
 * Register controller
 * Create an user and a store if
 * user role is owner
 * @param {object} data The user data
 */
async function register(data) {
  const rounds = Number(process.env.SALT_ROUNDS) || 5;

  const hashPassword = await bcrypt.hash(data.password, rounds);

  let user = {
    name: data.name,
    email: data.email,
    password: hashPassword,
    plan: data.plan,
    role: data.role,
    store: data.storeName,
  };

  let company = null;
  if (data.role === "owner") {
    const config = {
      logo: null,
      favicon: null,
      keywords: [],
      css: "",
      js: "",
      header: "",
      footer: "",
      useTemplate: false,
      template: "",
    };

    company = {
      name: data.storeName,
      description: "",
      pages: [],
      configuration: config,
      isBlock: false,
      isActive: true,
    };
  }

  return store.register(user, company);
}

/**
 * Login controller, verifies the
 * user exists and create user token
 * @param {string} email
 * @param {string} password
 */
async function login(email, password) {
  const user = await store.getUser(email);

  if (!user) {
    throw new ResponseError("User not found", 404);
  }

  const passwordEqual = await bcrypt.compare(password, user.password);

  if (!passwordEqual) {
    throw new ResponseError("Invalid user or password", 400);
  }

  let storeId = "";
  if (user.role === "owner") {
    let filter = { user: user._id };
    const company = await store.getUserStore(filter);
    storeId = company._id;
  }

  const payload = {
    id: user._id,
    role: user.role,
    name: user.name,
    store: storeId,
  };

  const secret = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "2h" });
  return { token };
}

module.exports = {
  register,
  login,
};
