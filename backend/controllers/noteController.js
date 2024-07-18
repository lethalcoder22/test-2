const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  const { title, content, tags, backgroundColor } = req.body;

  const note = new Note({
    user: req.user._id,
    title,
    content,
    tags,
    backgroundColor,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id, trashed: false });
  res.json(notes);
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    tags,
    backgroundColor,
    archived,
    trashed,
    reminder,
  } = req.body;

  const note = await Note.findById(id);

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  note.title = title;
  note.content = content;
  note.tags = tags;
  note.backgroundColor = backgroundColor;
  note.archived = archived;
  note.trashed = trashed;
  note.reminder = reminder;

  const updatedNote = await note.save();
  res.json(updatedNote);
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  note.trashed = true;
  await note.save();

  res.json({ message: "Note moved to trash" });
};

exports.getTrashedNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id, trashed: true });
  res.json(notes);
};
