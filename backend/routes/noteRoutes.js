const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getTrashedNotes,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createNote).get(protect, getNotes);

router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

router.get("/trashed", protect, getTrashedNotes);

module.exports = router;
