var charityController = require('./charityController');

module.exports = function(app) {
  app.get('/category', charityController.sendCategories);
  app.get('/subCategory', charityController.sendSubCategories);
  app.post('/', charityController.register);
  app.get('/3619', charityController.badge);
  app.get('/:orgid', charityController.fetch);
};
