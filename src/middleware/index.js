module.exports = {
  ExampleMiddleware: require('./example-middleware'),
  ...require('./error-handler'), // notFound, errorHandler
};
