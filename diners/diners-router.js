const router = require('express').Router();

const Diners = require('./diners-model.js');
const Operators = require('../operators/operators-model.js');

const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-diner.js');


router.post('/:id/customerRating', restricted, checkRole(), validateTruckId, (req,res) => {

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












module.exports = router;