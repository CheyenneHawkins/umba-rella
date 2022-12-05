import { UserAuth } from "../contexts/AuthContextNew";
import { firestore, modUserDbEntry } from "./firebase";
import { umbrella } from "./SignIn";
import { Container, FormStyles, Title } from "./Styles";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import axios from 'axios';


export default function Account(){

    const { user, logout} = UserAuth();

    const [zipCode, setZipCode] = useState('');
    const [locationCode, setLocationCode] = useState('');
    const [threshold, setThreshold] = useState('');
    const [frequency, setFrequency] = useState('');
    const [time, setTime] = useState('');
    const [userInfo, setUserInfo] = useState();

    let userInfoTemp;

    async function logOutButton(){
        try {
            await logout()
        } catch (e) {
            console.log(e.message)
        }
        console.log("OK")
    }

    function getCode(){
            console.log('Getting location code...');
            const zip = zipCode;
            const zipurl = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&q=${zip}`
            axios.get(zipurl).then((response)=>{
                const newLocationCode = response.data[0].Key;
                setLocationCode(newLocationCode);
                console.log("New Code:");
                console.log(locationCode);
                console.log(`Should be ${newLocationCode}`);
                });

    }


    function updateUserDbEntry(userID, zipState, locationState, thresholdState, frequencyState, timeState){

        const dataGroup = {
      
        }
        if (zipCode !== '' ){
            dataGroup.zipcode = zipState
            
        };
        if (locationCode !== '' ){
            dataGroup.locationcode = locationState
        };
        if (threshold !== '' ){
            dataGroup.threshold = thresholdState
        };
        if (frequency !== '')  {
            dataGroup.frequency = frequencyState;
        };
        if (time !== '')  {
            dataGroup.time = timeState;
        };

        modUserDbEntry(userID, dataGroup);
    }


    const displayPhoneNumber = `(${user?.phoneNumber?.slice(2,5)}) ${user?.phoneNumber?.slice(5,8)}-${user?.phoneNumber?.slice(8,13)}`;

    function handleSubmit(e){
        e.preventDefault();
        getCode();
        updateUserDbEntry(user.uid, zipCode, locationCode, threshold, frequency, time)
    }

    async function getUserData() {
        if (userInfo === undefined) {
            const userID = user?.uid;
            const docRef = doc(firestore, "users", `${userID}`);
            const docSnap = await getDoc(docRef);
            userInfoTemp = docSnap?.data();
            setUserInfo(userInfoTemp);
            // console.log(docSnap?.data())

        }

            
    }

    getUserData();

    // useEffect(getUserData(),[])

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
                    <input type="number" className="centertext" onChange={(e)=> {
                            setZipCode(e.target.value)
                        }} placeholder={userInfo?.zipcode}/>
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