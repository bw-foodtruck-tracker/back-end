
exports.seed = function(knex) {
  return knex("customer_rating_truck").insert([
    {
      rating: 5,
      truck_id: 1,
      diner_id: 1
    }
  ])
}
