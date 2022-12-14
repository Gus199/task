const express = require('express')
const router = express.Router()
const {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:taskId/notes', noteRouter)

router.route('/').get(protect, getTasks).post(protect, createTask)

router
  .route('/:id')
  .get(protect, getTask)
  .delete(protect, deleteTask)
  .put(protect, updateTask)

module.exports = router
