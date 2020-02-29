const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    addTruck,
    updateTruck
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

// Truck CRUD

function findByIdTruck(id) {
  return db('trucks')
    .where('trucks.id', id)
    .first()
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
