const STORE_NAME = "user";

/**
 * Get the Object that is in the localStorage under the storeName key
 * @param {string} storeName
 * @returns
 */
const getSessionObject = (storeName) => {
  const retrievedObject = localStorage.getItem(storeName);
  if (!retrievedObject) return;
  return JSON.parse(retrievedObject);
};

/**
 * Set the object in the localStorage under the storeName key
 * @param {string} storeName
 * @param {Object} object
 */
const setSessionObject = (storeName, object) => {
  const storageValue = JSON.stringify(object);
  localStorage.setItem(storeName, storageValue);
};

/**
 * Remove the object in the localStorage under the storeName key
 * @param {String} storeName
 */
const removeSessionObject = (storeName) => {
  localStorage.removeItem(storeName);
};

export { getSessionObject, setSessionObject, removeSessionObject };
