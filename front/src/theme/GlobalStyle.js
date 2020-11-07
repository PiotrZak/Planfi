import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

  *, *::before, *::after{
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body{
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
    background: ${({theme}) => theme.colorGray90};
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
`;

export default GlobalStyle;
