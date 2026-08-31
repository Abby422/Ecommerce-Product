import { Outlet } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
import DemoBanner from './Components/common/DemoBanner';

function App() {
  return (
    <div className="App">
      <DemoBanner />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
