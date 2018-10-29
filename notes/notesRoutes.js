const express = require("express");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

//Get a list of all notes
router.get("/notes", (req, res) => {
  db("notes")
    .select("id", "title", "note_text")
    .then(notes => {
      res.json(notes);
    })
    .catch(err => res.send(err));
});

module.exports = router;
