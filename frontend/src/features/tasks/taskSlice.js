import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'
// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise reolved or rejected messages at
// component level
const initialState = {
  tasks: null,
  task: null,
}

// Create new ticket
export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await taskService.createTask(taskData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user tickets
export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await taskService.getTasks(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user ticket
export const getTask = createAsyncThunk(
  'tasks/get',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await taskService.getTask(taskId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Close ticket
export const inProgressTask = createAsyncThunk(
  'tasks/in-progress',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await taskService.inProgressTask(taskId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)
// Close ticket
export const doneTask = createAsyncThunk(
  'taskts/done',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await taskService.doneTask(taskId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of tickets for simpler state management with no need for a reset
// function

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        // NOTE: clear single ticket on tickets page, this replaces need for
        // loading state on individual ticket
        state.task = null
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.task = action.payload
      })
      .addCase(inProgressTask.fulfilled, (state, action) => {
        state.task = action.payload
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        )
      })
      // .addCase(doneTicket.fulfilled, (state, action) => {
      //   state.ticket = action.payload
      //   state.tickets = state.tickets.map((ticket) =>
      //     ticket._id === action.payload._id ? action.payload : ticket
      //   )
      // })
  },
})

export default taskSlice.reducer
