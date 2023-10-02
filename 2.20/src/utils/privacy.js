const privacyReadKey = 'privacyRead';

const setPrivacyRead = () => {
  localStorage.setItem(privacyReadKey, 'true');
};

const checkPrivacyRead = () => {
  if (localStorage.getItem(privacyReadKey) === 'true') {
    return true;
  }
  return false;
};

export { setPrivacyRead, checkPrivacyRead };
