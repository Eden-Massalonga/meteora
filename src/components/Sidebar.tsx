import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup';
import WeatherCard from './sidebar/WeatherCard'
import { ForecastContext } from '../context/ForecastContext'
import ErrorCard from './utils/ErrorCard'
import './Sidebar.css'

const InputContainer = styled.div`
    width: 95%;
    padding: 0px 10px;
    // border-right: solid;
    // margin: 10px auto;
    justify-content: center;
    // background-color: #333;

    // For tablet
    @media only screen and (min-width: 600px){
        width: 40%;
        padding: 0px 10px;
        // border-right: solid;
        // margin: 10px auto;
        justify-content: center;
        // background-color: #333;
    }

    // For tablet
    @media only screen and (min-width: 768px){
        width: 30%;
        padding: 0px 10px;
        // border-right: solid;
        // margin: 10px auto;
        justify-content: center;
        // background-color: #333;
    }
`
const Title = styled.div`
    color: #FFF;
    background-color: rgb(4,170,109,0.7);
    padding: 5px;
    margin: 0px 0px 0px 0px;
    font-weight: bold;
    text-shadow: .7px .7px #000;
    border: 0.2px solid rgba(0,0,0,0.2);
    border-radius: 5px 5px 0px 0px;    
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

const Sidebar = () => {
    const { city, forecast, error, errorMessage, units, changeUnits, getLocation } = useContext(ForecastContext);

    //Update the weather when units are changed
    useEffect(() => {
        getLocation(city);
    }, [units, city, getLocation])

    //Get the changes in weather units
    const onChangeUnits = async (event: any) => {
        changeUnits(event.target.value);
    };

    //Send the user input data and request weather data
    const onSubmit = (city: string) => {
        getLocation(city);
    }

    //Get the current - today forecast
    const todayForecast = forecast[0];

    //User input form
    const formik = useFormik({
        initialValues: {
            city: '',
            units: units
        },
        validationSchema: Yup.object({
            city: Yup.string()
                .max(30, 'Must be 15 characters or less')
                .required('Required')
                .matches(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, 'Invalid city name, check the spelling')
        }),
        onSubmit: values => {
            onSubmit(values.city)
            formik.setFieldValue('city', '')
        }
    })

    return (
        <InputContainer>
            <FormContainer>
                <Title><span style={{ color: '#000', textShadow: 'none' }}>City Weather :</span>  {city}</Title>

                <form onSubmit={formik.handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'sticky', top: 0 }}>
                        <input
                            id="city"
                            name="city"
                            type="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            style={{ width: '85%', padding: '5px' }}
                        />
                        <button type="submit" style={{ width: '15%', color: '#FFF', border: 'none', textDecoration: 'none', backgroundColor: '#333' }}>➤</button>
                    </div>
                    {/* Validation Error */}
                    {formik.touched.city && formik.errors.city && <ErrorCard message={formik.errors.city} />}
                    <div
                        className={'radio'}
                        role="group"
                        aria-labelledby="my-radio-group"
                        onChange={(event) => onChangeUnits(event)}
                    >
                        <input type="radio" id={'metric'} className={'radio__input'} checked={units === 'metric'} name="units" value="metric" />
                        <label htmlFor={'metric'} className={'radio__label'}>
                            &deg;C
                        </label>

                        <input type="radio" id={'imperial'} className={'radio__input'} checked={units === 'imperial'} name="units" value="imperial" />
                        <label htmlFor={'imperial'} className={'radio__label'}>
                            &deg;F
                        </label>
                    </div>
                </form>
            </FormContainer>


            {/* Display error */}
            {error && <ErrorCard message={errorMessage} />}
            <WeatherCard dt={todayForecast.dt} temp={todayForecast.temp} weather={todayForecast.weather} wind_speed={todayForecast.wind_speed} humidity={todayForecast.humidity} pressure={todayForecast.pressure} current={true} />

        </InputContainer>
    )
}

export default Sidebar
