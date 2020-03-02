const router = require('express').Router();

const Diners = require('./diners-model.js');
const Operators = require('../operators/operators-model.js');

const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-diner.js');

router.get('/:id', (req,res) => {
    Diners.findById(req.params.id)
        .then(diner => {
            const {id, username, email } = diner
        })

        
})

// Customer RatingAVG Truck/Menu

router.get('/:id/CustomerMenuAvg', restricted, checkRole(), (req,res) => {
  Diners.findByCustomerRatingMenuAvg(req.params.id)
    .then(avg => {
      res.status(200).json(Object.values(avg[0])[0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/:id/CustomerTruckAvg', restricted, checkRole(), (req,res) => {
  Diners.findByCustomerRatingTruckAvg(req.params.id)
    .then(avg => {
      res.status(200).json(Object.values(avg[0])[0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


router.post('/:id/customerRatingTruck', restricted, checkRole(), validateTruckId, validateCustomerRating, (req,res) => {

    console.log(req.decodedJwt.userid)

    const newRating = {
        truck_id: req.params.id,
        diner_id: req.decodedJwt.userid,
        rating: req.body.rating
    }

    Diners.findTruckRatingById(req.params.id, req.decodedJwt.userid )
      .then(truck => {
        if(truck.length > 0){
          res.status(400).json({error: "you have already rated this truck"});
      } else {
        Diners.addCustomerRatingTruck(newRating)
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the item to the database" });
        })
      }
    })
      

    
})

router.put('/:id/customerRatingTruck', restricted, checkRole(), validateCustomerRatingId, validateCustomerRating,(req, res) => {
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

router.delete('/:id/customerRatingTruck', restricted, checkRole(), validateCustomerRatingId, validateCustomerRating,(req, res) => {
    Diners.removeCustomerRatingTruck(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The rating could not be removed"});
      })
});

// Customer Rating ManuItem

router.post('/:id/customerRatingMenu', restricted, checkRole(), validateMenuId, validateCustomerRating, (req,res, next) => {
   
    
    const newRating = {
      menu_id: req.params.id,
      diner_id: req.decodedJwt.userid,
      rating: req.body.rating,

    }

    
    Diners.findMenuRatingById(req.params.id, req.decodedJwt.userid )
      .then(menu => {
        if(menu.length > 0){
          res.status(400).json({error: "you have already rated this menu"});
      } else {
        Diners.addCustomerRatingMenu(newRating)
        .then(item => {
            // console.log(item)
            res.status(201).json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err.message);
        })
      }
    })

    
})

router.put('/:id/customerRatingMenu', restricted, checkRole(), validateCustomerMenuId, validateCustomerRating, (req, res) => {
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

// Favourite Trucks

router.post('/:id/favouriteTrucks', restricted, checkRole(), validateDinerId, (req,res, next) => {
    Operators.findByIdTruck(req.body.truck_id)
    .then(trucks => {
        const newFavTruck = {
            truck_id: req.body.truck_id,
            diner_id: req.params.id,
            dinerName: username,
            truckName: trucks.truckName,
            cuisineType: trucks.cuisineType,
            imageOfTruck: trucks.imageOfTruck,
            customerRatingAvg: trucks.customerRatingAvg,
            currentLocation: trucks.currentLocation,
            departureTime: trucks.departureTime,
        }
        Diners.findFavouriteTrucksById2(req.body.truck_id, req.params.id )
            .then(truck => {
                console.log(truck)
                if(truck.length > 0){
                    res.status(400).json({error: "truck already saved"});
                } else {
                    Diners.addFavouriteTrucks(newFavTruck)
                        .then(trucks => {
                            res.status(200).json(trucks)
                        })
                        .catch(err => {
                            res.status(500).json(err.message)
                        })
        
                }
            })
        
        })
    
})



router.delete('/:id/favouriteTrucks', restricted, checkRole(), validateFavouriteTruckId, (req, res) => {

    
    Diners.removeFavouriteTrucks(req.params.id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({error: "The truck could not be removed"});
      })
});



router.get('/:id/favouriteTrucks', restricted, checkRole(), validateFavouriteTruckId, (req,res) => {
    

    Diners.findFavouriteTrucksById(req.params.id)
    .then(post => {
        const {diner_id} = post[0]
        const List = post.map(resource => {
            console.log(resource)
            const {truck_id, truckName, cuisineType, imageOfTruck, customerRatingAvg, currentLocation, departureTime, diner_id} = resource
            return {truck_id, truckName, cuisineType, imageOfTruck, customerRatingAvg, currentLocation, departureTime, diner_id}
        })
        Diners.findById(req.params.id)
            .then(item => {
                res.status(200).json({
                    dinerName: item.username,
                    dinerId: diner_id,
                    trucks: List
            })
            .catch(err => {
                console.log(err)
              res.status(500).json({error: "favourite trucks could not be displayed"});
            })
        })
      })
      
})


// ValidateCustomer Rating

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


function validateCustomerRating(req, res, next) {
  const postData = req.body;
  if(!postData.rating || postData.rating === 0) {
    res.status(400).json({message: "please input a rating between 1 and 5."})
  } else if (postData.rating > 5 || postData.rating < 1){
      res.status(400).json({ message: 'please input a rating between 1 and 5.'})
  } else {
      next();
  }
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

// Validate Favourite Truck

function validateFavouriteTruckId(req, res, next) {
    const {id} = req.params;
    Diners.findFavouriteTrucksById(id)
      .then(truck => {
        if(truck) {
          req.truck = truck;
          next();
        } else {
          res.status(400).json({ message: "invalid favourite truck id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}

// Check for Duplicate Favourite Truck

function validateDinerId(req, res, next) {
    const {id} = req.params;
    Diners.findById(id)
      .then(rating => {
        if(rating) {
          req.rating = rating;
          next();
        } else {
          res.status(400).json({ message: "invalid diner id" });
        }   
      })
      .catch(err => {
        res.status(500).json({message: 'exception error'});
      })
}








module.exports = router;