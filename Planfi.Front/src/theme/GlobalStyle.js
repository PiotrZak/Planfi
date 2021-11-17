import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

@font-face {
  font-family: 'icomoon';
  src:  url('/fonts/icomoon.woff2?9h1pxj') format('woff2');
  src:  url('/fonts/icomoon.eot?9h1pxj#iefix') format('embedded-opentype'),
    url('/fonts/icomoon.woff2?9h1pxj') format('woff2'),
    url('/fonts/icomoon.ttf?9h1pxj') format('truetype'),
    url('/fonts/icomoon.woff?9h1pxj') format('woff'),
    url('/fonts/icomoon.svg?9h1pxj#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

  *, *::before, *::after{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body{
    height: auto !important;
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
    background: ${({ theme }) => theme.colorGray90};
  }
  
  h1,
  h2,
  h3{
    font-weight: 700;
  }
  
  h1{
    font-size: 4.8rem;
    line-height: 5.8rem;
  }
  
  h2{
    font-size: 2.4rem;
    line-height: 3.6rem;
  }
  
  h3{
    font-size: 2rem;
    line-height: 3rem;
  }
  
  h4{
    font-size:1.6rem;
    line-height:2.8rem;
  }
  
  p{
    font-size:1.4rem;
  }
`

export default GlobalStyle
