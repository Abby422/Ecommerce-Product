import './App.css';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import Navigation from './Components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <LandingPage />
      <Footer/>
    </div>
  );
}

export default App;
