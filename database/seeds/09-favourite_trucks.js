
exports.seed = function(knex) {
  return knex("favourite_trucks").insert([
    {
      truck_id: 1,
      diner_id: 1
    }
  ])
}
