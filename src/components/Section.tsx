import React from 'react'
import styled from 'styled-components'
import LineChart from './section/LineChart'
import WeatherCard from './sidebar/WeatherCard'

const WeatherCardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const MainContentDiv = styled.div`
    margin: 10px auto;
    padding: 10px;  
`

const Section = () => {
    return (
        <MainContentDiv>
            <WeatherCardsContainer>
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
                <WeatherCard />
            </WeatherCardsContainer>

            <LineChart />
        </MainContentDiv>
    )
}

export default Section
