exports.seed = function(knex) {
  return knex("diners").insert([
    {
      username: "besss",
      password: "Herman6*",
      email: "christian@email.com"
    }
  ])
}
