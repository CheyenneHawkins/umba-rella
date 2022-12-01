import { useRef, useState } from "react";
import styled from "styled-components";
import umbrella from "../images/Umbrella3.png"
import { UserAuth } from "../contexts/AuthContextNew";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { Container, FormStyles, Title } from "./Styles";
import "../aux.css"


export default function SignUpPhone(){

    const navigate = useNavigate();
    

    const phoneRef = useRef();
    const passwordRef = useRef();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [OTP, setOTP] = useState('');
    const [error, setError] = useState('');
    const [otpField, setotpField] = useState('hide');
    const [otpSubmitButton, setOtpSubmitButton] = useState(false)
    const [phoneField, setPhoneField] = useState('show');

    const { createUserPhone } = UserAuth();

    const generateRecaptcha = ()=> {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, auth);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log("Submit Clicked");
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        let phoneFormatted = `+1 ${phone}`
        console.log(phoneFormatted);
        console.log(password);
        setotpField('otpshow')
        setPhoneField('hide')
        setOtpSubmitButton(true)
        createUserPhone(phoneFormatted, appVerifier).then(confirmationResult => {
            window.confirmationResult = confirmationResult;
        }).catch ((error) => {
                console.log(error)
            })
        }

    const verifyOTP = (e) => {
        let otp = e.target.value;
        setOTP(otp);
        if (otp.length ===6){
            setOtpSubmitButton(false)
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {

                const user = result.user;

                }).catch((error) => {

                });
            console.log(OTP)
            navigate("/account")
        
        }
    }

    const submitOTP = ()=> {
    }

    return (
        <>
        <Container>
            <FormStyles>
            <Title>
                <div></div>
                <h1>Umba-Rella</h1>
                <img src={umbrella} alt="Umba-rella" />
            </Title>
                <form>
                    <fieldset className={phoneField}>
                        <label>Phone Number</label>
                        <input type="number" ref={phoneRef} onChange={(e)=> setPhone(e.target.value)}/>
                        <button type="submit" onClick={handleSubmit} disabled={otpSubmitButton}>Send Code</button>
                    </fieldset>
                    {/* <fieldset>
                        <label>Password</label>
                        <input type="password" ref={passwordRef} onChange={(e)=> setPassword(e.target.value)}/>
                    </fieldset> */}
                    <fieldset className={otpField}>
                        <label>Enter Code</label>
                        <input type="text" value={OTP} onChange={verifyOTP} className="centertext"/>
                        {/* <button type="submit" onClick={submitOTP} disabled={otpSubmitButton}>Confirm</button> */}
                    </fieldset>
                </form>
                <div id="recaptcha-container">

                </div>
                <div className="bottomfeeder" >
                    <button type="button" onClick={()=> {
                        setPhoneField("show")
                        setotpField("otpshow")
                        setOtpSubmitButton(false)
                    }}>SHOW ALL FIELDS</button>
                </div>
            </FormStyles>
        </Container>
        </>
    )

}
