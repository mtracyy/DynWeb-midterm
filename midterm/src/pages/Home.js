import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

//API Key
// const defaultKey = "98387b5ecfc7a23f50ccd2becb2faa10";

function Home() {
    // const [weatherData, setWeatherData] = useState({});
    // const [city, setCity] = useState(`Seoul`);
    //
    // const [cloudiness, setCloudiness] = useState(0);

    // let history = useHistory();
    //
    // useEffect(() => {
    //     let searchParams = history.location.search;
    //     let urlParams = new URLSearchParams(searchParams);
    //     let city = urlParams.get("city");
    //     if(city) {
    //        setCity(city);
    //     }
    // }, [history]);
    //
    // useEffect(() => {
    //
    //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${defaultKey}`)
    //       .then(function (response) {
    //         // handle success
    //         setWeatherData(response.data);
    //       })
    //       .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //       });
    // }, [city]); //brackets are parameters which anonymous useEffect function executes on
    //
    // useEffect(()=> {
    //    if (weatherData.main) {
    //        let cloudinessValue = weatherData.clouds.all/250;
    //        setCloudiness(cloudinessValue);
    //
    //        setWeatherType(weatherData.weather[0].main);
    //    }
    // }, [weatherData]);

    return (
        <div className="WeatherWrapper">

        </div>
    );

}

export default Home