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

//Add a new note
router.post("/notes", (req, res) => {
  const { user_id, title, note_text } = req.body;
  const note = { user_id, title, note_text };

  //   if (!title || !user_id || note_text) {
  //     return res.status(400).json({
  //       error: "Please provide a title, user ID, and text for your notes."
  //     });
  //   }
  db.add(note)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
