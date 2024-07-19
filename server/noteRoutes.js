const express = require('express');
const Note = require('./model/note');
const auth = require('./middleware/auth');

const router = express.Router();

router.post('/add', auth, async (req, res) => {
    const note = new Note({
        ...req.body,
        user: req.user._id
    });
    try {
        await note.save();
        res.status(201).json(note);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/get', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.patch('/update/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;