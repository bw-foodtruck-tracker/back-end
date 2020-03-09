exports.seed = function(knex) {
  return knex("menuItems").insert([
    {
      itemName: "chili",
      itemDescription: "bowl of chili",
      itemPrice: 12.50,
      customerRatingAvg: "",
      truck_id: 1
    }
  ])
}
