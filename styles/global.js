import css from "styled-jsx/css";
import theme from "./theme";

export default css.global`
  body {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.8;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    font-family: ${theme.fontFamily.sansSerif};
  }
  h1 {
    font-weight: 700;
  }
  p {
    margin-bottom: 10px;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3F4550; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1B1D22; 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #121317; 
  }
`;
