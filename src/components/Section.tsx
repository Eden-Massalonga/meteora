import { useContext } from 'react'
import styled from 'styled-components'
import LineChart from './section/LineChart'
import { ForecastContext } from '../context/ForecastContext'
import WeatherCard from './sidebar/WeatherCard'

const WeatherCardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: space-between;
`

const MainContentDiv = styled.div`
    margin: 10px auto;
    padding: 10px;  
`

const Section = () => {
    const { forecast } = useContext(ForecastContext)

    return (
        <MainContentDiv>
            <WeatherCardsContainer>
                {forecast.map((dailyForecast, index) => {
                    return <WeatherCard key={index} dt={dailyForecast.dt} weather={dailyForecast.weather} temp={dailyForecast.temp}/>
                })}
            </WeatherCardsContainer>

            <LineChart />
        </MainContentDiv>
    )
}

export default Section
