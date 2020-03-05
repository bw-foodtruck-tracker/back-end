const db = require('../database/dbconfig.js');




module.exports = {
    add,
    find,
    findBy,
    findById,
    findByIdDiner,
    updateDiner,
    removeDiner,
    findByCustomerRatingId,
    addCustomerRatingTruck,
    updateCustomerRatingTruck,
    removeCustomerRatingTruck,
    findByCustomerRatingMenuItemId,
    findMenuRatingById,
    addCustomerRatingMenu,
    updateCustomerRatingMenu,
    removeCustomerRatingMenu,
    findFavouriteTrucksById,
    findTruckRatingById,
    addFavouriteTrucks,
    removeFavouriteTrucks,
    findFavTruckByDinerId,
    findFavouriteTrucksById2,
    findByTruckSearch,
    findByCustomerRatingMenuAvg,
    findByCustomerRatingTruckAvg,
    findByCuisineType,
    findByRating
  };

  // Diner search

  function findByRating(customerRatingAvg) {
    return db('trucks')
      .where('customerRatingAvg', '>=', customerRatingAvg)
  }

  function findByCuisineType(search) {
    return db('trucks')
      .where('cuisineType', search)
  }

//

  function find() {
    return db('diners')
  }

  function findBy(search) {
      return db('diners')
        .where(search)
  }

  function findByIdDiner(id) {
    return db('diners as d')
      .select('d.username', 'd.id', 'd.email', 'd.currentLocation', 'd.role')
      .where({ id })
  }

  function findById(id) {
    return db('diners')
      .where({ id })
      .first();
  }

 
function add(user) {
    return db('diners')
        .insert(user, 'id')
        .then(ids => {
            return findById(ids[0]);
          });
}

function updateDiner(id, changes) {
  return db('diners')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByIdDiner(id);
    });
}

function removeDiner(id) {
  return db('diners')
    .where('id', id)
    .del();
}

// Customer Rating Truck


function findByCustomerRatingId(id) {
  return db('customer_rating_truck')
    .where({ id })
    .first();
}

function findTruckRatingById(truck_id, diner_id){
  return db('customer_rating_truck as crt')

  .where({truck_id})
  .where('diner_id', diner_id )
}

function addCustomerRatingTruck(item) {
  return db('customer_rating_truck')
      .insert(item, 'id')
      .then(ids => {
          return findByCustomerRatingId(ids[0]);
        });
}

function updateCustomerRatingTruck(id, changes) {
  return db('customer_rating_truck')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByCustomerRatingId(id);
    });
}

function removeCustomerRatingTruck(id) {
  return db('customer_rating_truck')
    .where('id', id)
    .del();
}

// Customer Rating MenuItem

function findByCustomerRatingMenuItemId(id) {
  return db('customer_rating_menu')
    .where({ id })
    .first();
}

function findMenuRatingById(menu_id, diner_id){
  return db('customer_rating_menu as crm')

  .where({menu_id})
  .where('diner_id', diner_id )
}


function findByCustomerRatingMenuAvg(menu_id) {
  return db('customer_rating_menu as crm')
    .avg('rating')
    .where({ menu_id })
    
}

function addCustomerRatingMenu(item) {
  return db('customer_rating_menu')
      .insert(item, 'id')
      .then(ids => {
          return findByCustomerRatingMenuItemId(ids[0]);
        });
}

function updateCustomerRatingMenu(id, changes) {
  return db('customer_rating_menu')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByCustomerRatingMenuItemId(id);
    });
}

function removeCustomerRatingMenu(id) {
  return db('customer_rating_menu')
    .where('id', id)
    .del();
}

// Favourite Trucks

function findByTruckSearch(search) {
  return db('favourite_trucks')
    .where(search)
}

function findFavouriteTrucksById(diner_id) {
  return db('favourite_trucks')
    .where({diner_id})
    // .first();
}



function findFavouriteTrucksById2(truck_id, diner_id) {
  return db('favourite_trucks as ft')
    
    
    .where({truck_id})
    .where('diner_id', diner_id )
}


function findFavTruckByDinerId(id) {
  return db('favourite_trucks')
  
    
    .where({id})
}




function addFavouriteTrucks(item) {
  return db('favourite_trucks')
      .insert(item, 'id')
      .then(ids => {
          return findFavouriteTrucksById(ids[0]);
        });
}




function removeFavouriteTrucks(id) {
  return db('favourite_trucks')
    .where('id', id)
    .del();
}

function findByCustomerRatingTruckAvg(truck_id) {
  return db('customer_rating_truck as crt')
    .avg('crt.rating')
    .where({truck_id})
    
}



