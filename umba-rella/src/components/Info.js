import { UserAuth } from "../contexts/AuthContextNew";
import { firestore, modUserDbEntry } from "./firebase";
import { umbrella } from "./SignIn";
import { Container, FormStyles, Title } from "./Styles";
import { useEffect, useState } from "react";
import Account from "./Account";
import Weather from "./Weather";


export default function Info(){

    const [currentModule, setCurrentModule] = useState(<Account/>)

    return (
        <>

        </>
    )

}