exports.up = function(knex) {
    return knex.schema
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
        tbl.string('role', 128).notNullable().defaultTo('diner')
      })
      .createTable('operators', tbl => {
        tbl.increments();
        tbl.string('username', 128)
          .unique()
          .notNullable()
        tbl.string('password', 128)
          .notNullable()
        tbl.string('email', 128)
          .notNullable()
        tbl.string('role', 128).notNullable().defaultTo('operator')
      })
      .createTable('trucks', tbl => {
        tbl.increments()
        tbl.string('truckName', 128).notNullable()
        tbl.string('imageOfTruck', 128);
        tbl.string('cuisineType', 128).notNullable()
        tbl.integer('customerRatingAvg')
        tbl.text('currentLocation')
        tbl.time('departureTime')
        tbl.integer('operator_id')
            .unsigned()
            .notNullable()
            .references('operators.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        })
        .createTable('menuItems', tbl => {
            tbl.increments()
            tbl.string('itemName', 128).notNullable()
            tbl.string('itemDescription', 255);
            tbl.decimal('itemPrice', 14, 2).notNullable()
            tbl.integer('customerRatingAvg')
            tbl.integer('truck_id')
                .unsigned()
                .notNullable()
                .references('trucks.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('itemPhotos', tbl => {
            tbl.increments();
            tbl.string('image', 128).notNullable()
            tbl.integer('menu_id')
                .unsigned()
                .notNullable()
                .references('menuItems.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('customerRatingTruck', tbl => {
            tbl.increments();
            tbl.integer('rating').notNullable()
            tbl.integer('truck_id')
                .unsigned()
                .notNullable()
                .references('trucks.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('diner_id')
                .unsigned()
                .notNullable()
                .references('diners.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('customerRatingMenu', tbl => {
            tbl.increments();
            tbl.integer('rating').notNullable()
            tbl.integer('menu_id')
                .unsigned()
                .notNullable()
                .references('menuItems.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.integer('diner_id')
                .unsigned()
                .notNullable()
                .references('diners.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('favouriteTrucks', tbl => {
            tbl.increments();
            tbl.integer('truck_id')
                .unsigned()
                .notNullable()
                .references('trucks.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('diners_favouriteTrucks', tbl => {
          tbl.integer('diner_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('diners')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
          tbl.integer('favouriteTrucks_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('favouriteTrucks')
              .onUpdate('CASCADE')
              .onDelete('CASCADE');
          tbl.primary(['diner_id', 'favouriteTrucks_id']);
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('diners_favouriteTrucks')
      .dropTableIfExists('favouriteTrucks')
      .dropTableIfExists('customerRatingMenu')
      .dropTableIfExists('customerRatingTruck')
      .dropTableIfExists('ItemPhotos')
      .dropTableIfExists('menuItems')
      .dropTableIfExists('trucks')
      .dropTableIfExists('operators')
      .dropTableIfExists('diners')
      
      
  };

