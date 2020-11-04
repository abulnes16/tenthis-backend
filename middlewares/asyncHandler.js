/* Async handler middleware */
/**
 * Async handler 
 * Wraps the function pass to it to 
 * make it asynchronous
 * @param {function} fn 
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;