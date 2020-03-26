import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

//API Key
const defaultKey = "c53cbd9e-1646-4ced-8e5c-766c498079a7";

function Home() {
    // const [holidayData, setHolidayData] = useState({});

    const [pokeColor, setPokeColor] = useState('');
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
        console.log(colorData, "color data new");

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
            setPokemonID(pokemonDescriptionData.id);
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

    //     // axios.get(`https://holidayapi.com/v1/holidays?pretty&key=${defaultKey}&country=US&year=2019&month=12`)
    //     //   .then(function (response) {
    //     //     // handle success
    //     //     setHolidayData(response.data);
    //     //   })
    //     //   .catch(function (error) {
    //     //     // handle error
    //     //     console.log(error);
    //     //   });

    // useEffect(()=> {

    // }, [holidayData]);

    return (
        <div className="Home">
            <div className="PokemonInfo">
                <h1>{pokemonName}</h1>
                <div className="stats">
                    <p>Height: {pokemonHeight} ft</p>
                    <p>Weight: {pokemonWeight} lbs</p>
                </div>
                <img src={pokemonSpriteURL} alt="pokemon sprite"/>
                <h2>{pokemonDesc}</h2>
                <p>{pokemonFlavor}</p>
            </div>
        </div>
    );

}

export default Home