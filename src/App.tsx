import React from 'react';
import './App.css';
import Header from './components/Header';
import styled from 'styled-components'
import Sidebar from './components/Sidebar';
import Section from './components/Section';

const Container = styled.div`
  display: flex;
  margin: 10px auto 10px auto;
  flex-direction: row;
  border-style: solid;
  border-all: 1px solid gray;
  width: 70%;
  
`

function App() {
  return (
    <div className="App">
      <Header />
      {/* State */}
        <Container>
          <Sidebar />
          <Section />
        </Container>
    </div>
  );
}

export default App;
