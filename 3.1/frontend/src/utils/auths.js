const STORE_NAME = 'user';
const REMEMBER_ME = 'remembered';

let currentUser;

const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;

  const remembered = getRememberMe();
  const serializedUser = remembered
    ? localStorage.getItem(STORE_NAME)
    : sessionStorage.getItem(STORE_NAME);

  if (!serializedUser) return undefined;

  currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  const remembered = getRememberMe();
  if (remembered) localStorage.setItem(STORE_NAME, serializedUser);
  else sessionStorage.setItem(STORE_NAME, serializedUser);

  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  localStorage.clear();
  sessionStorage.clear();
  currentUser = undefined;
};

function getRememberMe() {
  const rememberedSerialized = localStorage.getItem(REMEMBER_ME);
  const remembered = JSON.parse(rememberedSerialized);
  return remembered;
}

function setRememberMe(remembered) {
  const rememberedSerialized = JSON.stringify(remembered);
  localStorage.setItem(REMEMBER_ME, rememberedSerialized);
}

export {
  getAuthenticatedUser,
  setAuthenticatedUser,
  isAuthenticated,
  clearAuthenticatedUser,
  getRememberMe,
  setRememberMe,
};
