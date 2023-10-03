import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'



const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div className='banner'>

        <img
        src="/fluffmallobackdrop.jpeg"
        alt="backdrop image"
        />
      <h1>Fluff-Mallows</h1>

      </div>
    </>
  )
}

export default HomePage
