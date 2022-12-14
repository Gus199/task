const asyncHandler = require('express-async-handler')

const Task = require('../models/taskModel')

// @desc    Get user tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id })

  res.status(200).json(tasks)
})

// @desc    Get user task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(task)
})

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if (!title || !description) {
    res.status(400)
    throw new Error('Please add a title and description')
  }

  const task = await Task.create({
    title,
    description,
    user: req.user.id,
    status: 'todo',
  })

  res.status(201).json(task)
})

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await task.remove()

  res.status(200).json({ success: true })
})

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(404)
    throw new Error('Task not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTask)
})

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,

}
