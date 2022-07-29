import Footer from './Components/Footer/Footer';
import './App.css'
import { Outlet } from 'react-router';
import Navigation from './Components/Navigation/Navigation';

function Home() {
  return (
    <div className="Home">
        <Navigation/>
        <Outlet />
        <Footer/>
    </div>
  );
}

export default Home;