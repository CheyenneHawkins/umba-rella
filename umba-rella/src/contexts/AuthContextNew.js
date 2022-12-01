import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {auth} from "../components/firebase";

const UserContext = createContext();

export function AuthContextProvider( {children} ) {
    const [user, setUser] = useState({})

    const createUserEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const createUserPhone = (phone, appVerifier) => {
        return signInWithPhoneNumber(auth, phone, appVerifier)
    };

    const signin = (email, password) => {
        return signInWithEmailAndPassword(auth, email,password)

    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(user)
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }

    })


    return (
        <UserContext.Provider value={{ createUserEmail, createUserPhone, user, logout, signin }}>
            {children}
        </UserContext.Provider>
    ) 

}

export const UserAuth = ()=> {
    return useContext(UserContext)
}