import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import WeatherCard from './sidebar/WeatherCard'
import WeatherContext from '../context/WeatherContext'

const InputContainer = styled.div`
    width: 30%;
    padding: 10px;
    border-right: solid;
    margin: 10px auto;
`

// const FormControl = styled.div`
//     display: flex;
//     flex-direction: column;
// `

const Title = styled.h5`
    color: gray;
`

const Sidebar = () => {
    // const weatherContext = useContext(WeatherContext)
    // const {getLocation} = weatherContext;

    // useEffect(() => {
    //     getLocation();
    // }, [])

    const formik = useFormik({
        initialValues: {
            city: '',
            units: 'c'
        },
        onSubmit: values => {
            console.log(values);

        }
    })

    return (
        <InputContainer>
            <Title>Your City Weather</Title>

            <div >
                <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection: 'row'}}>
                    {/* <FormControl> */}
                    {/* <label htmlFor="city">City name</label> */}
                    <input
                        id="city"
                        name="city"
                        type="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                    {/* </FormControl> */}
                    <button type="submit">➤</button>
                </form>
            </div>

            <WeatherCard />
        </InputContainer>
    )
}

export default Sidebar
