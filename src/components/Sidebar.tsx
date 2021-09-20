import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import WeatherCard from './sidebar/WeatherCard'
import {ForecastContext} from '../context/ForecastContext'
import Title from './utils/Title'

const InputContainer = styled.div`
    width: 30%;
    padding: 10px;
    border-right: solid;
    // margin: 10px auto;
    justify-content: center;
    // background-color: #333;

`

// const FormControl = styled.div`
//     display: flex;
//     flex-direction: column;
// `

const Sidebar = () => {
    // const weatherContext = useContext(WeatherContext)
    // const {getLocation} = weatherContext;

    const {city, forecast, changeCity, getLocation} = useContext(ForecastContext);

    //Efeito desejado
    useEffect(() => {
        getLocation(city);
    }, [])

    const onSubmit = (city: string) => {
        // changeCity(city);
        getLocation(city);
    }

    const todayForecast = forecast[0];

    const formik = useFormik({
        initialValues: {
            city: '',
            units: 'c'
        },
        onSubmit: values => {
            console.log(values);
            onSubmit(values.city)
        }
    })

    return (
        <InputContainer>
            <Title><span style={{color: '#000'}}>City Weather :</span>  {city}</Title>

            <div>
                <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {/* <FormControl> */}
                    {/* <label htmlFor="city">City name</label> */}
                    <input
                        id="city"
                        name="city"
                        type="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        style={{width: '90%'}}
                    />
                    {/* </FormControl> */}
                    <button type="submit" style={{width: '10%'}}>➤</button>
                </form>
            </div>

            <WeatherCard dt={todayForecast.dt} temp={todayForecast.temp} weather={todayForecast.weather} />
        </InputContainer>
    )
}

export default Sidebar
