exports.seed = function(knex) {
  return knex("operators").insert([
    {
      username: "ferssss",
      password: "Herman6*",
      email: "christian@email.com"
    }
  ])
}