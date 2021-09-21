import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import WeatherCard from './sidebar/WeatherCard'
import { ForecastContext } from '../context/ForecastContext'
import Title from './utils/Title'
import ErrorCard from './utils/ErrorCard'
import './Sidebar.css'

const InputContainer = styled.div`
    width: 100%;
    padding: 0px;
    // border-right: solid;
    // margin: 10px auto;
    justify-content: center;
    // background-color: #333;

    // For tablet
    @media only screen and (min-width: 600px){
        width: 40%;
        padding: 5px;
        // border-right: solid;
        // margin: 10px auto;
        justify-content: center;
        // background-color: #333;
    }

    // For tablet
    @media only screen and (min-width: 768px){
        width: 30%;
        padding: 10px;
        // border-right: solid;
        // margin: 10px auto;
        justify-content: center;
        // background-color: #333;
    }
`

const FormContainer = styled.div`
    margin: 5px 0px;
    padding: 3px;
    box-shadow: 2px 1px 1px 0px rgba(0,0,0,0.2);
    border: 0.2px solid rgba(0,0,0,0.2);
    border-radius: 5px 5px 5px 5px;
    transition: 0.3s;
    background: rgba(255,255,255,0.4);
`

// const FormControl = styled.div`
//     display: flex;
//     flex-direction: column;
// `

const Sidebar = () => {
    // const weatherContext = useContext(WeatherContext)
    // const {getLocation} = weatherContext;

    const { city, forecast, error, errorMessage, units, changeUnits, getLocation } = useContext(ForecastContext);

    //Efeito desejado
    useEffect(() => {
        getLocation(city);
    }, [units])

    const onChangeA = async (event: any) => {
        // console.log(event);
        // alert(event.target.value);
        changeUnits(event.target.value);
    };

    const onSubmit = (city: string) => {
        // changeCity(city);
        getLocation(city);
    }

    const todayForecast = forecast[0];

    const formik = useFormik({
        initialValues: {
            city: '',
            units: units
        },
        onSubmit: values => {
            console.log(values);
            onSubmit(values.city)
        }
    })

    return (
        <InputContainer>
            <FormContainer>
                <Title><span style={{ color: '#000' }}>City Weather :</span>  {city}</Title>

                <div>
                    <form onSubmit={formik.handleSubmit}>
                        {/* <FormControl> */}
                        {/* <label htmlFor="city">City name</label> */}
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'sticky', top: 0 }}>
                            <input
                                id="city"
                                name="city"
                                type="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                style={{ width: '90%' }}
                            />
                            <button type="submit" style={{ width: '10%' }}>➤</button>
                        </div>

                        {/* </FormControl> */}
                        <div
                            className={'radio'}
                            role="group"
                            aria-labelledby="my-radio-group"
                            onChange={(event) => onChangeA(event)}
                        >
                            <input type="radio" id={'metric'} className={'radio__input'} checked={units == 'metric'} name="units" value="metric" />
                            <label htmlFor={'metric'} className={'radio__label'}>
                                &deg;C
                            </label>

                            <input type="radio" id={'imperial'} className={'radio__input'} checked={units == 'imperial'} name="units" value="imperial" />
                            <label htmlFor={'imperial'} className={'radio__label'}>
                                &deg;F
                            </label>
                            {/* <div>Picked: {values.picked}</div> */}
                        </div>

                        <br />
                    </form>
                </div>
            </FormContainer>


            {/* Display error */}
            {error && <ErrorCard message={errorMessage} />}
            <WeatherCard dt={todayForecast.dt} temp={todayForecast.temp} weather={todayForecast.weather} wind_speed={todayForecast.wind_speed} humidity={todayForecast.humidity} pressure={todayForecast.pressure} current={true} />

        </InputContainer>
    )
}

export default Sidebar
