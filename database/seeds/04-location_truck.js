
exports.seed = function(knex) {
  return knex("location_truck").insert([
    {
      address: "Mexico",
      longitude: "",
      latitude: "",
      departureTime: "12:30pm",
      truck_id: 1
    }
  ])
}
