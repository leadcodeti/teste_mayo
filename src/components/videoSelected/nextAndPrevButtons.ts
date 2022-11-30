import styled from "styled-components";


interface NextButtonsProps {
  background: string;
  nextBtn: boolean;
}

interface PrevButtonsProps {
  background: string;
  prevBtn: boolean; 
}

export const ButtonsContainer = styled.div`
  margin: 0 0.2rem;
`;

export const PrevButton = styled.button<PrevButtonsProps>`
    height: 100%;
    width: 35px;
    border-radius: 3px;
    color: var(--white);
    transition: all 0.3s ease-in-out;
    background: transparent;
    display: ${props => props.prevBtn ? "inline-block":"none"};
  
    &:nth-child(1) {
      margin-right: 0.2rem;
    }

    &:hover {
      background: ${props => props.background};
    }
`;

export const NextButton = styled.button<NextButtonsProps>`
    height: 100%;
    width: 35px;
    border-radius: 3px;
    color: var(--white);
    transition: all 0.3s ease-in-out;
    background: transparent;
    display: ${props => props.nextBtn ? "inline-block":"none"};

    &:hover {
      background: ${props => props.background};
    }
`;




