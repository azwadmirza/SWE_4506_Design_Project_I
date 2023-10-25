import Card from 'react-bootstrap/Card';
import ForgotPasswordSendEmail from '../components/forgot-password-send-email';
import '../assets/css/forgot.css';

const ForgotPassword = () => {
    return (
        <div className='forgot'>
            <div className="navbar" style={{color:"darkgreen",height:"65px"}}>

            </div>
            <section className='d-flex justify-content-center'>
                <Card className='forgot-password'>
                    <Card.Header className='' style={{ textAlign: "center", fontSize: "20px" }}><b>Forgot Password</b></Card.Header>
                    <Card.Body>
                        <ForgotPasswordSendEmail />
                    </Card.Body>
                </Card>
            </section>
        </div>
    );
}

export default ForgotPassword;