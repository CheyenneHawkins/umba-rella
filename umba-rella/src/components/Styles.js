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
    @media (max-width: 650px) {
        width: 100vw;
        height: 100vh;
        margin: 0px;
        border-radius: 0px;
    }
    font-family: soleil,sans-serif;
    font-weight: 400;
    font-style: normal;
    height: 650px;
    width: 400px;
    z-index: 2;
    margin: 20px 0px;
    padding: 0px;
    background: linear-gradient(11deg, rgba(179,143,219,1) 0%, rgba(138,168,204,1) 100%);   
    border: none;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    overflow-x: hidden;

    /* justify-content: center; */
    & h1 {
        font-size: 3rem;
        transform: skewY(-5deg);
    }
    & h2 {
        margin-top: -15px;
    }
    & form {
        display: grid;
        justify-content: center;
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
                /* outline: var(--dark) solid 1px; */
                outline: none;
            }
        }
        & button {
            color: var(--dark);
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
    & button {
        padding: 5px;
        margin: 8px;
    }

    & div {

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

    const Welcome = styled.div`
        padding: 30px 20%;
        /* transform: skewY(-5deg); */
        display: grid;
        justify-content: center;
        overflow-x: hidden;

        & h2 {
            color: var(--dark);
        }
        & span {
            color: var(--white);
            font-size: 1.5rem;
        }
        & button {
            color: var(--white);
            background: var(--dark);
            border-radius: 20px;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
            width: 100px;
            border: none;
            padding: 10px;
            margin-top: 40px;
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
    
    `

export { Container, FormStyles, Title, Welcome }
