const db = require('../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    // findByDepartment,
  };

  function find() {
    return db('diners')
  }

  function findBy(search) {
      return db('diners')
        .select('id', 'username', 'password')
        .where(search)
  }

//   function findByDepartment(search) {
//     return db('users')
//       .select('id', 'username', 'password')
//       .where('users.department', search)
// }

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
