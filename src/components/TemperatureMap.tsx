import { useContext } from 'react'
import { LayersControl, MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
import styled from 'styled-components';
import { ForecastContext } from '../context/ForecastContext';

const Container = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
    align-self: center;
    width: 80%;
    height: 400px;
`

const MapTitle = styled.p`
    text-align: center;
    font-size: 14pt;
    background-color: rgba(255,255,255,.2);
    margin-bottom: 10px;
    font-weight: bold;
    padding: 10px;
    border-bottom: dashed .3px;
`

//Complete Map API URL Request
const mapUrl = process.env.REACT_APP_MAP_API_SERVER + '' + process.env.REACT_APP_API_KEY;

const Map = () => {
    const { city, coords } = useContext(ForecastContext);

    function LocationMarker() {
        const map = useMapEvents({})
        map.flyTo([coords.lat, coords.lon], map.getZoom())

        // useEffect(() => {
        // }, [coords])

        return coords === null ? null : (
            <Marker position={[coords.lat, coords.lon]}>
                <Tooltip permanent>
                    <span>{city}</span>
                </Tooltip>
            </Marker>
        )
    }

    return (
        <>
            <MapTitle>Temperature Map</MapTitle>
            <Container>
                <MapContainer
                    center={[coords.lat, coords.lon]}
                    zoom={3}
                >
                    
                    <LayersControl position='topright' collapsed={false} hideSingleBase={false}>
                        <LayersControl.BaseLayer checked name="World Map">
                            <TileLayer
                                attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.Overlay checked name='Temperature Map'>
                            <TileLayer
                                attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                                url={mapUrl}
                            />
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name='Precipitation Map'>
                            <TileLayer
                                attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
                            />
                        </LayersControl.Overlay>

                        <LayersControl.Overlay name='Clouds Map'>
                            <TileLayer
                                attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                                url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
                            />
                        </LayersControl.Overlay>

                        <LayersControl.Overlay name='Sea level Pressure Map'>
                            <TileLayer
                                attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                                url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
                            />
                        </LayersControl.Overlay>

                        <LayersControl.Overlay name='Wind Speed Map'>
                            <TileLayer
                                attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
                            />
                        </LayersControl.Overlay>
                        <LocationMarker />
                    </LayersControl>
                </MapContainer>
            </Container>
        </>
    );
};

export default Map