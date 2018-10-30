exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Toby123", password: "pass" },
        { username: "Rupert321", password: "pass" },
        { username: "Mr_banana", password: "pass" }
      ]);
    });
};
