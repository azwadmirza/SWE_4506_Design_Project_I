import EmailVerification from "../components/emailVerification";
import '../assets/css/verification.css';
import PhoneVerification from "../components/phoneVerification";
import { useParams } from "react-router-dom";
const Verification = () => {
  const {id,type}=useParams();
  return ( 
    <div className="verification">
      {type==="email" && (<EmailVerification id={id}/>)}
      {type==="phone" && (<PhoneVerification id={id}/>)}
    </div>
   );
}
 
export default Verification;