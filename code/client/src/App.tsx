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
import Error404 from './partials/error404';
import { useAppSelector } from './contexts/auth/hooks';
import Sheets from './features/sheets/pages/sheets';
import ForgotPassword from './features/forgot-password/pages/forgot-password';

function App() {
  const accessToken = useAppSelector((state) => state.auth.access_token);
  const verification = useAppSelector((state) => state.auth.verification);
  const refreshToken = useAppSelector((state) => state.auth.refresh_token);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing access_token={accessToken} refresh_token={refreshToken} verification={verification}/>}/>
          {!accessToken && (
          <>
          <Route path="/login" element={<SignIn location='login'/>}/>
          <Route path="/signup" element={<SignIn location='signup'/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/about-us" element={<AboutUs/>}/>
          </>
          )}
          {accessToken &&( 
          <>
          {(verification===false && <Route path="/verification" element={<Verification/>}/>) || (
            <>
              <Route path="/profile" element={<ProfilePage/>}/>
              <Route path="/profile/change-password" element={<ChangePassword/>}/>
              <Route path="/data" element={<Sheets/>}/>
            </>
          )}
          </>
          )}
          <Route path='*' element={<Error404/>}/>
          </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
