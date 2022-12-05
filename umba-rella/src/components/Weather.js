import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, FormStyles, Title } from "./Styles";
import { umbrella } from "./SignIn";
import spinner from "../images/Spinner-1s-200px.gif"
import { UserAuth } from '../contexts/AuthContextNew';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import wait from 'waait';


export default function Weather(){

    const { user } = UserAuth();
    
    const [city, setCity ] = useState('City');
    const [zip, setZip] = useState('zipcode');
    const [locationCode, setLocationCode] = useState('locationCode');
    const [weather, setWeather ] = useState('');
    const [chanceOfRain, setChanceOfRain] = useState('% rain');
    const [loading, setLoading ] = useState(false);
    const [dbZip, setDbZip ] = useState();


    let zipzip = '';

    const zipUrlStart = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&q=`


    async function fullInfoGet() {

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                console.log("DB ZIPCODE:");
                const docData = docSnap.data();
                console.log(docData?.zipcode);
                zipzip = docData?.zipcode;
                setDbZip(zipzip);

            //----- runs weather call with zicode retrieved from Firebase
                accuWeatherApiCall(docData.zipcode)
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

    }

    async function accuWeatherApiCall (zippy){
        // e.preventDefault();
        console.log('CODE -- getLocationCode Start')
        setLoading(true)
        //----------zipcode search for location code
        axios.get(`${zipUrlStart}${zippy}`).then((response)=>{
            const newLocationCode = response.data[0].Key;
            const newCity = response.data[0].LocalizedName;
        //----------returns city name and location code
            setCity(newCity)
            setLocationCode(newLocationCode)
            console.log(newCity)
            async function runWeather (){
                await wait(300)
                console.log(`New Code: ${newLocationCode}`);
        //----------uses location code to make weather api call
                axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${newLocationCode}?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&details=true`).then(
                    (response)=>{
                        setLoading(false)
                        console.log(`New Code: ${newLocationCode}`);
        //-----------saves complete weather object in state
                        setWeather(response.data)
                        setChanceOfRain(response.data.DailyForecasts[0]?.Day.RainProbability)
                        console.log(`WEATHER -- ${response.data}`)
                    });
                };
                runWeather();

            });
        }

        function testValue() {
            console.log(weather)
    
    }

    // fullInfoGet();

    return (
        <>
        <Container>
            <FormStyles>
            <Title>
                <div></div>
                <h1>Umba-Rella</h1>
                <img src={umbrella} alt="Umba-rella" />
            </Title>
                <h2>WEATHER</h2>
                {/* <button onClick={getCoordinates}>GET COORDINATES</button> */}
                <div>
                    <button onClick={()=>{
                    if (zip.length === 5){
                        accuWeatherApiCall();    
                    } else {
                        alert('NO')
                    }
                    }}>GET THE WEATHER</button>
                    <button onClick={testValue}>FULL WEATHER OBJECT</button>
                    <button onClick={fullInfoGet}>USER DB INFO</button>
                </div>
               
                <br/>
                <h2>{city && city}</h2>
                <h3>Chance of Rain</h3>
                <p>{loading && 
                <img src={spinner} alt='loading' height={90}/>
                }</p>
                <h3>{weather && `${chanceOfRain}%`}</h3>
                {/* <form>
                    <input type="number" onChange={(e)=> setZip(e.target.value)}/>
                </form> */}
            </FormStyles>
        </Container>

        </>


    )
}