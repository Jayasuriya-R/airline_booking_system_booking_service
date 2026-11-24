module.exports = (message = 'Something went wrong', error = {}) => ({
  success: false,
  message,
  data: {},
  error,
});
