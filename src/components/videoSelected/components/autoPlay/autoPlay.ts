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
  cursor: pointer;
  .screen-video-comecou {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);

    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .screen-video-comecou-2 {
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: ${(props) => props.background};
    margin: auto;
    border-radius: 10px;
    box-shadow: inset 0 0 0 0.3em rgb(255 255 255 / 50%);
    padding: 0px;
    animation: zoom-animation 1s alternate infinite ease-in-out;
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
  .screen-video-comecou-2 .texto-top {
    font-family: arial !important;
    color: ${(props) => props.text_color};
    font-size: 2rem;
    display: block;
    margin: 1em 0em 0em 0em;
    padding: 0;
    font-weight: bold;
  }
  .screen-video-comecou-2 .texto-bottom {
    font-family: arial !important;
    color: ${(props) => props.text_color};
    font-size: 2rem;
    display: block;
    margin: 0em 0em 1em 0em;
    padding: 0;
    font-weight: bold;
  }
  .screen-video-comecou-2 .icone-audio {
    margin: 1em auto;
    width: 35%;
  }
  @media (max-width: 600px) {
    .screen-video-comecou-2 {
      width: 70%;
      box-shadow: inset 0 0 0 0.15em rgb(255 255 255 / 50%);
    }
    .screen-video-comecou-2 .texto-top {
      font-size: 2.2vh;
      margin: 0.8em 0em -0.5em 0em;
    }
    .screen-video-comecou-2 .texto-bottom {
      font-size: 2.2vh;
      margin: -0.5em 0em 0.8em 0em;
    }
    .screen-video-comecou-2 .icone-audio {
      margin: 1em auto;
      width: 30%;
    }
  }
  /* Animação SVG ícone de volume  */
  @-webkit-keyframes BLINK {
    0% {
      opacity: 0;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes BLINK {
    0% {
      opacity: 0;
    }
    33% {
      opacity: 1;
    }
    66% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .blink_1 {
    -webkit-animation: BLINK 2s infinite;
    animation: BLINK 2s infinite;
    opacity: 0;
  }
  .blink_2 {
    -webkit-animation: BLINK 2s infinite 0.3s;
    animation: BLINK 2s infinite 0.3s;
    opacity: 0;
  }
  .blink_3 {
    -webkit-animation: BLINK 2s infinite 0.6s;
    animation: BLINK 2s infinite 0.6s;
    opacity: 0;
  }
  .smartplay-svg-color {
    fill: ${(props) => props.text_color} !important;
  }
`;
