var cardController = require('./cardController');

module.exports = function(app) {
  app.post('/add', cardController.add);
  app.post('/delete', cardController.delete);
  app.get('/get', cardController.getCards);
};
