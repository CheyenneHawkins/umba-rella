import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, FormStyles, Title } from "./Styles";
import { umbrella } from "./SignIn";
import spinner from "../images/Spinner-1s-200px.gif"
import { UserAuth } from '../contexts/AuthContextNew';
import {auth} from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createWeatherMessage, firestore } from "./firebase";
import wait from 'waait';
import { getAuth } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Weather(){

    const { user, logout } = UserAuth();
    const navigate = useNavigate;
    const [city, setCity ] = useState('City');
    const [cityConfirm, setCityConfirm ] = useState('');
    const [zip, setZip] = useState('');
    const [locationCode, setLocationCode] = useState('locationCode');
    const [weather, setWeather ] = useState('');
    const [chanceOfRain, setChanceOfRain] = useState('% rain');
    const [threshold, setThreshold] = useState(0);
    const [loading, setLoading ] = useState(false);
    const [dbZip, setDbZip ] = useState();
    const [pageSignal, setPageSignal] = useState('');


    let zipzip = '';
    let tempThresh = '';

    async function logOutButton(){
        try {
            await logout()
        } catch (e) {
            console.log(e.message)
        }
        navigate('/signupphone')
        console.log("OK")
    }

    const zipUrlStart = `https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&q=`

    //----when chanceofRain state is updated, checks threshold, sends text
    // useEffect(()=>{
    //     if (chanceOfRain !== '% rain' && threshold >= 30){
    //         sendWeatherMessage(user.phoneNumber,chanceOfRain)
    //     }
    // }, [chanceOfRain])

    // useEffect(()=>{
    //     if (city !== cityConfirm){
    //         fullInfoGet();
    //         const cityCopy = city
    //         setCityConfirm(cityCopy);
    //     }
    // }, [])


    //runs the weather cycle on pageload
    useEffect(()=>{
            fullInfoGet();
    }, [pageSignal])

    async function fullInfoGet() {

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("DB ZIPCODE:");
                const docData = docSnap.data();
                console.log(docData?.zipcode);
                zipzip = docData?.zipcode;
                tempThresh = docData?.threshold;
                console.log(tempThresh)
                setDbZip(zipzip);
                setThreshold(tempThresh);
                try {
            //----- runs weather call with zicode retrieved from Firebase
                await accuWeatherApiCall(docData.zipcode).then(
                    console.log("accuWeather call done")
                )                    
                } catch (e) {
                    console.log(e.message)
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

    }

    async function accuWeatherApiCall (zippy){
        console.log('CODE -- getLocationCode Start')
        setLoading(true)
        //----------zipcode search for location code
        axios.get(`${zipUrlStart}${zippy}`).then((response)=>{
            const newLocationCode = response.data[0].Key;
            const newCity = response.data[0].LocalizedName;
        //----------returns city name and location code
            setCity(newCity)
            setLocationCode(newLocationCode)
            //-------define weather api function
            async function runWeather (){
                await wait(300)
                console.log(`New Code: ${newLocationCode}`);
        //----------uses location code to make weather api call
                axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${newLocationCode}?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&details=true`).then(
                    (response)=>{
                        setLoading(false)
                        console.log(`New Code: ${newLocationCode}`);
        //-----------saves complete weather object in state
                        const tempChance = response.data.DailyForecasts[0]?.Day.RainProbability;
                        setWeather(response.data)
                        setChanceOfRain(tempChance)
                        console.log(`END OF WEATHER GET`)
                    });
                };
        //----------run weather api function
                runWeather();
            });
        }

        function sendWeatherMessage(userPhone, rainChance) {
            console.log('SEND MESSAGE')
            console.log(city)
        const dataGroup = {to: userPhone, from: '+15139607429', body: `Bring another umbrella ${city}, there's a ${rainChance}% chance of rain today` }
        const messageID = `${userPhone}-${Math.floor(Math.random() * 1001)}`
        createWeatherMessage(messageID, dataGroup)
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
                {/* <h2>WEATHER</h2> */}

                <br/>
                <h2 className='compact'>{city && city}</h2>
                {/* <h3>Chance of Rain</h3> */}
                <div className='raindiv'>
                    <h3 className='big'>{weather && `${chanceOfRain}%`}</h3>
                    <h2 className='dark'>{weather && `CHANCE OF RAIN`}</h2>
                </div>
                <p>{loading && 
                <img src={spinner} alt='loading' height={90}/>
                }</p>
                <div className="message">
                    {chanceOfRain >= 30 && 
                    <>
                    <h1 className='stacked'>BRING</h1>
                    <h1 className='stacked'>AN</h1>
                    <h1 className='stacked'>UMBRELLA</h1>
                    </>
                    }
                    {chanceOfRain < 30 && 
                    <>
                    <h1 className='stacked'>NO</h1>
                    <h1 className='stacked'>UMBRELLA</h1>
                    <h1 className='stacked'>NEEDED</h1>
                    </>
                    }
                </div>
                {(user && chanceOfRain < 30) &&
                <div className='comfort'>
                    <p>
                    Don't worry, 
                    </p>
                    <p>
                    we'll  
                    <span>
                    &nbsp;text you&nbsp; 
                    </span>
                    when 
                    </p>
                    <p>
                    it looks like rain.
                    </p>
                </div>}
                {(user && chanceOfRain >= 30) &&
                <div className='comfort'>
                <p>
                    And remember, 
                    </p>
                    <p>
                    we'll  
                    <span>
                    &nbsp;text you&nbsp; 
                    </span>
                    anytime 
                    </p>
                    <p>
                    it looks like rain.
                    </p>
                </div>
                }
                <div className="lowbox">
                    {user && <button type="button" onClick={(e)=>{
                        e.preventDefault();
                        console.log('WORKS');
                        navigate('/account');
                        }} className="clearbutton">ACCOUNT</button>}
                    {user && <button type="button" onClick={logOutButton} className="clearbutton">LOG OUT</button>}
                </div>
            </FormStyles>
            <div>
                {/* <button onClick={fullInfoGet}>RUN IT</button> */}
            </div>
        </Container>

        </>


    )
}