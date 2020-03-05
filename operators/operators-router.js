const router = require('express').Router();

const Operators = require('./operators-model');
const Diners = require('../diners/diners-model.js')
const geocoder = require('../utils/geocoder');


const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-operator.js');

// Operator CRUD

router.get('/:id', restricted, checkRole(), validateOperatorId,(req,res) => {
    console.log(req)
    
    Operators.findById(req.params.id)
        .then(operator => {
            res.status(201).json(operator)
        })
        .catch(err => {
            res.status(500).json({error: "the operator could not be retrieved"})
        })
});

router.get('/:id/all', restricted, checkRole(), (req,res) => {
    console.log(req)
    
    Operators.findOperatorTrucks(req.params.id)
        .then(operator => {
            res.status(201).json(operator)
        })
        .catch(err => {
            res.status(500).json({error: "the operator could not be retrieved"})
        })
});


router.delete('/:id/', restricted, checkRole(), validateOperatorId, (req, res) => {
  Operators.removeOperator(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({error: "The operator could not be removed"});
    })
});


router.put('/:id/', restricted, checkRole(), validateOperatorId, validateUserInfo, (req, res) => {
  const updateOperator = {
      username: req.body.username,
      email: req.body.email
  }

  Operators.updateOperator(req.params.id, updateOperator)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "The operator could not be modified"});
    })
});

// TRUCK CRUD




router.get('/:id/truck', restricted, checkRole(), (req,res) => {
  Diners.findByCustomerRatingTruckAvg(req.params.id)
    .then(avg => {
      Operators.findCustomerRatingTruck(req.params.id)
      .then(rating => {
        const ratingList = rating.map(rate => {
          const {rating, truck_id, diner_id} = rate
          return {rating, truck_id, diner_id}
        })
        Operators.findCustomerRatingMenu(req.params.id)
        .then(ratingMenu => {
          const ratingMenuList = ratingMenu.map(rateMenu => {
            const {rating, menu_id, diner_id} = rateMenu
            return {rating, menu_id, diner_id}
          })
          Operators.findByIdTruckAll(req.params.id)
            .then(menu => {
              const MenuList = menu.map(menu => {
                const {itemName, itemDescription, itemPrice, customerRatingAvg, id} = menu
                return {itemName, itemDescription, itemPrice, customerRatingAvg, id}
              })
              // const {itemName, itemDescription, itemPrice, customerRatingAvg, id} = menu[0]
              const PhotoList = menu.map(menu => {
                const {image, menu_id} = menu
                return {image, menu_id} 
              })
            Operators.findByIdTruck(req.params.id)
              .then(truck => {
                res.status(201).json({
                  truck: truck.truckName,
                  truckId: truck.id,
                  imageOfTruck: truck.imageOfTruck,
                  cuisineType: truck.cuisineType,
                  Truck_customerRatingAvg: Object.values(avg[0])[0],
                  currentLocation: truck.currentLocation,
                  departureTime: truck.departureTime,
                  operator_id: truck.operator_id,
                  menu:{
                    menuList: MenuList,
                    PhotoList: PhotoList,
                    RatingMenu: ratingMenuList
                  },
                  TruckRatings: ratingList
                })
                })
                })
              })
            })
          })
      .catch(err => {
        res.status(500).json(err.message)
      })
})


router.post('/:id/truck', restricted, checkRole(), validateOperatorId, validateTruckInfo, (req,res) => {
  
  const newTruck = {
    operator_id: req.params.id,
    truckName: req.body.truckName,
    imageOfTruck: req.body.imageOfTruck,
    cuisineType: req.body.cuisineType,
    currentLocation: req.body.currentLocation,
    departureTime: req.body.departureTime,
}
    
    
        Operators.findByTruckName(req.body.truckName)
          .then(truck => {
            if(truck.length > 0) {
              res.status(400).json({ error: "Truck name must be unique" });
            } else {
              Operators.addTruck(newTruck)
                .then(truck => {
                    res.status(201).json(truck);
                })
                .catch(err => {
                    res.status(500).json({ error: "There was an error while saving the task to the database" });
              })
            }
          })
})


