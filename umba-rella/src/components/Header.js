import { useNavigate } from "react-router-dom"
import styled from "styled-components";

export default function Header() {

    const ButtonGroup = styled.div`
        display: flex;
        justify-content: center;
        padding: 20px;
        & button {
            margin: 0px 20px;

        }
    
    `


    const navigate = useNavigate();

    return (
        <ButtonGroup>
            <button type="button" onClick={()=>{navigate("/signup")}}>SIGN UP PAGE</button>
            <button type="button" onClick={()=>{navigate("/signupphone")}}>SIGN UP PHONE PAGE</button>
            <button type="button" onClick={()=>{navigate("/signin")}}>SIGN IN PAGE</button>
            <button type="button" onClick={()=>{navigate("/account")}}>ACCOUNT</button>
            <button type="button" onClick={()=>{navigate("/special")}}>SPECIAL</button>
        </ButtonGroup>


    )

}