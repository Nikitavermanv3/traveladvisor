import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';
import { getPlaceData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating);
        setFilteredPlaces(filteredPlaces);
    },[rating]);

    useEffect(() => {
        if(bounds.sw && bounds.ne){
            setIsLoading(true);
            getWeatherData(coordinates.lat, coordinates.lng)
            .then((data) => setWeatherData(data));

            getPlaceData(type, bounds.sw, bounds.ne)
            .then((data) => {
                console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            })
        }
    }, [type, bounds]);

    return(
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width: '100%'}}>
                <Grid item xs={12} md={4}>
                    <List
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                    weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;