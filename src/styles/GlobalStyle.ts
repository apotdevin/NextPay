import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        background: rgb(101,180,252);
        background: linear-gradient(0deg, rgba(101,180,252,1) 0%, rgba(145,201,253,1) 100%);
        color: black;
        font-family: 'Manrope', sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
