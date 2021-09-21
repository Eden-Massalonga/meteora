import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment';
import {GiWindsock} from 'react-icons/gi';
import {WiHumidity} from 'react-icons/wi';
import { ICardForecast, IForecast } from '../../types';
import Title from '../utils/Title'
import { ForecastContext } from '../../context/ForecastContext';
import Loader from '../utils/Loader';

const Card = styled.div`
    margin: 5px 0px;
    padding: 3px;
    box-shadow: 2px 1px 1px 0px rgba(0,0,0,0.2);
    border: 0.2px solid rgba(0,0,0,0.2);
    border-radius: 5px 5px 5px 5px;
    transition: 0.3s;
    background: rgba(255,255,255,0.4);
`;

const DetailsRow = styled.p`

`

const DetailsRowTitle = styled.span`
`

const WeatherCard = ({ dt, weather, temp, humidity, pressure, wind_speed, current }: ICardForecast) => {
    const { units, loading } = useContext(ForecastContext)

    if (loading)
        return <Loader />
    else
        return (
            <Card>
                <Title><Moment unix format='ddd'>{dt}</Moment></Title>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                    <div style={{margin: '2px'}}>
                        <p>{Math.round(temp.max)}{units == 'metric' ? <span>&deg;C</span> : <span>&deg;F</span>}</p>
                        <p>{Math.round(temp.min)}{units == 'metric' ? <span>&deg;C</span> : <span>&deg;F</span>}</p>
                    </div>
                </div>
                {current && 
                <div>
                    <DetailsRow>
                        <DetailsRowTitle>{weather.main}</DetailsRowTitle> {weather.description} m/s
                    </DetailsRow>
                    <DetailsRow>
                        <DetailsRowTitle><WiHumidity /></DetailsRowTitle> {humidity} 
                    </DetailsRow>
                    <DetailsRow>
                        <DetailsRowTitle><GiWindsock />Pressure</DetailsRowTitle> {pressure}
                    </DetailsRow>
                    <DetailsRow>
                        <DetailsRowTitle><GiWindsock /></DetailsRowTitle> {wind_speed} m/s
                    </DetailsRow>
                </div>}
            </Card>
        )
}

export default WeatherCard
