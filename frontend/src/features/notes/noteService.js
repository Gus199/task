import axios from 'axios'

const API_URL = '/api/tasks/'

// Get task notes
const getNotes = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + taskId + '/notes', config)

  return response.data
}

// Create task note
const createNote = async (noteText, taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + taskId + '/notes',
    {
      text: noteText,
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService
