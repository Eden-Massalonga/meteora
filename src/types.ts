export interface ICoords {
    lat: number,
    lon: number
}

export interface IForecast{
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

export interface IForecastContext {
    city: string,
    coords: ICoords,
    forecast: IForecast[],
    changeCity: (city: string) => void,
    getLocation: (city: string) => void

}