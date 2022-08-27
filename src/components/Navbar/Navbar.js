import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {


  return (
      <nav className="NavBar" >
          <Link to='/'>
            <h3>Ecommerce</h3>
          </Link>
          <div className="Categories">
              <NavLink to='/category/papeleria' className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Papeleria</NavLink>
              <NavLink to='/category/libreria' className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Libreria</NavLink>
            
          </div>
          <CartWidget />
      </nav>
  )
}

export default NavBar