router.put('/:id/truck', restricted, checkRole(), validateTruckId, validateTruckInfo,(req, res) => {
 
    Diners.findByCustomerRatingTruckAvg(req.params.id)
        .then(avg => {
          const updateTruck = {
            truckName: req.body.truckName,
            imageOfTruck: req.body.imageOfTruck,
            cuisineType: req.body.cuisineType,
            currentLocation: req.body.currentLocation,
            departureTime: req.body.departureTime,
            customerRatingAvg: Object.values(avg[0])[0]
        }
        Operators.findByTruckName(req.body.truckName)
          .then(truck => {
            if(truck.length > 0) {
              res.status(400).json({ error: "Truck name must be unique" });
            } else {
              Operators.updateTruck(req.params.id, updateTruck)
                .then(post => {
                  res.status(200).json(post);
                })
                .catch(err => {
                  res.status(500).json({error: "The truck information could not be modified"});
                })
              }
          })
        })   
  });

  router.put('/:id/truck/currentLocation', restricted, checkRole(), validateTruckId, validateTruckInfoCurrentLocation,(req, res) => {

    

    Operators.findByIdTruck(req.params.id)
      .then(truck => {
        geocoder.geocode(req.body.currentLocation)
          .then(result => {
            console.log(result)
            const updateTruck = {
              currentLocation: `${result[0].latitude} ${result[0].longitude}`
            }
            Operators.updateTruck(req.params.id, updateTruck)
              .then(post => {

                res.status(200).json(post);
              })
              .catch(err => {
                res.status(500).json({error: "The current location could not be modified"});
              })  
          })
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

router.get('/:id/menu', validateMenuId, (req,res) => {
  Operators.findByIdTruckAll(req.params.id)
    .then(menus => {
      const {id, itemName, itemDescription, itemPrice, customerRatingAvg, truck_id} = menus[0]
      PhotoList = menus.map(photo => {
        const {image} = photo
        return {image}
      })
        res.status(201).json({
          id: id,
          itemName: itemName,
          itemDescription: itemDescription,
          itemPrice: itemPrice,
          customerRatingAvg: customerRatingAvg,
          truck_id: truck_id,
          photos: PhotoList
        })
    })
    .catch(err => {
        res.status(500).json({error: "the menu could not be retrieved"})
    })
})

router.post('/:id/menu', restricted, checkRole(), validateTruckId, validateMenuInfo,(req,res) => {

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

router.put('/:id/menu', restricted, checkRole(), validateMenuId, validateMenuInfo, (req, res) => {
    
    Diners.findByCustomerRatingMenuAvg(req.params.id)
        .then(avg => {
          console.log(Object.values(avg[0])[0])
          const updateMenuItem = {
            itemName: req.body.itemName,
            itemDescription: req.body.itemDescription,
            itemPrice: req.body.itemPrice,
            customerRatingAvg: Object.values(avg[0])[0]
        }
        console.log(updateMenuItem)
        Operators.updateMenuItem(req.params.id, updateMenuItem)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(err => {
              console.log(err)
              res.status(500).json({error: "The menu information could not be modified"});
          })
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

router.post('/:id/item-photo', restricted, checkRole(), validateMenuId, validatePhotoInfo, (req,res) => {

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

router.put('/:id/item-photo', restricted, checkRole(), validateItemPhotoId, validatePhotoInfo, (req, res) => {
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



// Validate Operator

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

function validateUserInfo(req, res, next) {
  const postData = req.body;
  if(postData.username === "") {
      res.status(400).json({ message: "missing username field" });
  }  else if (!postData.email) {
      res.status(400).json({ message: 'missing email field'})
  } else {
      next();
  }
}

// Validate Menu

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

function validateMenuInfo(req, res, next) {
  const postData = req.body;
  if(postData.itemName === "") {
      res.status(400).json({ message: "item name can not be empty" });
  }  else if (!postData.itemDescription && !postData.itemPrice) {
      res.status(400).json({ message: 'missing item description and item price field'})
  } else if (!postData.itemDescription) {
      res.status(400).json({ message: 'missing item description field'})
  } else if (!postData.itemPrice){
      res.status(400).json({ message: 'missing item price field'})
  } else {
      next();
  }
}

// Validate Truck

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

function validateTruckInfo(req, res, next) {
  const postData = req.body;
   if (postData.truckName === "" || !postData.imageOfTruck || !postData.imageOfTruck || !postData.cuisineType || !postData.currentLocation || !postData.departureTime) {
      res.status(400).json({ message: 'missing field/s'})
  }  else {
      next();
  }
}

function validateTruckInfoCurrentLocation(req, res, next) {
  const postData = req.body;
   if (!postData.currentLocation ) {
      res.status(400).json({ message: 'missing current location field'})
  }  else {
      next();
  }
}


//Validate Photo

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

function validatePhotoInfo(req, res, next) {
  const postData = req.body;
  if(postData.image === "") {
      res.status(400).json({ message: "image can not can not be empty" });
  } else {
      next();
  }
}

module.exports = router;
