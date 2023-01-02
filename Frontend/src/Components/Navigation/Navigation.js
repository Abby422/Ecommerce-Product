import React, {useState} from 'react'
import './Navigation.css'
import {IconContext} from "react-icons";
// import {GiHamburgerMenu} from 'react-icons/gi'
import {IoSearchOutline, IoCartOutline} from 'react-icons/io5'
import {CgProfile} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const style = {color : 'black', textDecoration : 'none'}
function Navigation() {
  const [search, setSearch] = useState(null)
  const {cart} = useSelector(state => (state.cart))
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className='Navigation'>
            {/* <Link to={`/`} style={style}><GiHamburgerMenu/></Link> */}
            <div className='logo'>SPACEJOY</div>
        <div className='abby-navigation-logo'>
            <div className='home'><Link to={`/`} style={style}>Home</Link></div>
            <div className='about' ><Link to={`/about`} style={style}>About</Link></div>
        </div>
            
      <IconContext.Provider value={{size: 25 }}>
        <div className='abby-navigation-left'>
            
            <input type='search'name='searchBar' onChange={e =>{setSearch(e.target.value)}} />
            <Link to={`/search/${search}`} style={style}><div className='search-icon'><IoSearchOutline /></div></Link>
            {user? <div className='profile' style={style}><CgProfile /><p> Welcome {user.userName}</p></div>: <div className='profile' style={style}><CgProfile /></div>}
            <Link to={`/cart`} style={style}><div className='cart-icon'><IoCartOutline />{cart.length === 0 ?  '' :  <div className='cart-count'>{cart.length}</div>}</div></Link>
        </div>
        </IconContext.Provider>
    </div>
  )
}

export default Navigation