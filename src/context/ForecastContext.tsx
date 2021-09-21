import axios from "axios";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { GET_LOCATION } from "./types";

interface ICoords {
    lat: number,
    lon: number
}

interface IForecast {
    dt: number,
    humidity: number,
    pressure: number,
    temp: {
        min: number,
        max: number
    },
    weather: {
        description: string,
        icon: string,
        id: number,
        main: string
    },
    wind_speed: number
}

interface IForecastContext {
    city: string,
    units: string,
    coords: ICoords,
    forecast: IForecast[],
    loading: boolean,
    error: boolean,
    errorMessage: string,
    changeCity: (city: string) => void,
    getLocation: (city: string) => void,
    changeUnits:  (city: string) =>  Promise<void>,
}

const defaultState = {
    city: 'Maputo',
    units: 'metric',
    coords: {
        lat: -25.953724,
        lon: 32.588711
    },
    forecast: [
        {
            dt: 0,
            humidity: 0,
            pressure: 0,
            temp: {
                min: 0,
                max: 0
            },
            weather: {
                description: '',
                icon: '',
                id: 0,
                main: ''
            },
            wind_speed: 0
        }
    ],
    loading: true,
    error: false,
    errorMessage: '',
    changeCity: (city: string) => {},
    getLocation: (city: string) => {},
    changeUnits: async (city: string) => {},
}

const server = 'https://api.openweathermap.org/data/2.5/weather'
const appId = '07fa4a80502baf3232f10c184f028f57'

const ForecastContext = createContext<IForecastContext>(defaultState);

const ForecastProvider: FC = ({ children }) => {
    const [city, setCity] = useState(defaultState.city);
    const [coords, setCoords] = useState(defaultState.coords);
    const [units, setUnits] = useState(defaultState.units)
    const [forecast, setForecast] = useState(defaultState.forecast);
    const [loading, setloading] = useState(defaultState.loading)
    const [error, setError] = useState(defaultState.error)
    const [errorMessage, setErrorMessage] = useState(defaultState.errorMessage)

    const changeCity = (city: string) => {
        setCity(city)
    }

    const changeUnits = async (units: string) => {
        console.log(units);
        
        if(units == 'metric'){
            setUnits('metric');
            // await getLocation(city);
        }else{
            setUnits('imperial');
            // await getLocation(city);
        }
    }

    const getLocation = async (city: string) => {
        try {
            //Reset old values
            setError(false);
            setErrorMessage('')

            //Make new request
            const res = await axios.get(`${server}?q=${city}&APPID=${appId}`)

            if (res.status == 200) {
                const data = res.data;

                // console.log('OK', data);
                setCity(data['name']);
                setCoords(data['coord'])

                const res7daysForecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly&units=${units}&appid=${appId}`);

                // console.log('5 days',res7daysForecast.data);
                if (res.status == 200) {
                    var _5daysForecast: IForecast[] = [];

                    const forecastData = res7daysForecast.data['daily'];
                    for (let i = 0; i <= 4; i++) {
                        const dailyForecast = forecastData[i];
                        _5daysForecast[i] = {
                            dt: dailyForecast['dt'],
                            humidity: dailyForecast['humidity'],
                            pressure: dailyForecast['pressure'],
                            temp: dailyForecast['temp'],
                            weather: dailyForecast['weather'][0],
                            wind_speed: dailyForecast['wind_speed']
                        }                        
                    }
                    
                    setForecast(_5daysForecast)
                    setloading(false)

                    console.log(forecastData);
                    
                }
                        }
            else{
                console.log('Error: ', res.data);
                setError(true);
                setErrorMessage('Error: Unable to get weather for ' + city)
            }

        } catch (error) {
            console.log(error);
            setError(true);
            setErrorMessage('Error: City ' + city + ' not found')
        }
    }


    return (
        <ForecastContext.Provider value={{
            city,
            coords,
            units,
            forecast,
            loading,
            error,
            errorMessage,
            changeCity,
            getLocation,
            changeUnits
        }}>
            {children}
        </ForecastContext.Provider>
    )
}

export {
    ForecastContext,
    ForecastProvider
}

function dispatch(arg0: { type: any; payload: any; }) {
    throw new Error("Function not implemented.");
}
