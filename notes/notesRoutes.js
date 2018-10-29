const express = require("express");

const notes = require("./notesModel.js");

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

// Get a note by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await notes.findById(id);

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all the notes by a specified user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const note = await notes.findByUserId(id);

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: "Notes not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
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

// delete a note
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  notes
    .remove(id)
    .then(note => {
      if (!note) {
        res.status(404).json({ message: "No notes found to delete" });
      } else {
        res.status(200).json({ message: "Note deleted successfully!" });
      }
    })
    .catch(err => res.status(500).json(err));
});

// update a note
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  notes
    .update(id, changes)
    .then(note => {
      if (!note) {
        res.status(404).json({ message: "No note found to update." });
      } else {
        res
          .status(200)
          .json({ message: `The note with the id ${id} was updated!` });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
