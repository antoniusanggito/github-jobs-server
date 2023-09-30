const successMessage = (data) => ({
  status: 'success',
  data: data,
});
const errorMessage = (message) => ({
  status: 'error',
  message: message,
});

const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  bad: 400,
};

module.exports = {
  successMessage,
  errorMessage,
  status,
};
