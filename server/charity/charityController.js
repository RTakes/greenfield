var Charity = require('./charityModel');
var helpers = require('../config/helpers');

module.exports = {
  fetch: function(req, res) {
    var urlParts = req.url.split('/');
    var orgid = parseInt(urlParts[1], 10);

    Charity.findOne(
      {
        orgid: orgid
      },
      {},
      function(error, entry) {
        if (error) {
          helpers.errorHandler(error, req, res);
        } else {
          res.status(200).send(entry);
        }
      }
    );
  },

  register: function(req, res) {
    var charity = {
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
      category: req.body.category,
      subCategory: req.body.subCategory
    };
    
    Charity.findOne({name: charity.name}).exec(function(err, found) {
      if (found) {
        res.send(200, found);
      } else {
        var newCharity = new Charity(charity);
        newCharity.save(function(error) {
          if (error) {
            res.send(500, error);
          } else {
            res.send(201, newCharity);
          }
        });
      }
    });
  },

  sendCategories: function(req, res) {
    Charity.find().distinct('category', function(err, categories) {
      res.json(categories);
    });
  },

  sendSubCategories: function(req, res) {
    Charity.find().distinct('subCategory', function(err, subCategories) {
      res.json(subCategories);
    });
  },

  badge: function(req, res){

    var urlParts = req.url.split('/');
    var orgid = parseInt(urlParts[2], 10);
    console.log(orgid);

    var aTag = '<a target="_blank" href="http://localhost:8000/api/charity/'+orgid+'"><img src="http://localhost:8000/img/pledgr-badge.png" /></a>';


    res.send(aTag);
  },

  sendUnvetted: function(req, res) {
    Charity.find({ vetted: false }).exec(function(err, charities) {
      if (charities) {
        res.json(charities);
      } else {
        res.send('All charities vetted.');
      }
    });
  },

  vet: function(req, res) {
    Charity.update({ name: req.body.name},{vetted: true}).exec(function(err, numAffected, raw) {
      console.log('after update raw response', raw);
      console.log('numaffected',numAffected);
      // if (found) {
      //   // update vetted to true, respond with send().
      //   console.log('found ', found);
      //   found.update({},{ vetted: true });
      //   console.log('updated to ', found);

        res.send();
      // } else {
      //   res.send(404);
      // }
    });
  }

};
