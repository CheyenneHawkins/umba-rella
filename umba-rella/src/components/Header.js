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
        @media (max-width: 650px) {
            display: none;
        }

    `
    const navigate = useNavigate();

    return (
        <ButtonGroup>
            {/* <button type="button" onClick={()=>{navigate("/signupphone")}}>SIGN UP PHONE PAGE</button>
            <button type="button" onClick={()=>{navigate("/account")}}>ACCOUNT</button>
            <button type="button" onClick={()=>{navigate("/info")}}>INFO</button>
            <button type="button" onClick={()=>{navigate("/weather")}}>WEATHER</button> */}
        </ButtonGroup>

    )

}