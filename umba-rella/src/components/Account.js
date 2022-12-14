import { UserAuth } from "../contexts/AuthContextNew";
import { firestore, modUserDbEntry } from "./firebase";
import { umbrella } from "./SignIn";
import { Container, FormStyles, Title } from "./Styles";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import axios from 'axios';
import wait from "waait";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";



export default function Account(){


    const { user, logout} = UserAuth();

    const navigate = useNavigate();


    const [zipCode, setZipCode] = useState('');
    const [locationCode, setLocationCode] = useState('');
    const [threshold, setThreshold] = useState('');
    const [frequency, setFrequency] = useState('');
    const [time, setTime] = useState('');
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(false);

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
    const currentZip = `(${user?.zipCode}`;

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        // getCode();
        updateUserDbEntry(user.uid, zipCode, locationCode, threshold, frequency, time)
        await wait(1000)
        setLoading(false);
        navigate("/weather")
    }

    async function getUserData() {
        const q = query(collection(firestore, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const formattedPhone = doc.data().phoneNumber.slice(3,13) 
        console.log("----------");
        console.log(formattedPhone);
        console.log(doc.data().zipcode);
        }
        );
        // console.log(querySnapshot);
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
            <h2>ACCOUNT</h2>
            {/* <h3>{user && user.email }</h3> */}
            <h3>{user && displayPhoneNumber }</h3>

            {/* <h4>{user && user.phoneNumber }</h4> */}
            {user && <form>
                <fieldset className='vertshift'>
                    <label>Zipcode</label>
                    <input type="text" className="centertext" onChange={(e)=> {
                            setZipCode(e.target.value)
                        }} placeholder={userInfo?.zipcode}/>
                </fieldset>
                {/* <fieldset className='vertshift'>
                    <label>Threshold</label>
                    <input type="text" className="centertext" onChange={(e)=> setThreshold(e.target.value)} placeholder={userInfo?.threshold}/>
                </fieldset> */}
                {/* <fieldset className='vertshift'>
                    <label>Frequency</label>
                    <input type="text" className="centertext" onChange={(e)=> setFrequency(e.target.value)} placeholder={userInfo?.frequency}/>
                </fieldset> */}
                {/* <fieldset className='vertshift'>
                    <label>Time</label>
                    <input type="number" className="centertext" onChange={(e)=> setTime(e.target.value)} placeholder={userInfo?.time}/>
                </fieldset> */}
                <button type="submit" onClick={handleSubmit} disabled={loading}>Update</button>

            </form>}
            {/* {user && <button type="button" onClick={getUserData}>???</button>} */}
            {/* {user && <button type="button" onClick={console.log(userInfo.zipcode)}>LOG</button>} */}
            <h3>{!user && <a href="/signupphone">Sign in</a>}</h3>
            <div className="lowbox">
                {user && <button type="button" onClick={logOutButton} className="clearbutton">LOG OUT</button>}
            </div>
        </FormStyles>
                <button type="button" onClick={getUserData}>USERS?</button>
        </Container>
        </>
    )

}

