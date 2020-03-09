exports.seed = function(knex) {
  return knex("itemPhotos").insert([
    {
      image: "sjfhjashdajshd",
      menu_id: 1
    }
  ])
}
