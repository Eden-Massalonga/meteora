import axios from 'axios';
import React, { useReducer } from 'react'
import { GET_LOCATION } from './types';
import weatherContext from './WeatherContext';
import weatherReducer from './weatherReducer';

interface Location {
    lat: string,
    lon: string
}

interface InitialState {
    location: Location,
    weather: any
}

const server = 'https://api.openweathermap.org/data/2.5/weather'
const appId = '07fa4a80502baf3232f10c184f028f57'

const WeatherState = (props: any) => {
    const initialState = { location: {}, weather: [] }
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    const getLocation = async () => {
        try {
            const res = await axios.get(`${server}?q=maputo&APPID=${appId}`)

            dispatch({
                type: GET_LOCATION,
                payload: res.data
            })
        } catch (error) {
            console.log(error);

        }
    }

    // return (
    //     <weatherContext.Provider value={{ 
    //         location: state.location,
    //         getLocation 
    //     }}>
    //         {props.children}
    //     </weatherContext.Provider>
    // )
}

export default WeatherState
