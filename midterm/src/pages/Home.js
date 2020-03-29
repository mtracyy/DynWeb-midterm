import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

//API Key
const defaultKey = "c53cbd9e-1646-4ced-8e5c-766c498079a7";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Home() {
    const [holidayData, setHolidayData] = useState({});
    const [month, setMonth] = useState('');
    const [pokemonIDTens, setPokemonIDTens] = useState('');
    const [holiday, setHoliday] = useState('');
    const [holidayDate, setHolidayDate] = useState('');

    const [pokeColor, setPokeColor] = useState('');
    const [pokeRGB, setPokeRGB] = useState('');
    const [colorData, setColorData] = useState({});
    const [pokemonURL, setPokemonURL] = useState('');

    const [pokemonDescriptionData, setPokemonDescriptionData] = useState({});
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonID, setPokemonID] = useState('');
    const [pokemonDesc, setPokemonDesc] = useState('');
    const [pokemonFlavor, setPokemonFlavor] = useState('');

    const [pokemonStatData, setPokemonStatData] = useState({});
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonSpriteURL, setSpriteURL] = useState('');

    let history = useHistory();

    useEffect(() => {
        let searchParams = history.location.search;
        let urlParams = new URLSearchParams(searchParams);
        let pokeColor = urlParams.get("color");
        if(pokeColor) {
           setPokeColor(pokeColor);
        }
    }, [history]);

    useEffect(() => {
        if (pokeColor === "blue") {
               setPokeRGB('51, 153, 255');
           } else if (pokeColor === "brown") {
               setPokeRGB('153, 76, 0');
           } else if (pokeColor === "gray") {
               setPokeRGB('128, 128, 128');
           } else if (pokeColor === "green") {
               setPokeRGB('0, 255, 128');
           } else if (pokeColor === "pink") {
               setPokeRGB('255, 51, 153');
           } else if (pokeColor === "purple") {
               setPokeRGB('153, 51, 255');
           } else if (pokeColor === "red") {
               setPokeRGB('255, 50, 50');
           } else if (pokeColor === "white") {
               setPokeRGB('255, 255, 255');
           } else if (pokeColor === "yellow") {
               setPokeRGB('255, 255, 50');
           } else {
               setPokeRGB('0, 0, 0');
           }

        axios.get(`https://pokeapi.co/api/v2/pokemon-color/${pokeColor.toLowerCase()}`)
          .then(function (response) {
            // handle success
            setColorData(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

    }, [pokeColor]);

    useEffect(() => {
        // console.log(colorData, "color data new");

        if (colorData.pokemon_species) {
            let pokeArray = colorData.pokemon_species;
            let randomEntry = pokeArray[Math.floor(Math.random() * pokeArray.length)];
            setPokemonURL(randomEntry.url);
        }

    }, [colorData]);

    useEffect(() => {

        axios.get(`${pokemonURL}`)
          .then(function (response) {
            // handle success
            setPokemonDescriptionData(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
    }, [pokemonURL]);

    useEffect(()=> {
        // console.log(pokemonDescriptionData, "pokemon desc");

        if (pokemonDescriptionData.name) {
            setPokemonName(pokemonDescriptionData.name);
        }

        if (pokemonDescriptionData.id) {
            setPokemonID(pokemonDescriptionData.id.toString());
        }

        if (pokemonDescriptionData.genera) {
            setPokemonDesc(pokemonDescriptionData.genera[2].genus);
        }

        if (pokemonDescriptionData.flavor_text_entries) {
            if (pokemonDescriptionData.flavor_text_entries[1].language.name === "en") {
                setPokemonFlavor(pokemonDescriptionData.flavor_text_entries[1].flavor_text);
            } else {
                setPokemonFlavor(pokemonDescriptionData.flavor_text_entries[2].flavor_text);
            }
        }

    }, [pokemonDescriptionData]);

    useEffect(()=> {
        if (pokemonID.length === 3) {
            setMonth(pokemonID.toString().charAt(0));
            setPokemonIDTens(pokemonID.toString().substr(1,2));
        } else {
            setPokemonIDTens('00');
            if (pokemonID < 25) {
                setMonth('9');
            } else if (pokemonID < 50) {
                setMonth('10');
            } else if (pokemonID < 75) {
                setMonth('11');
            } else {
                setMonth('12');
            }
        }

        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
          .then(function (response) {
            // handle success
            setPokemonStatData(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

    }, [pokemonID]);

    useEffect(()=> {
        console.log(pokemonID, "id", month, "month", pokemonIDTens, "pokeIDtens");
        axios.get(`https://holidayapi.com/v1/holidays?pretty&key=${defaultKey}&country=US&year=2019&month=${month}`)
            .then(function (response) {
                // handle success
                setHolidayData(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
          });

        if (pokemonStatData.sprites) {
            setSpriteURL(pokemonStatData.sprites.front_default);
        }

        if (pokemonStatData.height) {
            let height = (pokemonStatData.height/3.048).toFixed(2);
            setPokemonHeight(height);
        }

        if (pokemonStatData.weight) {
            let weight = (pokemonStatData.weight/4.536).toFixed(2);
            setPokemonWeight(weight);
        }


    }, [pokemonStatData]);


    useEffect(()=> {
        console.log(holidayData, "holiday data");
        if (holidayData.holidays) {
            if (pokemonIDTens === '00') {
                let index = Math.floor(Math.random() * holidayData.holidays.length);
                let chosenHoliday = holidayData.holidays[index].name;
                let chosenHolidayDate = holidayData.holidays[index].date;
                setHoliday(chosenHoliday);
                setHolidayDate(chosenHolidayDate.substr(5, 9));
            } else {
                if (setPokemonIDTens < 50) {
                    let index = getRandomInt(0, (holidayData.holidays.length/2)-1);
                    let chosenHoliday = holidayData.holidays[index].name;
                    let chosenHolidayDate = holidayData.holidays[index].date;
                    setHoliday(chosenHoliday);
                    setHolidayDate(chosenHolidayDate.substr(5, 9));
                } else {
                    let index = getRandomInt(0, holidayData.holidays.length-1);
                    let chosenHoliday = holidayData.holidays[index].name;
                    let chosenHolidayDate = holidayData.holidays[index].date;
                    setHoliday(chosenHoliday);
                    setHolidayDate(chosenHolidayDate.substr(5, 9));
                }
            }
        }

        // console.log(pokemonDescriptionData, "pokemonURL");
        // console.log(pokemonStatData, "pokemonName");
    }, [holidayData]);

    return (
        <div className="Home">

            <div className="PokemonInfo" style={{backgroundColor: `rgba(${pokeRGB}, 0.3)`}}>
                <h1>{pokemonName}</h1>
                <div className="stats">
                    <p>Height: {pokemonHeight} ft</p>
                    <p>Weight: {pokemonWeight} lbs</p>
                </div>
                <div className="image">
                    <img src={pokemonSpriteURL} alt="pokemon sprite"/>
                </div>
                <h2>{pokemonDesc}</h2>
                <p>{pokemonFlavor}</p>
            </div>

            <div className="HolidayData">
                <h1>One of the human holidays <strong>{pokemonName}</strong> is most intrigued by is {holiday}.</h1>
                <p>Last year, it was observed on {holidayDate}.</p>
            </div>
        </div>
    );

}

export default Home