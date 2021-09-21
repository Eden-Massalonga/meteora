import { useContext, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import styled from 'styled-components';
import { ForecastContext } from '../context/ForecastContext';

const Container = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
    align-self: center;
    width: 70%;
    height: 400px;
`

const MapTitle = styled.p`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    margin: 10px;
    padding: 10px;
    border-bottom: dashed .3px;
`

const Map = () => {
    const { city, coords } = useContext(ForecastContext);

    function LocationMarker() {
        const map = useMapEvents({})

        useEffect(() => {
            map.flyTo([coords.lat, coords.lon], map.getZoom())
        }, [coords])

        return coords === null ? null : (
            <Marker position={[coords.lat, coords.lon]}>
                <Popup>{city}</Popup>
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
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=07fa4a80502baf3232f10c184f028f57"
                    />
                    <LocationMarker />
                </MapContainer>
            </Container>
        </>
    );
};

export default Map