const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    backgroundColor: { type: String, default: "white" },
    archived: { type: Boolean, default: false },
    trashed: { type: Boolean, default: false },
    reminder: { type: Date },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
