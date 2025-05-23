export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
