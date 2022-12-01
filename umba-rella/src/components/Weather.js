import axios from 'axios';
import { useState } from 'react';
import { Container, FormStyles, Title } from "./Styles";
import { umbrella } from "./SignIn";


export default function Weather(){
    
        const [city, setCity ] = useState('37122');
        const [weather, setWeather ] = useState('');
        const [loading, setLoading ] = useState('');
        const [latitude, setLatitude ] = useState('');
        const [longitude, setLongitude ] = useState('');

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=37203,us&units=imperial&appid=${process.env.REACT_APP_FIREBASE_WEATHER_API}`
    
    const url2 = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${process.env.REACT_APP_FIREBASE_WEATHER_API}`

    const zipurl = `http://api.openweathermap.org/geo/1.0/zip?zip=${city},us&appid=${process.env.REACT_APP_FIREBASE_WEATHER_API}`

    const getCoordinates = (e) => {
        e.preventDefault();
        console.log('Checking coordinates')
        setLoading(true);
        axios.get(zipurl).then((response)=>{
            // setWeather(response.data)
            console.log(response.data)
        });
        setCity('');
        setLoading(false);


    }

    const fetchWeather = (e) => {
        e.preventDefault();
        console.log('Checking...')
        setLoading(true);
        axios.get(url).then((response)=>{
            setWeather(response.data)
            console.log(response.data)
        });
        setCity('');
        setLoading(false);

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
                <h2>WEATHER</h2>
                <button onClick={getCoordinates}>GET COORDINATES</button>
                <button onClick={fetchWeather}>GET WEATHER</button>
                <p>{weather?.name}</p>
                <p>{weather?.main?.temp}</p>

            </FormStyles>

        </Container>


        </>


    )
}