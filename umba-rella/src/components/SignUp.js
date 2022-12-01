import { useRef, useState } from "react";
import styled from "styled-components";
import umbrella from "../images/Umbrella3.png"
import { UserAuth } from "../contexts/AuthContextNew";
import { useNavigate } from "react-router-dom";
import { Container, FormStyles, Title } from "./Styles";


export default function SignUp(){

    const navigate = useNavigate();
    
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    // const { signUp } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { createUserEmail } = UserAuth();

    function translateEmail() {
        setEmail(emailRef.current.value)
    }

    function translatePassword() {
        setPassword(passwordRef.current.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createUserEmail(email,password)
            navigate("/account")

        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
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
                    <fieldset>
                        <label>Phone Number</label>
                        <input type="number" ref={phoneRef}/>
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input type="email" ref={emailRef} onChange={(e)=> setEmail(e.target.value)}/>
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <input type="password" ref={passwordRef} onChange={(e)=> setPassword(e.target.value)}/>
                    </fieldset>
                    <fieldset>
                        <label>Confirm Password</label>
                        <input type="password" ref={passwordConfirmRef}/>
                    </fieldset>
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </form>
            </FormStyles>
        </Container>
        </>
    )

}
