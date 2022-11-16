import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {createTask} from '../features/tasks/taskSlice'
import BackButton from '../components/BackButton'

function NewTask() {
  const { user } = useSelector((state) => state.auth)


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTask({ title, description }))
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/tasks')
        toast.success('New task created!')
      })
      .catch(toast.error)
  }

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h1>Create New Task</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>{user.name}: Task</label>
        
        </div>
       
        <form onSubmit={onSubmit}>
          
          <div className='form-group'>
          <label htmlFor='product'>Title</label>
            <input
               name='product'
               id='product'
               value={title}
               onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder=''
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTask
