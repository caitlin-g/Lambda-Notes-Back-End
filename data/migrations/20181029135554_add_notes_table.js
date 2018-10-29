exports.up = function(knex) {
  return knex.schema.createTable("notes", notes => {
    notes.increments();
    notes
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
    notes
      .string("title", 128)
      .notNullable()
      .unique();
    notes.string("note_text", 400).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
