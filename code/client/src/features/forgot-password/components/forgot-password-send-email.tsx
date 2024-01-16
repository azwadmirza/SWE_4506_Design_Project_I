import Form from 'react-bootstrap/Form';
import { useState } from "react";

import ForgotPasswordEmailVerify from './email-verify';
import { IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import axios from 'axios';

const ForgotPasswordSendEmail = () => {
    const [emailSent, isEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        console.log(email);
        await axios.post(`${import.meta.env.VITE_BACKEND_REQ_ADDRESS}/api/forgot/otp/`, {
            email: email
        }).then(() => {
            isEmailSent(true);
        }).catch((error) => {
            console.log(error);
            setErrorMessage(error.response.data.message);
        })
    }
    if (!emailSent) {
        return (
            <Form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
                <Form.Group>
                    <div className="errorMessage" style={{ color: "red" }}>
                    </div>
                </Form.Group>
                <div className="error-box" style={{color:"red"}}>
                    {errorMessage}
                </div>
                <div className="inputbox">
                    <IonIcon icon={mailOutline}></IonIcon>
                    <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} required />
                    <label htmlFor="">Email</label>
                </div>

                <div className='d-flex justify-content-center'>
                    <button className='d-flex w-100  mx-auto custom-button full-width' type="submit" disabled={isDisabled}>
                        Send Recovery Email
                    </button>
                </div>
            </Form>
        );
    }
    else {
        return <ForgotPasswordEmailVerify email={email} />
    }
}

export default ForgotPasswordSendEmail;