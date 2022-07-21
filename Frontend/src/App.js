import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import Navigation from './Components/Navigation/Navigation';
import Products from './Components/Products/Products';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <LandingPage />
      <Products />
      <Footer/>
    </div>
  );
}

export default App;
