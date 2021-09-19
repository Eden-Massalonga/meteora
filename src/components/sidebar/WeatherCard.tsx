import React from 'react'

const WeatherCard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
                <img src='http://openweathermap.org/img/wn/10d@2x.png'/>
            <div >
                <p>30</p>
                <p>17</p>
            </div>
        </div>
    )
}

export default WeatherCard
