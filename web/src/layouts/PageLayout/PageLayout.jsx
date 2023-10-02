import {Link, routes} from '@redwoodjs/router'

const PageLayout = ({ children }) => {
  return <>
      <header>
        <label className='logo'>Fluff Mallows</label>
        <nav>
          <ul className='nav_links'>
            <li className='navli'><Link className='link' to={routes.home()}>Home</Link></li>
            <li className='navli'><Link className='link' to={routes.home()}>Home</Link></li>
            <li className='navli'><Link className='link' to={routes.home()}>Home</Link></li>
            <li className='navli'><Link  className='link' to={routes.home()}>Home</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
}

export default PageLayout
