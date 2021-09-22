import React from 'react';
import './App.css';
import Header from './components/Header';
import styled from 'styled-components'
import Sidebar from './components/Sidebar';
import Section from './components/Section';
import {ForecastProvider} from './context/ForecastContext';
import Map  from './components/TemperatureMap';
import Footer from './components/Footer';

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
  width: 80%;
  background: rgba(255,255,255,0.1);
}   
`

const SectionTitle = styled.p`
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    background-color: rgba(255,255,255,.2);
    margin-bottom: 10px;
    padding: 10px;
    border-bottom: dashed .3px;
`


function App() {
  return (
    <div className="App">
      <Header />
      <SectionTitle>Get 5 days Forecast</SectionTitle>
      {/* State */}
      <ForecastProvider>
        <Container>
          <Sidebar />
          <Section />
        </Container>
        <Map />
      </ForecastProvider>
      <Footer />
    </div>
  );
}

export default App;
