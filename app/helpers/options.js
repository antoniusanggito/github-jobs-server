const options = (method = 'GET', body = {}) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  body,
});

module.exports = {
  options,
};
