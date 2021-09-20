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
    coords: ICoords,
    forecast: IForecast[],
    changeCity: (city: string) => void,
    getLocation: (city: string) => void

}

const defaultState = {
    city: 'Maputo',
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
    changeCity: (city: string) => { },
    getLocation: (city: string) => { }
}

const server = 'https://api.openweathermap.org/data/2.5/weather'
const appId = '07fa4a80502baf3232f10c184f028f57'

const ForecastContext = createContext<IForecastContext>(defaultState);

const ForecastProvider: FC = ({ children }) => {
    const [city, setCity] = useState(defaultState.city);
    const [coords, setCoords] = useState(defaultState.coords);
    const [forecast, setForecast] = useState(defaultState.forecast);

    const changeCity = (city: string) => {
        setCity(city)
    }

    const getLocation = async (city: string) => {
        try {
            const res = await axios.get(`${server}?q=${city}&APPID=${appId}`)

            if (res.status == 200) {
                const data = res.data;

                // console.log('OK', data);
                setCity(data['name']);
                setCoords(data['coord'])

                const res7daysForecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly&units=metric&appid=${appId}`);

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
                }

            }
            else
                console.log('Error: ', res.data);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <ForecastContext.Provider value={{
            city,
            coords,
            forecast,
            changeCity,
            getLocation
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
