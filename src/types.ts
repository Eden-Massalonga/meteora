export const GET_WEATHER = 'GET_WEATHER';
export const GET_LOCATION = 'GET_LOCATION';

export interface ICoords {
    lat: number,
    lon: number
}

export interface IForecast {
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

export interface IForecastContext {
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

export interface ICardForecast{
    dt: number,
    humidity?: number,
    pressure?: number,
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
    wind_speed?: number,
    current?: boolean
}

