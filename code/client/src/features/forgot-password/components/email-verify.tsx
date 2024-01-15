import OtpInput from 'react18-input-otp';
import { useState } from "react";
import 'bootstrap';
import OTPValidityTimer from '../../../partials/OTPTimer';
import PasswordReset from './forgot-password-reset';
import axios from 'axios';

type ForgotPasswordProps = {
    email: string
};

const ForgotPasswordEmailVerify = ({ email }: ForgotPasswordProps) => {
    const [otp, setOTP] = useState("");
    const [isDisabled] = useState(true);
    const [isLocked, setisLocked] = useState(false);
    const [error, setError] = useState(false);
    const [enterotp, setEnterotp] = useState(true);
    const handleTimerExpire = () => {
        setisLocked(true);
    }

    const resend = () => {
        window.location.reload();
    }

    const handleSubmit = async () => {
        setEnterotp(false);
        await axios.post('http://127.0.0.1:8000/api/forgot/otp/verify/', {
            email: email,
            otp: otp
            }).then((res) => {
                console.log(res);
                setError(true);
                setEnterotp(false);
                }).catch((error) => {
                    console.log(error);
                    setError(error.response.data.message);
                    setEnterotp(true);
                    setOTP("");
    });
    }

    if (enterotp) {
        return (
            <div className="verifyDiv">
                <p className="p2">
                    An OTP has been sent to your entered email {email}
                </p>
                <p className="p2" style={{ color: 'red' }}>{error}</p>
                <div className="otpElements">
                    <p className="p3">Enter your Code here</p>
                    <div className="otp">
                        <OtpInput
                            onChange={setOTP}
                            value={otp}
                            numInputs={6}
                            className='otpbox'
                            separator={<span> </span>}
                        />
                    </div>
                    <p>OTP is valid for: <OTPValidityTimer validityPeriodInSeconds={180} onTimerExpired={handleTimerExpire} /></p>

                </div>
                <div style={{ marginBottom: '2%' }}><p className="p3">Didn't receive the code?</p></div>

                <div className="d-flex mx-auto w-100">
                    <div className="w-50">
                        <button className='custom-button full-width' disabled={isDisabled} onClick={resend}>Resend</button>
                    </div>
                    <div className="w-50">
                        <button className='custom-button full-width' disabled={isLocked} style={{ marginLeft: '2%' }} onClick={() => handleSubmit()}>
                            Verify
                        </button>
                    </div>


                </div>


            </div>
        );
    }
    else {
        return (
            <PasswordReset email={email}></PasswordReset>
        )
    }
}

export default ForgotPasswordEmailVerify;