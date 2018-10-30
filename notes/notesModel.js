const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findByUserId,
  add,
  update,
  remove
};

//Get all notes
function find() {
  return db("notes");
}

//Get a note by ID
function findById(id) {
  return db("notes")
    .where({ id })
    .first();
}

//Get all notes by a specific user
function findByUserId(id) {
  return db("notes")
    .join("users", "users.id", "notes.user_id")
    .select("notes.id", "notes.title", { user: "users.username" })
    .where("notes.user_id", id);
}

//Add a note
function add(note) {
  return db("notes")
    .insert(note)
    .into("notes");
}

//Update a note
function update(id, changes) {
  return db("notes")
    .where({ id })
    .update(changes);
}

//Delete a note
function remove(id) {
  return db("notes")
    .where({ id })
    .del();
}
