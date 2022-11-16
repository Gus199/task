const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel')
const Task = require('../models/taskModel')

// @desc    Get notes for a task
// @route   GET /api/tasks/:taskId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId)

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ task: req.params.taskId })

  res.status(200).json(notes)
})

// @desc    Create task note
// @route   POST /api/tasks/:taskId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId)

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    task: req.params.taskId,
    user: req.user.id,
  })

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}
