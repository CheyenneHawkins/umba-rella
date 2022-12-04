import { useRef, useState } from "react";
import styled from "styled-components";
import umbrella from "../images/Umbrella3.png"
import { UserAuth } from "../contexts/AuthContextNew";
import { useNavigate } from "react-router-dom";
import { auth, writeUserDbEntry } from "./firebase";
import { RecaptchaVerifier } from "firebase/auth";
import { Container, FormStyles, Title } from "./Styles";
import "../aux.css"
import wait from "waait";



export default function SignUpPhone(){

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

    const { createUserPhone } = UserAuth();

    const generateRecaptcha = ()=> {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, auth);
    }

    //---------this runs on new sign up or sign in
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log("Submit Clicked");

        //recaptcha process
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;

        //stores the formatted phone number in state
        //to send to db entry
        setPhoneFormatted(`+1 ${phone}`);

        //state version of formatted number isn't working for
        //the authentication, so this stores a temporary version to pass
        let phoneFormattedTemp = `+1 ${phone}`;

        //ui increment
        setotpField('otpshow')
        setPhoneField('hide')
        setOtpSubmitButton(true)
        
        //Sends info to create user
        createUserPhone(phoneFormattedTemp, appVerifier).then(confirmationResult => {
            window.confirmationResult = confirmationResult;
        }).catch ((error) => {
                console.log(error)
            })
        }

    //---------this runs on entering the one time code
    const verifyOTP = async (e) => {
        //grabs the input
        let otp = e.target.value;
        setOTP(otp);
        //once 6 digits are entered, automatically submits
        if (otp.length ===6){

            //checks code for confirm
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then(async (result) => {

                //creates user object
                const user = result.user;
                //creates user database entry
                await createUserDbEntry(user.uid);

                }).catch((error) => {

                });
            await wait(1000)
            navigate("/account")
        
        }
    }

    //--------creates data object for user db entry
    function createUserDbEntry(userID){
        const dataGroup = {
          name: '',
          //grabs the formatted number from state
          phoneNumber: phoneFormatted,
          zipcode: '',
          locationcode: '',
          threshold: '',
          frequency: '',
          time: '',
          userId: userID,
        }
        writeUserDbEntry(userID, dataGroup);
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
                <div className="" >
                    <button type="button" onClick={()=> {
                        // testDB();
                        console.log("Did it work?");
                    }}>DB TEST</button>
                </div>
            </FormStyles>
        </Container>
        </>
    )

}
