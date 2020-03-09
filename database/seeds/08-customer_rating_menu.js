
exports.seed = function(knex) {
  return knex("customer_rating_menu").insert([
    {
      rating: 3,
      menu_id: 1,
      diner_id: 1
    }
  ])
}
