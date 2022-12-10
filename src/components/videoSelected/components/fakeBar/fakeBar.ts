import styled from "styled-components";

interface containerFakeBarProps {
  background_color: string;
  height: string;
}

export const Container = styled.div<containerFakeBarProps>`
  background: ${(props) => props.background_color};
  width: 100%;
  height: ${(props) => props.height};
  z-index: 999;
  position: absolute;
  left: 0;
  bottom: 0;
  animation: rangeWidth 360s;

  @keyframes rangeWidth {
    0% {
      width: 0%;
    }

    5% {
      width: 10%;
    }

    15% {
      width: 20%;
    }

    30% {
      width: 35%;
    }

    100% {
      width: 100%;
    }
  }
`;
