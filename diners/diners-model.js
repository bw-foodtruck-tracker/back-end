const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByCustomerRatingId,
    addCustomerRatingTruck,
    updateCustomerRatingTruck,
    removeCustomerRatingTruck,
    findByCustomerRatingMenuItemId,
    addCustomerRatingMenu,
    updateCustomerRatingMenu,
    removeCustomerRatingMenu,
    findFavouriteTrucksById,
    addFavouriteTrucks,
    removeFavouriteTrucks,
    findFavTruckByDinerId,
    findFavouriteTrucksById2
  };

  function find() {
    return db('diners')
  }

  function findBy(search) {
      return db('diners')
        .where(search)
  }



  function findById(id) {
    return db('diners')
      .where({ id })
      .first();
  }

 
function add(user) {
    return db('diners')
        .insert(user)
        .then(ids => {
            return findById(ids[0]);
          });
}

// Customer Rating Truck

function findByCustomerRatingId(id) {
  return db('customerRatingTruck')
    .where({ id })
    .first();
}


function addCustomerRatingTruck(item) {
  return db('customerRatingTruck')
      .insert(item)
      .then(ids => {
          return findByCustomerRatingId(ids[0]);
        });
}

function updateCustomerRatingTruck(id, changes) {
  return db('customerRatingTruck')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByCustomerRatingId(id);
    });
}

function removeCustomerRatingTruck(id) {
  return db('customerRatingTruck')
    .where('id', id)
    .del();
}

// Customer Rating MenuItem

function findByCustomerRatingMenuItemId(id) {
  return db('customerRatingMenu')
    .where({ id })
    .first();
}


function addCustomerRatingMenu(item) {
  return db('customerRatingMenu')
      .insert(item)
      .then(ids => {
          return findByCustomerRatingMenuItemId(ids[0]);
        });
}

function updateCustomerRatingMenu(id, changes) {
  return db('customerRatingMenu')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByCustomerRatingMenuItemId(id);
    });
}

function removeCustomerRatingMenu(id) {
  return db('customerRatingMenu')
    .where('id', id)
    .del();
}

// Favourite Trucks

function findFavouriteTrucksById(id) {
  return db('favouriteTrucks')
    .where('diner_id', id)
    // .first();
}



function findFavouriteTrucksById2(truck_id) {
  return db('favouriteTrucks')
    .join('trucks as t')
    .select('favouriteTrucks.id', 't.*')
    .where('t.id', truck_id)
    
}

function findFavTruckByDinerId(id) {
  return db('favouriteTrucks')
    
    .where({id})
}




function addFavouriteTrucks(item) {
  return db('favouriteTrucks')
      .insert(item)
      // .then(ids => {
      //     return findFavouriteTrucksById(ids[0]);
      //   });
}


function removeFavouriteTrucks(id) {
  return db('favouriteTrucks')
    .where('id', id)
    .del();
}

