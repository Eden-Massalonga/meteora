import { useContext } from 'react'
import styled from 'styled-components'
import LineChart from './section/LineChart'
import { ForecastContext } from '../context/ForecastContext'
import WeatherCard from './sidebar/WeatherCard'

const WeatherCardsContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto; 
    // flex-direction: row;
    // justify-content: center;
    // align-content: space-between;
    // flex-wrap: wrap;
    
    @media only screen and (min-width: 600px){
        display: grid;
        grid-template-columns: auto auto; 
        // display: flex;
        // flex-direction: row;
        // justify-content: center;
        // align-content: space-between;
        // flex-wrap: wrap;
    }

    @media only screen and (min-width: 768px){
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        // align-content: space-between;
        // flex-wrap: wrap;
    }
`

const MainContentDiv = styled.div`
    margin: 5px auto;
    padding: 5px;  
    width: 100%;

    @media only screen (min-width: 600px){
        margin: 10px auto;
        padding: 10px;  
        width: 60%;
    }
`

const Section = () => {
    const { forecast } = useContext(ForecastContext)

    return (
        <MainContentDiv>
            <WeatherCardsContainer>
                {forecast.map((dailyForecast, index) => {
                    if(index != 0)
                    return <WeatherCard key={index} dt={dailyForecast.dt} weather={dailyForecast.weather} temp={dailyForecast.temp}/>
                })}
            </WeatherCardsContainer>

            <LineChart />
        </MainContentDiv>
    )
}

export default Section
