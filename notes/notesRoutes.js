const express = require("express");

const notes = require("./notesModel.js");

const knex = require("knex");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Get a list of all notes
router.get("/", (req, res) => {
  notes
    .find()
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => res.status(500).json(err));
});

//Add a new note
router.post("/", (req, res) => {
  const { user_id, title, note_text } = req.body;
  const note = { user_id, title, note_text };

  notes
    .add(note)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
