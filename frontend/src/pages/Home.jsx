import { Link } from 'react-router-dom'


function Home() {
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-task' className='btn btn-reverse btn-block'>
      Create New Task
      </Link>

      <Link to='/tasks' className='btn btn-block'>
        View My Tasks
      </Link>
    </>
  )
}

export default Home
