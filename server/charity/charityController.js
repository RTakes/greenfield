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
    })
  },

  sendSubCategories: function(req, res) {
    Charity.find().distinct('subCategory', function(err, subCategories) {
      res.json(subCategories);
    })
  },

  badge: function(req, res){


  function addBadge(){
    var frame = document.createElement("iframe"); 
    frame.src = "http://localhost:8000"; 
    document.getElementById("test").appendChild(frame);
  }      

  var send = JSON.stringify(addBadge);


    res.send('function test(){alert("test");}');
  }

};
