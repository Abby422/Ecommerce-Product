import Footer from './Components/Footer/Footer';
import './App.css'
import { Outlet } from 'react-router';
import Navigation from './Components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
        <Navigation/>
        <Outlet />
        <Footer/>
    </div>
  );
}

export default App;
