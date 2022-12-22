import { useRef, useState } from "react";
import umbrella from "../images/Umbrella3.png"
import blob from "../images/Blobby.svg"
import { UserAuth } from "../contexts/AuthContextNew";
import { useNavigate } from "react-router-dom";
import { auth, writeUserDbEntry } from "./firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { Container, FormStyles, Title, Welcome } from "./Styles";
import "../aux.css"
import wait from "waait";



export default function Start(){

    const navigate = useNavigate();
    

    const phoneRef = useRef();
    const passwordRef = useRef();

    const [phone, setPhone] = useState('');
    const [phoneFormatted, setPhoneFormatted] = useState('');
    const [password, setPassword] = useState('');
    const [OTP, setOTP] = useState('');
    const [error, setError] = useState('');
    const [otpField, setotpField] = useState('hide');
    const [otpSubmitButton, setOtpSubmitButton] = useState(false)
    const [phoneField, setPhoneField] = useState('show');
    const [buttonDisable, setButtonDisable] = useState(true);

    const { createUserPhone } = UserAuth();



    return (
        <>
        <Container>
            <FormStyles>
            <Title>
                <div></div>
                <h1>Umba-Rella</h1>
                <img src={umbrella} alt="Umba-rella" />
            </Title>
            <div className="white-skew-box">
            {/* <img scr={blob} alt='background blob'/> */}
            </div>
            <Welcome>
                <h2>Always forgetting your umbrella?</h2>
                <span>Want a text reminder whenever rain is in the forecast for your area?</span>
               <button type="button" className="signup" onClick={()=>{navigate('/signupphone')}}>SIGN UP</button>
            </Welcome>
            </FormStyles>
        </Container>
        </>
    )

}
