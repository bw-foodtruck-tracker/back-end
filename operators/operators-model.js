const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    // findByDepartment,
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
      .where({ id })
      .first();
  }

 
function add(user) {
    return db('operators')
        .insert(user)
        .then(ids => {
            return findById(ids[0]);
          });
}
