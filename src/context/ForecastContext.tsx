import axios from "axios";
import { createContext, FC, useState } from "react";
import { IForecast, IForecastContext } from "../types";

//Initial state, based on Maputo city coordinates
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

//Forecast context
const ForecastContext = createContext<IForecastContext>(defaultState);

//Forecast data provider
const ForecastProvider: FC = ({ children }) => {
    const [city, setCity] = useState(defaultState.city);
    const [coords, setCoords] = useState(defaultState.coords);
    const [units, setUnits] = useState(defaultState.units)
    const [forecast, setForecast] = useState(defaultState.forecast);
    const [loading, setloading] = useState(defaultState.loading)
    const [error, setError] = useState(defaultState.error)
    const [errorMessage, setErrorMessage] = useState(defaultState.errorMessage)

    //Change the city state based on user input
    const changeCity = (city: string) => {
        setCity(city)
    }

    //Change the units used in API requests
    const changeUnits = async (units: string) => {
        if(units === 'metric'){
            setUnits('metric');
        }else{
            setUnits('imperial');
        }
    }

    //Call the Open Weather API to fetch Weather Forecast data
    const getLocation = async (city: string) => {
        try {
            //Clear old values of error ocurrence and error message
            setError(false);
            setErrorMessage('')

            //Make new request - fetch data from the API
            const res = await axios.get(`${server}?q=${city}&APPID=${appId}`)

            //Check if the request was successful
            if (res.status === 200) {
                const data = res.data;

                //Update the city name and its localization (coordinates)
                setCity(data['name']);
                setCoords(data['coord'])

                //Fecth the data from the API with the new data - coords, metrics and excluding unnecessary data
                const res7daysForecast = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly&units=${units}&appid=${appId}`);

                //Check if the request was successful
                if (res.status === 200) {
                    var _5daysForecast: IForecast[] = [];

                    //Capture only the daily forecast data
                    const forecastData = res7daysForecast.data['daily'];

                    //Capture only the first 5 days from the data provided by API and filter relevant fields to the app
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
                    console.log(_5daysForecast);
                    
                    //Update the forecast data state and disable the loading  
                    setForecast(_5daysForecast)
                    setloading(false)                    
                }
                        }
            else{
                //Log the error data and give the feedback to the user (API Request Error)
                console.log('Error: ', res.data);
                setError(true);
                setErrorMessage('Error: Unable to get weather for ' + city)
            }

        } catch (error) {
            /*Log the error data and give the feedback to the user 
            (City not found - API unable to get the data/ invalid city name)
            */
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