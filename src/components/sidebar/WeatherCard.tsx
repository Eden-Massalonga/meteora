import { useContext } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment';
import {WiHumidity} from 'react-icons/wi';
import { ICardForecast } from '../../types';
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

const CardDetails = styled.div`
    margin: 0px;
    padding: 3px;
    // box-shadow: 2px 1px 1px 0px rgba(0,0,0,0.2);
    border: 0.2px solid rgba(0,0,0,0.1);
    border-radius: 5px 5px 5px 5px;
    transition: 0.3s;
    background: rgba(255,255,255,0.4);
`;

const DetailsRow = styled.p`
    font-size: 12pt;
    font-family: 'Ubuntu', sans-serif;
    font-style: italic;
`

const DetailsRowTitle = styled.span`
    font-weight: bold;
    font-style: normal;
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
                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={'Weather Icon'} />
                    <div style={{margin: '2px'}}>
                        <p>{Math.round(temp.max)}{units === 'metric' ? <span>&deg;C</span> : <span>&deg;F</span>}</p>
                        <p>{Math.round(temp.min)}{units === 'metric' ? <span>&deg;C</span> : <span>&deg;F</span>}</p>
                    </div>
                </div>
                {current && 
                <CardDetails>
                    <DetailsRow>
                        <DetailsRowTitle>Condition: </DetailsRowTitle>{weather.main}, {weather.description}
                    </DetailsRow>
                    <DetailsRow>
                        <DetailsRowTitle>Humidity: </DetailsRowTitle> {humidity}<WiHumidity />
                    </DetailsRow>
                    <DetailsRow>
                        <DetailsRowTitle>Pressure: </DetailsRowTitle> {pressure} hPa
                    </DetailsRow>
                    <DetailsRow>
                        <DetailsRowTitle>Wind speed: </DetailsRowTitle> {wind_speed} {units === 'metric' ? <span>m/s</span> : <span>mph</span>}
                    </DetailsRow>
                </CardDetails>}
            </Card>
        )
}

export default WeatherCard
