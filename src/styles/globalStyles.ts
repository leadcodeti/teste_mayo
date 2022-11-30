import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root{
  
  // COLOR PALETTE : //

  --gray-100: rgba(44, 56, 74, 0.681);
  --gray-200:#ececec;
  --pink-800: #ff003c;
  --black-800: #191919;
  --white: #ffffff;
  --blue: #3692e7;
  --gray-50:#cccc;
  --gray-300:#909090;

  --background-gradient: linear-gradient(
      156deg,
      rgba(47, 240, 241, 1) 0%,
      rgba(30, 246, 200, 1) 12%,
      rgba(36, 156, 244, 1) 24%,
      rgba(176, 78, 255, 1) 36%,
      rgba(227, 16, 212, 1) 47%,
      rgba(255, 22, 97, 1) 63%,
      rgba(255, 92, 61, 1) 77%,
      rgba(255, 83, 41, 1) 87%,
      rgba(255, 0, 0, 1) 100%
    );
    // Fonts : //
    --fontFamily1: Epilogue, sans-serif;
    --fontFamily2:'set your fonts';

}

@media (max-width :1080px){
  html{
      font-size: 93.75%;
  }
}

@media (max-width : 720px){
  html{
      font-size: 87.5%;
  }
}

body{
 background: #fff;  
 color: var(--black-800);
}

body, input, textarea,select, button {
  font-family: var(--fontFamily1);
}

h1,h2,h3,p,span, strong{
  padding: 0;
  margin: 0;
}

ul,li {
  list-style: none;
}

button{
  cursor: pointer;
  border: none;
}

img{
  display: block;
  max-width: 100%;
}

a{
  color: inherit;
  text-decoration: none;
}
.accordion-button::after {
  display: none !important;
}

.accordion {
  --bs-accordion-border-width: none !important;

  --bs-accordion-btn-focus-box-shadow: none !important;

  .accordion-item {
    margin-top: 0.35rem;
  }

  /* .accordion-button {
    border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
  } */

}

//VIDEO CUSTIMIZATION 

`;

export default GlobalStyle;
