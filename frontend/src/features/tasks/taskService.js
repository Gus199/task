import axios from 'axios'

const API_URL = '/api/tasks/'

// Create new ticket
const createTask = async (taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, taskData, config)

  return response.data
}

// Get user tickets
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user ticket
const getTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + taskId, config)

  return response.data
}

// Progress ticket
const inProgressTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + taskId,
    { status: 'in-progress' },
    config
  )

  return response.data
}
// Close ticket
const doneTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + taskId,
    { status:'done'},
   
    config
  )

  return response.data
}
const taskService = {
  createTask,
  getTasks,
  getTask,
  inProgressTask,
  doneTask,
}

export default taskService
