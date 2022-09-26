import React from "react";
import "./LandingPage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrInstagram, GrFacebook } from "react-icons/gr";
import { FiTwitter, FiChevronsRight } from "react-icons/fi";
import ImageOne from "../../Images/Caurosel1.jpg";
import ImageTwo from "../../Images/Caurosel2.jpg";
import ImageThree from "../../Images/Caurosel3.jpg";
import Products from "../Products/Products";
import {Link} from 'react-router-dom'

function LandingPage() {
  return (
    <div className="home-content-container">
    <div className="landing-page-container">
      <div className="landingPage">
        <div className="landing-page-content">
          <div>
            <h1>MADE FOR YOU</h1>
          </div>
          <div>
            <h2>ALL FOR YOUR HOME</h2>
          </div>
          <div>
            <h3>
              At SPACEJOY, you will discover the best selection of the most
              popular home decor and beauty items including furniture, home
              décor, accessories and more. Our selection is outstanding and
              ranges from affordable to luxury. Shop at SPACEJOY and take your
              home decor budget to the next level.
            </h3>
          </div>
          
          <div className="call-to-action">
            <Link to={`/register`}></Link>Sign up <FiChevronsRight />
          </div>
        </div>
      </div>

      <div className="landing-caurosel">
        <div className="slider-container">
          <Slider autoplay={true} autoplaySpeed={3000} dots={true} fade={true} infinite={true} slideToShow={1} slideToScroll={1}>
            <div>
              <img src={ImageOne} className="slider " alt="caurosel"></img>
            </div>
            <div>
              <img src={ImageTwo} className="slider " alt="caurosel2"></img>
            </div>
            <div>
              <img src={ImageThree} className="slider " alt="caurosel3"></img>
            </div>
          </Slider>
        </div>
      </div>
      <div className="social-handles">
        <div>
          <GrInstagram />
        </div>
        <div>
          <FiTwitter />
        </div>
        <div>
          <GrFacebook />
        </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

export default LandingPage;
