const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    addTruck,
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

  function findByIdTruck(id) {
    return db('trucks')
      .where('trucks.id', id)
      .first()
  }

 
function add(user) {
    return db('operators')
        .insert(user)
        .then(ids => {
            return findById(ids[0]);
          });
}

function addTruck(truck) {
  return db('trucks')
      .insert(truck)
      .then(ids => {
          return findByIdTruck(ids[0]);
        });
}
