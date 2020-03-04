const router = require('express').Router();

const Diners = require('./diners-model.js');
const Operators = require('../operators/operators-model.js');

const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-diner.js');

// Diner CuisineType Search


router.get('/queryCuisineType', restricted, checkRole(), validateDinerId, (req,res) => {
  Diners.findByCuisineType(req.body.cuisineType)
    .then(cuisine => {
      if(!cuisine) {
        res.status(400).json({message: "no truck with that cuisine type found"})
      } else {
        res.status(200).json(cuisine)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/queryTruckRating', restricted, checkRole(), validateDinerId, validateDinerRatingSearch, (req,res) => {
  Diners.findByRating(req.body.rating)
    .then(cuisine => {
      if(!cuisine) {
        res.status(400).json({message: "no truck with that cuisine rating found"})
      } else {
        res.status(200).json(cuisine)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})



// Get Diner


router.get('/:id', restricted, checkRole(), validateDinerId, (req,res) => {
  Diners.findByIdDiner(req.params.id)
    .then(diner => {
      res.status(200).json(diner)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete('/:id/', restricted, checkRole(), validateDinerId, (req, res) => {
  Diners.removeDiner(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({error: "The diner could not be removed"});
    })
});


router.put('/:id/', restricted, checkRole(), validateDinerId, validateUserInfo, (req, res) => {
  const updateDiner = {
      username: req.body.username,
      email: req.body.email,
      currentLocation: req.body.currentLocation
  }

  Diners.updateDiner(req.params.id, updateDiner)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "The diner could not be modified"});
    })
});


// Customer RatingAVG Truck/Menu



router.get('/:id/CustomerMenuAvg', restricted, checkRole(), (req,res) => {
  Diners.findByCustomerRatingMenuAvg(req.params.id)
    .then(avg => {
      res.json(Object.values(avg[0])[0])
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
          Diners.findByCustomerRatingTruckAvg(req.params.id)
              .then(avg => {
                const updateTruck = {
                  customerRatingAvg: Object.values(avg[0])[0]
                }
                Operators.updateTruck(req.params.id, updateTruck)
                  .then(post => {
                    res.status(201).json({
                      rating: item,
                      truckAvg: Object.values(avg[0])[0]
                    })
                  })
                  .catch(err => {
                    res.status(500).json({error: "The truck information could not be modified"});
                  })                
              })
              .catch(err => {
                res.status(500).json(err)
              })
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
    .then(item => { 
      Diners.findByCustomerRatingTruckAvg(req.params.id)
        .then(avg => {
          const updateTruck = {
            customerRatingAvg: Object.values(avg[0])[0]
          }
          Operators.updateTruck(req.params.id, updateTruck)
          .then(post => {
            Diners.findByCustomerRatingTruckAvg(req.params.id)
              .then(response => {
                res.status(201).json({
                  rating: item,
                  MenuTruckAvg: Object.values(response[0])[0]
                })
              })
            
          }) 
            .catch(err => {
                console.log(err)
                res.status(500).json({error: "The truck information could not be modified"});
            })
          
        })
        .catch(err => {
          res.status(500).json(err)
        })
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



router.post('/:id/customerRatingMenu', restricted, checkRole(), validateMenuId, validateCustomerRating, (req,res, next) => {
   
    
    const newRating = {
      menu_id: req.params.id,
      diner_id: req.decodedJwt.userid,
      rating: req.body.rating,

    }

    console.log(req)
    Diners.findMenuRatingById(req.params.id, req.decodedJwt.userid )
      .then(menu => {
        if(menu.length > 0){
          res.status(400).json({error: "you have already rated this menu"});
      } else {
        Diners.addCustomerRatingMenu(newRating)
        .then(item => {
          Diners.findByCustomerRatingMenuAvg(req.params.id)
          .then(avg => {
            const updateMenu = {
              customerRatingAvg: Object.values(avg[0])[0]
            }
            Operators.updateMenuItem(req.params.id, updateMenu)
              .then(post => {
                res.status(201).json({
                  rating: item,
                  MenuItemAvg: Object.values(avg[0])[0]
                })
              })
              .catch(err => {
                  console.log(err)
                  res.status(500).json(err.message);
              })
            
          })
          .catch(err => {
            res.status(500).json(err)
          })
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
        Diners.findByCustomerRatingMenuAvg(req.params.id)
          .then(avg => {
            const updateMenu = {
              customerRatingAvg: Object.values(avg[0])[0]
            }
            Operators.updateMenuItem(req.params.id, updateMenu)
            .then(post => {
              Diners.findByCustomerRatingMenuAvg(req.params.id)
                .then(response => {
                  res.status(201).json({
                    rating: item,
                    MenuItemAvg: Object.values(response[0])[0]
                  })
                })
              
            }) 
              .catch(err => {
                  console.log(err)
                  res.status(500).json({error: "The menu information could not be modified"});
              })
            
          })
          .catch(err => {
            res.status(500).json(err)
          })
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
      Diners.findByCustomerRatingTruckAvg(req.params.id)
        .then(avg => {
          const newFavTruck = {
            truck_id: req.body.truck_id,
            diner_id: req.params.id,
            truckName: trucks.truckName,
            cuisineType: trucks.cuisineType,
            imageOfTruck: trucks.imageOfTruck,
            customerRatingAvg: Object.values(avg[0])[0],
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

// Validate Diner

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

function validateUserInfo(req, res, next) {
  const postData = req.body;
  if(postData.username === "") {
      res.status(400).json({ message: "username can not be empty" });
  }  else if (!postData.currentLocation && !postData.email) {
      res.status(400).json({ message: 'missing password and location field'})
  } else if (!postData.email) {
      res.status(400).json({ message: 'missing email field'})
  } else if (!postData.currentLocation){
      res.status(400).json({ message: 'missing location field'})
  } else {
      next();
  }
}



function validateDinerRatingSearch(req, res, next) {
  const postData = req.body;
  if(postData.rating === "") {
      res.status(400).json({ message: "rating can not be empty" });
  }  else if (postData.rating > 5 || postData.rating < 1){
    res.status(400).json({ message: 'please input a rating between 1 and 5.'})
  } else {
      next();
  }
}







module.exports = router;