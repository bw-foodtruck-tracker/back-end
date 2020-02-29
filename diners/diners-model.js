const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByCustomerRatingTruckId,
    addCustomerRatingTruck,
    updateCustomerRatingTruck,
    removeCustomerRatingTruck
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


function findByCustomerRatingTruckId(id) {
  return db('customerRatingTruck')
    .where('customerRatingTruck.id', id)
    .first()
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