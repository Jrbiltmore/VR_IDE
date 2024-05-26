export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
