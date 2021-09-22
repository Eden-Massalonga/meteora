import { useContext } from 'react'
import styled from 'styled-components'
import LineChart from './section/LineChart'
import { ForecastContext } from '../context/ForecastContext'
import WeatherCard from './sidebar/WeatherCard'

const WeatherCardsContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 5px; 
    // flex-direction: row;
    // justify-content: center;
    // align-content: space-between;
    // flex-wrap: wrap;
    
    @media only screen and (min-width: 600px){
        display: grid;
        grid-template-columns: auto auto; 
        grid-column-gap: 5px; 
        // display: flex;
        // flex-direction: row;
        // justify-content: center;
        // align-content: space-between;
        // flex-wrap: wrap;
    }

    @media only screen and (min-width: 768px){
        display: flex;
        flex-direction: row;
        margin: 0px 10px 0px 10px;
        column-gap: 10px;
        justify-content: space-between;
        align-content: strech;
        // flex-wrap: wrap;
    }
`

const MainContentDiv = styled.div`
    margin: 0px auto;
    padding: 0px 5px 0px 5px;  
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media only screen (min-width: 600px){
        margin: 0px auto;
        padding: 0px;  
        width: 60%;
    }

    @media only screen (min-width: 768px){
        // margin: 0px auto;
        padding: 0px;  
        width: 60%;
    }
`

const Section = () => {
    const { forecast } = useContext(ForecastContext)

    return (
        <MainContentDiv>
            <WeatherCardsContainer>
                {forecast.map((dailyForecast, index) => {
                    if(index !== 0)
                        return <WeatherCard key={index} dt={dailyForecast.dt} weather={dailyForecast.weather} temp={dailyForecast.temp}/>
                    else
                        return ''
                })}
            </WeatherCardsContainer>

            <LineChart />
        </MainContentDiv>
    )
}

export default Section
