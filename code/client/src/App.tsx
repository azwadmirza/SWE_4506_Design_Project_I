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
import ProfilePage from './features/profile/pages/profile';
import ChangePassword from './features/profile/pages/change-password';
import Data from './features/sheets/pages/sheets';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/verify/:id" element={<Verification/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/profile/change-password/:id" element={<ChangePassword/>}/>
          <Route path="/data" element={<Data/>}/>
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
