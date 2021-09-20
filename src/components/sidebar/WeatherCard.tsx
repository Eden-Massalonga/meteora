import React from 'react'
import styled from 'styled-components'
import Moment from 'react-moment';
import { ICardForecast, IForecast } from '../../types';
import Title from '../utils/Title'

const Card = styled.div`
    margin: 5px 0px;
`;

const WeatherCard = ({dt, weather, temp}: ICardForecast) => {
    return (
        <Card>
            <Title><Moment unix format='ddd'>{dt}</Moment></Title>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                <div >
                    <p>{Math.round(temp.max)}</p>
                    <p>{Math.round(temp.min)}</p>
                </div>
            </div>
        </Card>
    )
}

export default WeatherCard
