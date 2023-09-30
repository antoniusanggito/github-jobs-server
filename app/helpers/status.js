const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
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
