import React from 'react';
import './App.css';
import Header from './components/Header';
import styled from 'styled-components'
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import {ForecastProvider} from './context/ForecastContext';
import Map  from './components/TemperatureMap';

const Container = styled.div`
  //Mobile 
  display: flex;
  margin: 10px auto 10px auto;
  flex-direction: column;
  // border-style: solid;
  // border-all: 1px solid gray;
  width: 100%;

@media only screen and (min-width: 600px) {
  /* For tablet: */
  display: flex;
  margin: 10px auto 10px auto;
  flex-direction: row;
  // border-style: solid;
  // border-all: 1px solid gray;
  width: 100%;
}

@media only screen and (min-width: 992px) {
  /* For desktop: */
  display: flex;
  margin: 0px auto 10px auto;
  flex-direction: row;
  // border-style: solid;
  border-all: 1px solid gray;
  width: 100%;
  background: rgba(255,255,255,0.1);
}  
  
`

function App() {
  return (
    <div className="App">
      <Header />
      {/* State */}
      <ForecastProvider>
        <Container>
          <Sidebar />
          <Section />
        </Container>
        <Map />
      </ForecastProvider>
    </div>
  );
}

export default App;
