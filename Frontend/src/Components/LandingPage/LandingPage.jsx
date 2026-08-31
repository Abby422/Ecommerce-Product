import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { GrInstagram, GrFacebook } from 'react-icons/gr';
import { FiTwitter, FiChevronsRight } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './LandingPage.css';
import ImageOne from '../../Images/Caurosel1.jpg';
import ImageTwo from '../../Images/Caurosel2.jpg';
import ImageThree from '../../Images/Caurosel3.jpg';
import Products from '../Products/Products';

const SLIDES = [
  { src: ImageOne, alt: 'A styled living room' },
  { src: ImageTwo, alt: 'A bedroom with layered textiles' },
  { src: ImageThree, alt: 'A dining table set for a meal' },
];

// react-slick reads camelCase props: the old markup passed slideToShow and
// slideToScroll, neither of which exists, so both were silently ignored.
const SLIDER_SETTINGS = {
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
  fade: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

function LandingPage() {
  return (
    <div className="home-content-container">
      <div className="landing-page-container">
        <div className="landingPage">
          <div className="landing-page-content">
            <h1>MADE FOR YOU</h1>
            <h2>ALL FOR YOUR HOME</h2>
            <p>
              At SPACEJOY you will find a considered selection of furniture, decor and
              accessories — from affordable everyday pieces to the one thing a room is built
              around.
            </p>

            {/* The link used to wrap nothing at all, leaving the CTA unclickable. */}
            <Link to="/register" className="call-to-action">
              Sign up <FiChevronsRight />
            </Link>
          </div>
        </div>

        <div className="landing-caurosel">
          <div className="slider-container">
            <Slider {...SLIDER_SETTINGS}>
              {SLIDES.map((slide) => (
                <div key={slide.src}>
                  <img src={slide.src} className="slider" alt={slide.alt} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="social-handles">
          <a href="https://instagram.com" aria-label="Instagram" rel="noreferrer" target="_blank">
            <GrInstagram />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" rel="noreferrer" target="_blank">
            <FiTwitter />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" rel="noreferrer" target="_blank">
            <GrFacebook />
          </a>
        </div>
      </div>

      <Products />
    </div>
  );
}

export default LandingPage;
