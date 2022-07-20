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
            <div><GiHamburgerMenu /></div>
            <div>SPACEJOY</div>
        </div>
      <IconContext.Provider value={{size: 25 }}>
        <div className='abby-navigation-left'>
            <div><IoSearchOutline /></div>
            <div><CgProfile /></div>
            <div><IoCartOutline /></div>
        </div>
        </IconContext.Provider>
    </div>
  )
}

export default Navigation