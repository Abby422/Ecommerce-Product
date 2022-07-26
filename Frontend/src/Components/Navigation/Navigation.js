import React, {useState} from 'react'
import './Navigation.css'
import {IconContext} from "react-icons";
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoSearchOutline, IoCartOutline} from 'react-icons/io5'
import {CgProfile} from 'react-icons/cg'
import { Link } from 'react-router-dom'

function Navigation() {
  const [search, setSearch] = useState(null)
  return (
    <div className='Navigation'>
        <div className='abby-navigation-logo'>
            <GiHamburgerMenu/>
            <div className='logo'>SPACEJOY</div>
        </div>
      <IconContext.Provider value={{size: 25 }}>
        <div className='abby-navigation-left'>
            <input type='search'name='searchBar' onChange={e =>{setSearch(e.target.value)}} />
            <Link to={`/search/${search}`}><div className='search-icon'><IoSearchOutline /></div></Link>
            <div className='profile'><CgProfile /></div>
            <Link to={`/cart`} ><div className='cart-icon'><IoCartOutline /></div></Link>
        </div>
        </IconContext.Provider>
    </div>
  )
}

export default Navigation