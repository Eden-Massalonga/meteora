import React from 'react'

const WeatherCard = () => {
    return (
        <div style={{ border: '1px solid green'}}>
            <p style={{ backgroundColor: '#333', color: 'white', margin: '0', borderBottom: '1px solid white'}}>Maputo, Mz</p>
            <div style={{display:'flex, flex-direction: row'}}>
                <div style={{ backgroundColor: '#333', color: 'white', width: '30%'}}>
                    21
                </div>
                <div  style={{width: '70%' }}>
                    <div>
                        <img src='http://openweathermap.org/img/wn/10d@2x.png' />
                    </div>
                    <p>30</p>
                    <p>17</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard
