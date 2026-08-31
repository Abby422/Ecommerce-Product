import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
import DemoBanner from './Components/common/DemoBanner';
import CartDrawer from './Components/common/CartDrawer';

function App() {
  const { pathname, search } = useLocation();

  // Client-side navigation keeps the old scroll position, which lands you
  // halfway down a product page you have never seen.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <div className="App">
      <DemoBanner />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default App;
