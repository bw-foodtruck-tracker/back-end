const router = require('express').Router();

const Diners = require('./diners-model.js');
const Operators = require('../operators/operators-model.js');

const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-diner.js');


router.post('/:id/customerRatingTruck', restricted, checkRole(), validateTruckId, (req,res) => {

    console.log(req.decodedJwt.userid)

    const newRating = {
        truck_id: req.params.id,
        diner_id: req.decodedJwt.userid,
        rating: req.body.rating
    }

    Diners.addCustomerRatingTruck(newRating)
        .then(item => {
            // console.log(item)
            res.status(201).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the item to the database" });
        })
})

router.put('/:id/customerRatingTruck', restricted, checkRole(), validateCustomerRatingId, (req, res) => {
    const newRating = {
        rating: req.body.rating
    }
  
    Diners.updateCustomerRatingTruck(req.params.id, newRating)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({error: "The rating could not be updated"});
      })
  });

router.delete('/:id/customerRatingTruck', restricted, checkRole(), validateCustomerRatingId, (req, res) => {
    Diners.removeCustomerRatingTruck(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The rating could not be removed"});
      })
});

// Customer Rating ManuItem

router.post('/:id/customerRatingMenu', restricted, checkRole(), validateMenuId, (req,res) => {

    console.log(req.decodedJwt.userid)

    const newRating = {
        menu_id: req.params.id,
        diner_id: req.decodedJwt.userid,
        rating: req.body.rating
    }

    Diners.addCustomerRatingMenu(newRating)
        .then(item => {
            // console.log(item)
            res.status(201).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the item to the database" });
        })
})

router.put('/:id/customerRatingMenu', restricted, checkRole(), validateCustomerMenuId, (req, res) => {
    const newRating = {
        rating: req.body.rating
    }
  
    Diners.updateCustomerRatingMenu(req.params.id, newRating)
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({error: "The rating could not be updated"});
      })
  });

router.delete('/:id/customerRatingMenu', restricted, checkRole(), validateCustomerMenuId, (req, res) => {
    Diners.removeCustomerRatingMenu(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The rating could not be removed"});
      })
});


// Validate Id Truck

function validateCustomerRatingId(req, res, next) {
    const {id} = req.params;
    Diners.findByCustomerRatingId(id)
      .then(rating => {
        if(rating) {
          req.rating = rating;
          next();
        } else {
          res.status(400).json({ message: "invalid rating id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}

function validateTruckId(req, res, next) {
    const {id} = req.params;
    Operators.findByIdTruck(id)
      .then(truck => {
        if(truck) {
          req.truck = truck;
          next();
        } else {
          res.status(400).json({ message: "invalid truck id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}

// Vaidate ID Menu

function validateMenuId(req, res, next) {
    const {id} = req.params;
    Operators.findByIdMenu(id)
      .then(menu => {
        if(menu) {
          req.menu = menu;
          next();
        } else {
          res.status(400).json({ message: "invalid menu id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}

function validateCustomerMenuId(req, res, next) {
    const {id} = req.params;
    Diners.findByCustomerRatingMenuItemId(id)
      .then(rating => {
        if(rating) {
          req.rating = rating;
          next();
        } else {
          res.status(400).json({ message: "invalid rating id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}











module.exports = router;