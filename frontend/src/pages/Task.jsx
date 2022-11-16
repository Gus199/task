import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, inProgressTask,doneTask } from '../features/tasks/taskSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Task() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { task } = useSelector((state) => state.tasks)

  const { notes } = useSelector((state) => state.notes)

 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { taskId } = useParams()

  useEffect(() => {
    dispatch(getTask(taskId)).unwrap().catch(toast.error)
    dispatch(getNotes(taskId)).unwrap().catch(toast.error)
  }, [taskId, dispatch])


   // Close ticket
   const onTaskInProgress= () => {

    // isSuccess state
    dispatch(inProgressTask(taskId))
      .unwrap()
      .then(() => {
        toast.success('Task in Progress')
        navigate('/tasks')
      })
      .catch(toast.error)
  }
// Close task
  const onTaskDone = () => {
  
    dispatch(doneTask(taskId))
      .unwrap()
      .then(() => {
        toast.success('Task Done')
        navigate('/tasks')
      })
      .catch(toast.error)
  }
  // Create note submit
  const onNoteSubmit = (e) => {
  
    e.preventDefault()
    dispatch(createNote({ noteText, taskId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (!task) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton />
        <h2>
          Ticket ID: {task._id}
          <span className={`status status-${task.status}`}>
            {task.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(task.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Product: {task.product}</h3>
        <hr />
        <div className='task-desc'>
          <h3>Description of Issue</h3>
          <p>{task.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {task.status !== 'in-progress' && (
        <button onClick={openModal} className='btn' >
          <FaPlus /> Add Note
        </button>
      )}
        {task.status !== 'done' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

     
      {task.status !== 'in-progress' && (
        <button onClick={onTaskInProgress} className='btn btn-block btn-danger' >
         In Progress
        </button>
      )}
       {task.status !== 'done' && (
        <button onClick={onTaskDone } className='btn btn-block btn-danger'>
         Done
        </button>
      )}
    </div>
  )
}

export default Task