import React from 'react'
import './Footer.css'
import { GrInstagram, GrFacebook } from "react-icons/gr";
import { FiTwitter } from "react-icons/fi";

function Footer() {
  return (
    <div className='Footer-container'>
      <div className='footer'>
      <div className='footer-wrapper'>
          <h5>About Us</h5>
          <li>Story</li>
          <li>Clients</li>
          <li>Testimonials</li>
      </div>
      <div className='footer-wrapper'>
          <h5>Services</h5>
          <li>Marketing</li>
          <li>Development</li>
          <li>Sales</li>
      </div>
      <div className='footer-wrapper'>
          <h5>Socials</h5>
          <li><GrFacebook />Facebook</li>
          <li><GrInstagram />Instagram</li>
          <li><FiTwitter />Twitter</li>
      </div>
      </div>
    </div>
  )
}

export default Footer