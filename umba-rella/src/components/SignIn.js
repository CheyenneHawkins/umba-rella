import styled from "styled-components";
import umbrella from "../images/Umbrella2.png"


const Container = styled.div`
    --lightblue: #BDF8FF;
    --lightgreen: #8AD0CE;
    --white: #FAFEFF;
    --dark: #4B585E;
    font-family: scriptorama-markdown-jf,sans-serif;
    font-weight: 700;
    font-style: bold;
    height: 100vh;
    color: var(--white);
    /* margin: 0px 500px; */
    /* border: gray solid 1px; */
    display: grid;
    text-align: center;
    justify-content: center;
    & img {
        position: fixed;
        right: 40%;
        top: 10px;
        height: auto;
        width: auto;
        /* transform: rotate(20deg); */
        /* opacity: .2; */
        z-index: 1;
    }
    & h1 {
        font-size: 2.5rem;
        margin-top: 20px;
    }
    `

const FormStyles = styled.div`
    font-family: soleil,sans-serif;
    font-weight: 400;
    font-style: normal;
    height: 600px;
    width: 400px;
    z-index: 2;
    margin: 100px 0px;
    padding: 0px;
    /* background: var(--dark); */
    /* background: var(--lightgreen); */
    /* background: rgb(179,143,219); */
    background: linear-gradient(11deg, rgba(179,143,219,1) 0%, rgba(138,168,204,1) 100%);   
    border: none;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    & h1 {
        transform: skew(-10deg);
    }
    & form {
        display: grid;
        justify-content: center;
        /* text-align: left; */
        font-size: 18px;
        & input {
            color: var(--dark);
            font-size: 1.2rem;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            border-radius: 15px;
            border: none;
            margin: 5px 0px;
            padding: 0px 10px;
            width: 200px;
        }
        & button {
            background: var(--white);
            border-radius: 20px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
            width: 100px;
            border: none;
            padding: 10px;
            /* width: 100px; */
            font-weight: 700;
            justify-self: center;
            transition: all .3s;
            cursor: pointer;
            :hover {

            };
            :active {
                transform: scale(.95);
            };
        }
        & fieldset {
            border: none;
            margin-bottom: 20px;

        }
    }
 
 `

export default function SignIn(){
    function handleSubmit(e){
        // e.preventDefault();
        console.log(e);
    }


    return (
        <>
        <Container>
            {/* <img src={umbrella} alt="umbrella" height={50} /> */}
            <FormStyles>
                <h1>Umba-Rella</h1>
                <form>
                <fieldset>
                    <label>Phone Number</label>
                    <input type="number"/>
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input type="password"/>
                </fieldset>
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
                </form>
            </FormStyles>
        </Container>
        </>
    )

}

export { Container }