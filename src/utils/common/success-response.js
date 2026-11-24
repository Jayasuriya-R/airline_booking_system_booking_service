// A factory (not a shared object) so concurrent requests never overwrite each other's data.
module.exports = (message = 'Successfully completed the request', data = {}) => ({
  success: true,
  message,
  data,
  error: {},
});
