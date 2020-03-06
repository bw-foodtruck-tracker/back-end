const db = require('../database/dbconfig.js');



module.exports = {
    add,
    find,
    findBy,
    findById,
    updateOperator,
    removeOperator,
    findByIdTruckAll,
    findByIdTruck,
    findByTruckName,
    addTruck,
    updateTruck,
    removeTruck,
    findByIdMenu,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
    findByIdItemPhotos,
    updateItemPhotos,
    addItemPhotos,
    removeItemPhotos,
    findOperatorTrucks,
    findByIdTruckFav,

    findCustomerRatingTruck,
    findCustomerRatingMenu,

    findByLocationId,
    addLocationTruck,
    updateLocationtruck,
    removeLocationTruck
  };

  // Location Truck


  function findByLocationId(id) {
    return db('location_truck')
      .where('truck_id', id)
  }

  function addLocationTruck(id, location) {
    return db('location_truck')
        .insert(location, 'id')
        .then(()=> {
            return findByLocationId(id);
          });
}

function updateLocationtruck(truck_id, changes) {
  return db('location_truck')
    .where({ truck_id })
    .update(changes)
    .then(() => {
      return findByLocationId(truck_id);
    });
}

function removeLocationTruck(truck_id) {
  return db('location_truck')
    .where({truck_id})
    .del();
}

  //
  function find() {
    return db('operators')
  }

  function findBy(search) {
      return db('operators')
        // .select('id', 'username', 'password')
        .where(search)
  }


  function findById(id) {
    return db('operators')
      .select('id', 'username', 'email', 'role')
      .where('operators.id', id)
      .first()
  }



 
function add(user) {
    return db('operators')
        .insert(user, 'id')
        .then(ids => {
            return findById(ids[0]);
          });
}

function updateOperator(id, changes) {
  return db('operators')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function removeOperator(id) {
  return db('operators')
    .where('id', id)
    .del();
}



// Truck CRUD

function findByIdTruck(id) {
  return db('trucks')
    .where('trucks.id', id)
    .first()
}

function findOperatorTrucks(id) {
  return db('trucks as t')
    .join('operators as o', 'o.id', 't.operator_id')
    .select('t.*')
    .where('t.operator_id', id)
}




function findCustomerRatingTruck(id) {
  return db('customer_rating_truck as crt')
    .join('trucks as t', 't.id', 'crt.truck_id')
    .where('crt.truck_id', id)
}

function findCustomerRatingMenu(id) {
  return db('customer_rating_menu as crm')
    .join('trucks as t', 't.id', 'crm.menu_id')
    .where('crm.menu_id', id)
}

function findByIdTruckAll(id) {
  return db('itemPhotos as ip')
    .join('menuItems as mi', 'mi.id', 'ip.menu_id')
    .where('ip.menu_id', id)
    
}

function findByTruckName(search) {
  return db('trucks')
    // .select('id', 'username', 'password')
    .where('truckName', search)
}

function findByIdTruckFav(id) {
  return db('trucks')
    .where({id})
}

function addTruck(truck) {
  return db('trucks')
      .insert(truck, 'id')
      .then(ids => {
          return findByIdTruck(ids[0]);
        });
}

function updateTruck(id, changes) {
  return db('trucks')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByIdTruck(id);
    });
}

function updateTruckCurrentLocation(id, changes) {
  return db('trucks')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByIdTruck(id);
    });
}

function removeTruck(id) {
  return db('trucks')
    .where('id', id)
    .del();
}

// Menu Crud

function findByIdMenu(id) {
  return db('menuItems')
    .where('menuItems.id', id)
    .first()
}

function addMenuItem(item) {
  return db('menuItems')
      .insert(item, 'id')
      .then(ids => {
          return findByIdMenu(ids[0]);
        });
}

function updateMenuItem(id, changes) {
  return db('menuItems')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByIdMenu(id);
    });
}

function removeMenuItem(id) {
  return db('menuItems')
    .where('id', id)
    .del();
}



// itemPhotos CRUD

function findByIdItemPhotos(id) {
  return db('itemPhotos')
    .where('itemPhotos.id', id)
    .first()
}


function addItemPhotos(item) {
  return db('itemPhotos')
      .insert(item, 'id')
      .then(ids => {
          return findByIdItemPhotos(ids[0]);
        });
}

function updateItemPhotos(id, changes) {
  return db('itemPhotos')
    .where({ id })
    .update(changes)
    .then(() => {
      return findByIdItemPhotos(id);
    });
}

function removeItemPhotos(id) {
  return db('itemPhotos')
    .where('id', id)
    .del();
}

