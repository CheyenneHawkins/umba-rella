import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, FormStyles, Title } from "./Styles";
import { umbrella } from "./SignIn";
import { UserAuth } from '../contexts/AuthContextNew';
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import wait from 'waait';


export default function Weather(){

    const { user, logout} = UserAuth();
    
    const [city, setCity ] = useState('City');
    const [weather, setWeather ] = useState('');
    const [loading, setLoading ] = useState(false);
    const [latitude, setLatitude ] = useState('');
    const [longitude, setLongitude ] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [zip, setZip] = useState('');
    const [locationCode, setLocationCode] = useState('00000');
    const [chanceOfRain, setChanceOfRain] = useState('');


    const zipzip = '37122';

    const zipurl = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&q=${zip}`

    const accuweather = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationCode}?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&details=true`

    const accuchecker = ``
    
    // useEffect(()=>{setLoading(false)}, weather)

    // const getCoordinates = (e) => {
    //     e.preventDefault();
    //     console.log('Checking coordinates')
    //     setLoading(true);
    //     axios.get(zipurl).then((response)=>{
    //         // setWeather(response.data)
    //         console.log(response.data)
    //     });
    //     setCity('');
    //     setLoading(false);
    // }

    // const fetchWeatherExtra = (e) => {
    //     e.preventDefault();
    //     console.log('Checking...')
    //     setLoading(true);
    //     axios.get(zipurl).then((response)=>{
            
    //         console.log(response.data)
    //     });
    //     axios.get(url).then((response)=>{
    //         setWeather(response.data)
    //         console.log(response.data)
    //     });
    //     setCity('');
    //     setLoading(false);
    // }

    // const fetchWeather = (e) => {
    //     e.preventDefault();
    //     console.log('Checking...')
    //     setLoading(true);
    //     axios.get(url2).then((response)=>{
    //         setWeather(response.data)
    //         console.log(response.data)
    //         // console.log(weather.current.clouds)
    //     });
    //     setCity('');
    //     setLoading(false);
    // }
    

    async function getLocationCode (){
        // e.preventDefault();
        console.log('CODE -- getLocationCode Start')
        console.log('CODE -- Checking...')
        setLoading(true)
        axios.get(zipurl).then((response)=>{
            const newLocationCode = response.data[0].Key;
            const newCity = response.data[0].LocalizedName;
            async function runWeather (){
                await wait(300)
                console.log(`New Code: ${newLocationCode}`);
                axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${newLocationCode}?apikey=${process.env.REACT_APP_FIREBASE_ACCUWEATHER_API}&details=true`).then(
                    (response)=>{
                        console.log(`New Code: ${newLocationCode}`);
                        setWeather(response.data)
                        console.log(`WEATHER -- ${response.data}`)
                    //----!!! these aren't running for some reason
                        setChanceOfRain(weather.DailyForecasts[0].Day.RainProbability)
                        setCity(newCity)
                        setLoading(false)
                    });
                };
                runWeather();

            });
        }


        

    const fetchWeatherAccu = async () => {
        // e.preventDefault();
        console.log('WEATHER -- fetchWeatherAccu Start')
        console.log('WEATHER -- Checking for weather...')
        setLoading(true);
        axios.get(accuweather).then((response)=>{
            setWeather(response.data)
            console.log(`WEATHER -- ${response.data}`)
        });
        setLoading(false);
    }

    const fetchWeatherAccuTest = async () => {
        // e.preventDefault();
        console.log('WEATHER -- fetchWeatherAccu Start')
        console.log('WEATHER -- Checking for weather...')
        setLoading(true);
        axios.get(accuchecker).then((response)=>{
            setWeather(response.data)
            console.log(`WEATHER -- ${response.data}`)
        });
        setLoading(false);
    }


        
        function testValue() {
            console.log(weather)
            console.log(`${weather.DailyForecasts[0].Day.RainProbability}% chance of rain`)
            // console.log(accuweather)
            // console.log(locationCode)
            // console.log(zipInfo[0].Key)
            // console.log(zipInfo)
            // console.log(zipurl);
    }
    
    // async function X() {
    //     console.log('--------------');
    //     console.log('X-FIRST');
    //     await wait(1000);
    //     // Y();
    //     console.log('X-SECOND');
    // }
    
    // async function Y() {
    //     console.log('Y-FIRST');
    //     // await wait(1000);
    //     console.log('Y-SECOND');
    // }



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
                    if (zip.length == 5){
                        getLocationCode();    
                    } else {
                        alert('NO')
                    }
                    }}>GET LOCATION CODE</button>
                    <button onClick={fetchWeatherAccuTest}>GET WEATHER</button>
                    <button onClick={testValue}>TEST VALUE</button>
                </div>
                <div>
                    <button onClick={()=> {console.log(zipurl)}}>CHECK LINK-------</button>
                    <button onClick={()=> {console.log(accuweather)}}>CHECK LINK---</button>
                    <button onClick={()=> {console.log(weather)}}>CHECK LINK--</button>
                </div>
                <div>
                    <button onClick={()=> {console.log(locationCode)}}>LOCATION CODE--</button>
                </div>
                <div>
                    <button onClick={async (e)=> {
                        e.preventDefault();

                        // await X();
                        // Y();
                        // await getLocationCode();
                        // useEffect(()=> {console.log(`OK NOW: ${locationCode}`)}, locationCode)
                        
                        // fetchWeatherAccu();
                    }}>RUN IT--</button>
                </div>
                <br/>
                <h2>{city && city}</h2>
                <h2>Chance of Rain</h2>
                <h3>{`${weather && weather.DailyForecasts[0].Day.RainProbability}%`}</h3>
                <p>{loading && 'LOADING'}</p>
                <input type="number" onChange={(e)=> setZip(e.target.value)}/>
                {/* <p>{weather?.timezone}</p> */}
                {/* <p>{weather?.main?.temp}</p> */}
            </FormStyles>
        </Container>

        </>


    )
}