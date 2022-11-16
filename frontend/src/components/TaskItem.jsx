import { Link } from 'react-router-dom'

function TaskItem({ task }) {
  return (
    <div className='ticket'>
      <div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
      <div>{task.title}</div>
      <div className={`status status-${task.status}`}>{task.status}</div>
      <Link to={`/task/${task._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default TaskItem
