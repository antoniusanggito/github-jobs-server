const successMessage = { status: 'success', data: {} };
const errorMessage = { status: 'error', message: '' };
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
