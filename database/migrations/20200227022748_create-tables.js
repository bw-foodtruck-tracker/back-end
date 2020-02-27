exports.up = function(knex) {
    return knex.schema
      .createTable('operators', tbl => {
        tbl.increments();
        tbl.string('username', 128)
          .unique()
          .notNullable()
        tbl.string('password', 128)
          .notNullable()
        tbl.string('email', 128)
          .notNullable()
        tbl.specificType('trucksOwned', 'text ARRAY');
      })
      .createTable('diners', tbl => {
        tbl.increments();
        tbl.string('username', 128)
          .unique()
          .notNullable()
        tbl.string('password', 128)
          .notNullable()
        tbl.string('email', 128)
          .notNullable()
        tbl.string('currentLocation', 255)
        tbl.specificType('favoriteTrucks', 'text ARRAY');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('operators')
      .dropTableIfExists('diners');
  };