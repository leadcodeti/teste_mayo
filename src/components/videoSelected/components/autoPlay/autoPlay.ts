import styled from "styled-components";

interface AutoPlayProps {
  background: string;
  text_color: string;
}

export const Container = styled.div`
  position: absolute !important;
  z-index: 999 !important;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

export const VideoPlayingMuted = styled.div<AutoPlayProps>`
  width: 50%;
  height: 40%;
  background: ${(props) => props.background};
  border: 3px solid ${(props) => props.text_color};
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 9999;
  animation-direction: alternate;
  animation: pulse 1.5s infinite;
  /* 
  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
      -webkit-filter: brightness(100%);
    }
    100% {
      -webkit-transform: scale(0);
      -webkit-filter: brightness(200%);
    }
  } */

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }

  .textTop {
    color: ${(props) => props.text_color};
  }

  .textFooter {
    color: ${(props) => props.text_color};
  }
`;
