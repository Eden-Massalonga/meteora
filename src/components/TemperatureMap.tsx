import { LatLngExpression } from 'leaflet';
import { useContext, useEffect, useState } from 'react'
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
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

const Map = () => {
    const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position
    const { coords } = useContext(ForecastContext);

    function LocationMarker() {
        const [position, setPosition] = useState(defaultPosition)
        const map = useMapEvents({
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })

        useEffect(() => {
            map.flyTo([coords.lat, coords.lon], map.getZoom())
        }, [coords])
      
        return coords === null ? null : (
          <Marker position={[coords.lat, coords.lon]}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }

    return (
        <Container>
            <h1>Hello</h1>
            <MapContainer
                center={[coords.lat, coords.lon]}
                zoom={3}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=07fa4a80502baf3232f10c184f028f57"
                />
                {/* <Marker position={[coords.lat, coords.lon]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable. {coords.lat +' '+ coords.lon}
                    </Popup>
                </Marker> */}
                <LocationMarker />
            </MapContainer>
            <h1>Hello</h1>
        </Container>
    );
};

export default Map