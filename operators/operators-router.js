const router = require('express').Router();

const Operators = require('./operators-model');

const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-operator.js');



router.get('/:id', restricted, checkRole(), (req,res) => {
    console.log(req.params)
    
    Operators.findById(req.params.id)
        .then(operator => {
            res.status(201).json(operator)
        })
        .catch(err => {
            res.status(500).json({error: "the operator could not be retrieved"})
        })
});

router.post('/:id/truck', restricted, checkRole(), (req,res) => {

    const newTruck = {
        operator_id: req.params.id,
        truckName: req.body.truckName,
        imageOfTruck: req.body.imageOfTruck,
        cuisineType: req.body.cuisineType,
        currentLocation: req.body.currentLocation,
        departureTime: req.body.departureTime
    }
    console.log(newTruck)
    Operators.addTruck(newTruck)
        .then(truck => {
            console.log(truck)
            res.status(201).json(truck);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the task to the database" });
        })
})


router.put('/:id/truck', restricted, checkRole(), (req, res) => {
    const updateTruck = {
        operator_id: req.params.id,
        truckName: req.body.truckName,
        imageOfTruck: req.body.imageOfTruck,
        cuisineType: req.body.cuisineType,
        currentLocation: req.body.currentLocation,
        departureTime: req.body.departureTime
    }
  
    Operators.updateTruck(req.params.id, updateTruck)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
          res.status(500).json({error: "The truck information could not be modified"});
      })
  });

module.exports = router;
