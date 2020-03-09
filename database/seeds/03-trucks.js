
exports.seed = function(knex) {
  return knex("trucks").insert([
    {
      truckName: "Mark",
      imageOfTruck: "ajsgdhg1213",
      cuisineType: "italian",
      customerRatingAvg: "",
      operator_id: 1
    }
  ])
}