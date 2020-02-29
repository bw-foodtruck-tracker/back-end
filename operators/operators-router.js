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

router.get('/:id/all', restricted, checkRole(), (req,res) => {
    console.log(req.params)
    
    Operators.findOperatorTrucks(req.params.id)
        .then(operator => {
            res.status(201).json(operator)
        })
        .catch(err => {
            res.status(500).json({error: "the operator could not be retrieved"})
        })
});


// TRUCK CRUD


router.post('/:id/truck', restricted, checkRole(), validateOperatorId, (req,res) => {

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


router.put('/:id/truck', restricted, checkRole(), validateTruckId, (req, res) => {
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

router.delete('/:id/truck', restricted, checkRole(), validateTruckId, (req, res) => {
    Operators.removeTruck(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The truck could not be removed"});
      })
});

// MENU CRUD

router.post('/:id/menu', restricted, checkRole(), (req,res) => {

    const newMenuItem = {
        truck_id: req.params.id,
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice,
    }

    console.log(newMenuItem)

    Operators.addMenuItem(newMenuItem)
        .then(item => {
            console.log(item)
            res.status(201).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the item to the database" });
        })
})

router.put('/:id/menu', restricted, checkRole(), validateMenuId, (req, res) => {
    const updateMenuItem = {
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemPrice: req.body.itemPrice
    }
  
    Operators.updateMenuItem(req.params.id, updateMenuItem)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({error: "The menu information could not be modified"});
      })
  });

router.delete('/:id/menu', restricted, checkRole(), validateMenuId, (req, res) => {
    Operators.removeMenuItem(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The menu could not be removed"});
      })
});

// ITEMPHOTOS CRUD

router.post('/:id/item-photo', restricted, checkRole(), validateMenuId, (req,res) => {

    const newItemPhoto = {
        menu_id: req.params.id,
        image: req.body.image
    }

    Operators.addItemPhotos(newItemPhoto)
        .then(item => {
            console.log(item)
            res.status(201).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the item to the database" });
        })
})

router.put('/:id/item-photo', restricted, checkRole(), validateItemPhotoId, (req, res) => {
    const updatePhoto = {
        image: req.body.image
    }
  
    Operators.updateItemPhotos(req.params.id, updatePhoto)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({error: "The photo could not be modified"});
      })
  });

router.delete('/:id/item-photo', restricted, checkRole(), validateItemPhotoId, (req, res) => {
    Operators.removeItemPhotos(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The photo could not be removed"});
      })
});

// Validate Id

function validateOperatorId(req, res, next) {
    const {id} = req.params;
    Operators.findById(id)
      .then(user => {
        if(user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "invalid operator id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}

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

function validateItemPhotoId(req, res, next) {
    const {id} = req.params;
    Operators.findByIdItemPhotos(id)
      .then(item => {
        if(item) {
          req.item = item;
          next();
        } else {
          res.status(400).json({ message: "invalid photo id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}

module.exports = router;
