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
    findByTruckSearch
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

function findTruckRatingById(truck_id, diner_id){
  return db('customerRatingTruck as crt')

  .where({truck_id})
  .where('diner_id', diner_id )
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

function findMenuRatingById(menu_id, diner_id){
  return db('customerRatingMenu as crm')

  .where({menu_id})
  .where('diner_id', diner_id )
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

function findByTruckSearch(search) {
  return db('favouriteTrucks')
    .where(search)
}

function findFavouriteTrucksById(diner_id) {
  return db('favouriteTrucks')
    .where({diner_id})
    // .first();
}



function findFavouriteTrucksById2(truck_id, diner_id) {
  return db('favouriteTrucks as ft')
    
    
    .where({truck_id})
    .where('diner_id', diner_id )
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

