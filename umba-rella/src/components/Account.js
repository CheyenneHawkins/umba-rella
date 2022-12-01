import { UserAuth } from "../contexts/AuthContextNew";
import { Navigate, useNavigate } from "react-router-dom";
import { umbrella } from "./SignIn";
import { Container, FormStyles, Title } from "./Styles";

export default function Account(){

    const { user, logout} = UserAuth();

    const navigate = useNavigate();

    console.log(user);

    async function logOutButton(){
        try {
            await logout()
            // navigate("/signupphone")
        } catch (e) {
            console.log(e.message)
        }
        console.log("OK")
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
            <h1>ACCOUNT</h1>
            {/* <h3>{user && user.email || user.phoneNumber}</h3> */}
            <h3>{user && user.email }</h3>
            <h3>{user && user.phoneNumber }</h3>
            {user && <button type="button" onClick={logOutButton}>LOG OUT</button>}
            <h3>{!user && <a href="/signupphone">Sign in</a>}</h3>
        </FormStyles>
        </Container>
        </>
    )


}