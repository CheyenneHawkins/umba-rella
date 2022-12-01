import { UserAuth } from "../contexts/AuthContextNew";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, firestore, modUserDbEntry } from "./firebase";
import { umbrella } from "./SignIn";
import { Container, FormStyles, Title } from "./Styles";
import { useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";

export default function Account(){

    const { user, logout} = UserAuth();

    const navigate = useNavigate();

    const [zipCode, setZipCode] = useState('');
    const [threshold, setThreshold] = useState('');
    const [frequency, setFrequency] = useState('');
    const [time, setTime] = useState('');
    const [userInfo, setUserInfo] = useState();

    async function logOutButton(){
        try {
            await logout()
            // navigate("/signupphone")
        } catch (e) {
            console.log(e.message)
        }
        console.log("OK")
    }

    function updateUserDbEntry(userID, zipState, thresholdState, frequencyState, timeState){
        const dataGroup = {
        //   zipcode: zipState,
        //   threshold: thresholdState,
        //   frequency: frequencyState,
        //   time: timeState        
        }
        if (zipCode != '' ){
            dataGroup.zipcode = zipState
        };
        if (threshold != '' ){
            dataGroup.threshold = thresholdState
        };
        if (frequency != '')  {
            dataGroup.frequency = frequencyState;
        };
        if (time != '')  {
            dataGroup.time = timeState;
        };

        modUserDbEntry(userID, dataGroup);
    }

    function runUpdate() {
        updateUserDbEntry(user.uid);
    }

    const displayPhoneNumber = `(${user?.phoneNumber?.slice(2,5)}) ${user?.phoneNumber?.slice(5,8)}-${user?.phoneNumber?.slice(8,13)}`;

    function handleSubmit(e){
        e.preventDefault();
        console.log("SUBMITTED")
        // console.log(zipCode)
        // console.log(threshold)
        // console.log(frequency)
        // console.log(time)
        updateUserDbEntry(user.uid, zipCode, threshold, frequency, time)
    }

    async function getUserData(){
        const userID = user?.uid;
        const docRef = doc(firestore, `users/${userID}`);
        const userAccountInfo = await getDoc(docRef);
        if (userAccountInfo.exists()) {
        // console.log("Document data:", userAccountInfo.data());
        setUserInfo(userAccountInfo.data())
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    getUserData();


    return (
        <>
        <Container>
        <FormStyles>
            <Title>
                <div></div>
                <h1>Umba-Rella</h1>
                <img src={umbrella} alt="Umba-rella" />
            </Title>
            <h2>ACCOUNT</h2>
            <h3>{user && user.email }</h3>
            <h4>{user && displayPhoneNumber }</h4>
            {/* <h4>{user && user.phoneNumber }</h4> */}
            {user && <form>
                <fieldset className='vertshift'>
                    <label>Zipcode</label>
                    <input type="number" className="centertext" onChange={(e)=> setZipCode(e.target.value)} placeholder={userInfo?.zipcode}/>
                </fieldset>
                <fieldset className='vertshift'>
                    <label>Threshold</label>
                    <input type="text" className="centertext" onChange={(e)=> setThreshold(e.target.value)} placeholder={userInfo?.threshold}/>
                </fieldset>
                <fieldset className='vertshift'>
                    <label>Frequency</label>
                    <input type="text" className="centertext" onChange={(e)=> setFrequency(e.target.value)} placeholder={userInfo?.frequency}/>
                </fieldset>
                <fieldset className='vertshift'>
                    <label>Time</label>
                    <input type="number" className="centertext" onChange={(e)=> setTime(e.target.value)} placeholder={userInfo?.time}/>
                </fieldset>
                <button type="submit" onClick={handleSubmit}>Update</button>

            </form>}
            {user && <button type="button" onClick={logOutButton}>LOG OUT</button>}
            {user && <button type="button" onClick={getUserData}>???</button>}
            {/* {user && <button type="button" onClick={console.log(userInfo.zipcode)}>LOG</button>} */}
            <h3>{!user && <a href="/signupphone">Sign in</a>}</h3>
        </FormStyles>
        </Container>
        </>
    )


}