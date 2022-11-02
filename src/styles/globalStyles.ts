import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root{
  
  // COLOR PALETTE : //

  --colorName1:#060606;
  --colorName2:#ffffff;
  --colorName3:#ffffff;
  --colorName4:#ffffff;

    // Fonts : //
    --fontFamily1:'set your fonts';
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
 background: var(--colorName1);  
 color: var(--colorName2);
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
`;

export default GlobalStyle;
