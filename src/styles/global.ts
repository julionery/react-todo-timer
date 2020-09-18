import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, #root {
    height: 100vh;
    background: ${props => props.theme.colors.background};
    font-size: 14px;
    color:  ${props => props.theme.colors.text};
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased
  }

  button {
    cursor: pointer;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    appearance: none;
    outline: 0;
    box-shadow: none;
    border: 0 !important;
    background-image: none;
  }
`;
