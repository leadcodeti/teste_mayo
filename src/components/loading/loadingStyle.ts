
import styled from "styled-components";

interface loadingProps {
  fontSize: number;
  color: string;
}

export const Loading = styled.div<loadingProps>`
  span{   
     color: ${(props) => props.color};
     font-size: ${(props) => props.fontSize}rem;
   }

`;