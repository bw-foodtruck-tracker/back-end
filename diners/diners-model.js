const db = require('../database/dbconfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById
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
