import styled from "styled-components";

// interface containerContinuarProps {
//   background_color: string;
//   text_color: string;
// }

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const Icon_Muted = styled.div`
  .screen-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    z-index: 9999;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  @keyframes zoom-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }

  .screen-video-2 {
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: auto;
    border-radius: 10px;
    box-shadow: inset 0 0 0 0.3em rgb(255 255 255 / 50%);
    padding: 0px;
    animation: zoom-animation 1s alternate infinite ease-in-out;

    p{
      font-size: 1.5rem;
    }

    svg {
      cursor: pointer;
    }
  }

  @keyframes zoom-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.98);
    }
    100% {
      transform: scale(1);
    }
  }
`;
