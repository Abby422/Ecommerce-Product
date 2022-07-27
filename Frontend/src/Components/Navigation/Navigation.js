import React, {useState} from 'react'
import './Navigation.css'
import {IconContext} from "react-icons";
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoSearchOutline, IoCartOutline} from 'react-icons/io5'
import {CgProfile} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const style = {color : 'black'}
function Navigation() {
  const [search, setSearch] = useState(null)
  const {cart} = useSelector(state => (state.cart))
  return (
    <div className='Navigation'>
        <div className='abby-navigation-logo'>
            <Link to={`/`} style={style}><GiHamburgerMenu/></Link>
            <div className='logo'>SPACEJOY</div>
        </div>
      <IconContext.Provider value={{size: 25 }}>
        <div className='abby-navigation-left'>
            <input type='search'name='searchBar' onChange={e =>{setSearch(e.target.value)}} />
            <Link to={`/search/${search}`} style={style}><div className='search-icon'><IoSearchOutline /></div></Link>
            <div className='profile' style={style}><CgProfile /></div>
            <Link to={`/cart`} style={style}><div className='cart-icon'><IoCartOutline /><div className='cart-count'>{cart.length}</div></div></Link>
        </div>
        </IconContext.Provider>
    </div>
  )
}

export default Navigation