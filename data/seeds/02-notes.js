exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { user_id: 2, title: "Hello", note_text: "Goodbye" },
        { user_id: 2, title: "Is this the...", note_text: "Krusty Krab?" },
        { user_id: 3, title: "No", note_text: "This is Patrick!" },
        { user_id: 1, title: "Title", note_text: "Note Text" }
      ]);
    });
};
