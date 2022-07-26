import Footer from './Components/Footer/Footer';
import './App.css'
import {Provider} from 'react-redux'
import { Outlet } from 'react-router';
import store from './redux/store'
import Navigation from './Components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <Navigation/>
        <Outlet />
        <Footer/>
      </Provider>
    </div>
  );
}

export default App;
