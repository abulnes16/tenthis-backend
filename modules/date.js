/* Data manager module */

/**
 * Function for creating a string date in format
 * dd/MM/YYYY
 */
function getFormatDate() {
  const date = new Date();
  return `${date.getDay()}/${date.getDate()}/${date.getFullYear()}`;
}

module.exports = {
  getFormatDate,
};
