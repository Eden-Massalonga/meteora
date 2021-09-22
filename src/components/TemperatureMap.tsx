import { useContext } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from "react-leaflet";
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
const mapUrl = process.env.REACT_APP_MAP_API_SERVER+''+process.env.REACT_APP_API_KEY;

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
                    <TileLayer
                        attribution='&copy; <a href="https://openweathermap.org/">OpenWeather</a> contributors'
                        url={mapUrl}
                    />
                    <LocationMarker />
                </MapContainer>
            </Container>
        </>
    );
};

export default Map