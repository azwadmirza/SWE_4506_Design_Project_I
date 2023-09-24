import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import AboutUs from './pages/AboutUs';
import Verification from './features/verification/pages/Verification';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/verify/:id" element={<Verification/>}/>
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
