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
import { useEffect } from 'react';
import Error404 from './partials/error404';


function App() {
  const accessToken:string|null=localStorage.getItem("access_token")===null?null:String(localStorage.getItem("access_token"));
  const verification:boolean|null=localStorage.getItem("verification")===null?null:localStorage.getItem("verification")==="false"?false:true;
  const refreshToken:string|null=localStorage.getItem("refresh_token")===null?null:String(localStorage.getItem("refresh_token"));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing access_token={accessToken} refresh_token={refreshToken} verification={verification}/>}/>
          {!accessToken && <Route path="/login" element={<SignIn location='login'/>}/>}
          {!accessToken && <Route path="/signup" element={<SignIn location='signup'/>}/>}
          {<Route path="/about-us" element={<AboutUs/>}/>}
          {verification===false && <Route path="/verification" element={<Verification/>}/>}
          {accessToken && <Route path="/profile" element={<ProfilePage/>}/>}
          {accessToken && <Route path="/profile/change-password/:id" element={<ChangePassword/>}/>}
          {accessToken && <Route path="/data" element={<Data/>}/>}
          <Route path='*' element={<Error404/>}/>
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
