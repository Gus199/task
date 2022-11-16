import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../features/tasks/taskSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TaskItem'

function Tasks() {
  const { tasks } = useSelector((state) => state.tasks)

  const dispatch = useDispatch()



  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])


  if (!tasks) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Tasks</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Task</div>
          <div>Status</div>
          <div></div>
        </div>
        {tasks.map((task) => (
          <TicketItem key={task._id} task={task} />
        ))}
      </div>
    </>
  )
}

export default Tasks
