const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
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
  };

  function find() {
    return db('operators')
  }

  function findBy(search) {
      return db('operators')
        // .select('id', 'username', 'password')
        .where(search)
  }

//   function findByDepartment(search) {
//     return db('users')
//       .select('id', 'username', 'password')
//       .where('users.department', search)
// }

  function findById(id) {
    return db('operators')
      .select('id', 'username', 'email', 'role')
      .where('operators.id', id)
      .first()
  }



 
function add(user) {
    return db('operators')
        .insert(user)
        .then(ids => {
            return findById(ids[0]);
          });
}

function findOperatorTrucks(id) {
  return db('trucks as t')
    .join('operators as o', 'o.id', 't.operator_id')
    .select('t.*')
    .where('t.operator_id', id)
}

// Truck CRUD

function findByIdTruck(id) {
  return db('trucks')
    .where('trucks.id', id)
    .first()
}

function findByTruckName(search) {
  return db('trucks')
    // .select('id', 'username', 'password')
    .where(search)
}

function findByIdTruckFav(id) {
  return db('trucks')
    .where({id})
}

function addTruck(truck) {
  return db('trucks')
      .insert(truck)
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
      .insert(item)
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
      .insert(item)
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

