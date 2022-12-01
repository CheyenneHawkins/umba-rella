import styled from "styled-components";

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
    & h1 {
        font-size: 2.5rem;
        /* margin-top: 20px; */
    }
    `

const FormStyles = styled.div`
    font-family: soleil,sans-serif;
    font-weight: 400;
    font-style: normal;
    height: 650px;
    width: 400px;
    z-index: 2;
    margin: 100px 0px;
    padding: 0px;
    background: linear-gradient(11deg, rgba(179,143,219,1) 0%, rgba(138,168,204,1) 100%);   
    border: none;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    & h1 {
        /* font-style: italic; */
        font-size: 3rem;
        transform: skewY(-5deg);
    }
    & form {
        display: grid;
        justify-content: center;
        /* text-align: left; */
        font-size: 18px;
        & input {
            color: var(--dark);
            font-size: 1rem;
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            border-radius: 15px;
            border: none;
            margin: 5px 0px;
            padding: 5px 10px;
            width: 200px;
            overflow: hidden;
            :focus {
                outline: var(--dark) solid 1px;
            }
        }
        & button {
            background: var(--white);
            border-radius: 20px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
            width: 100px;
            border: none;
            padding: 10px;
            margin-top: 10px;
            /* width: 100px; */
            font-weight: 700;
            justify-self: center;
            transition: all .3s;
            cursor: pointer;
            :hover {

            };
            :active {
                transform: scale(.98);
            };
        }
        & fieldset {
            border: none;
            margin-bottom: 20px;

        }
        & a {
            text-decoration: none;
        }
    }
 `

    const Title = styled.div`
    margin-top: 25px;
        display: grid;
        grid-template-columns: 1fr 70% 1fr;
        & img {
            display: flex;
            height: auto;
            width: 90%;
            padding-top: 5px;
            margin-left: -15px;
            /* transform: skew(-20deg); */
        }
    `

export { Container, FormStyles, Title }
