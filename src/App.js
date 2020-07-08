import React from 'react';
import { createGlobalStyle } from 'styled-components';
import {Navbar} from './Navar/Navbar';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans', sans-serif;
  }
  h1, h2, h3 {
    font-family: 'Righteous', cursive;
  }
`

function App() {
  return (
    <>
    <Navbar/>
    <GlobalStyle/>
   <div>Ordering App</div>
   
   </>
  );
}

export default App;
