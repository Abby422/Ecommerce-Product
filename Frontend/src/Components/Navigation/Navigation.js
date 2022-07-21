import React from 'react'
import './Navigation.css'
import {IconContext} from "react-icons";
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoSearchOutline, IoCartOutline} from 'react-icons/io5'
import {CgProfile} from 'react-icons/cg'

function Navigation() {
  return (
    <div className='Navigation'>
        <div className='abby-navigation-logo'>
            <GiHamburgerMenu/>
            <div className='logo'>SPACEJOY</div>
        </div>
      <IconContext.Provider value={{size: 25 }}>
        <div className='abby-navigation-left'>
            <input type='search'name='searchBar' />
            <div className='search-icon'><IoSearchOutline /></div>
            <div className='profile'><CgProfile /></div>
            <div className='cart-icon'><IoCartOutline /></div>
        </div>
        </IconContext.Provider>
    </div>
  )
}

export default Navigation