import styled from "styled-components";

interface containerFakeBarProps {
  background_color: string | undefined;
  height: string;
  formatedTime: number;
  animation: number;
  pausedVideo?: boolean;
  detailsDuration: number;
}

export const Container = styled.div<containerFakeBarProps>`
  background: ${(props) => props.background_color};
  width: ${(props) => props.formatedTime}%;

  height: ${(props) => props.height};
  z-index: 999;
  position: absolute;
  left: 0;
  bottom: 0;
  animation: mayoplayer-fakebar-animation
    ${(props) =>
      props.detailsDuration == 0 ? 0 : props.animation - props.detailsDuration}s
    infinite;

  animation-play-state: ${(props) =>
    !props.pausedVideo && props.formatedTime > 0 ? "running" : "paused"};

  @keyframes mayoplayer-fakebar-animation {
    0.5% {
      width: 10%;
    }
    0.9% {
      width: 15%;
    }
    1.5% {
      width: 17%;
    }
    2.4% {
      width: 22%;
    }
    3.6% {
      width: 26%;
    }
    5.4% {
      width: 32%;
    }
    7.2% {
      width: 37%;
    }
    9.0% {
      width: 41%;
    }

    10.8% {
      width: 45%;
    }
    12.6% {
      width: 48%;
    }
    14.4% {
      width: 51%;
    }
    16.2% {
      width: 54%;
    }
    18.0% {
      width: 57%;
    }
    19.8% {
      width: 59%;
    }
    21.6% {
      width: 62%;
    }
    23.4% {
      width: 64%;
    }
    25.2% {
      width: 66%;
    }
    27.0% {
      width: 68%;
    }
    28.8% {
      width: 70%;
    }
    30.5% {
      width: 72%;
    }
    32.4% {
      width: 73%;
    }
    34.1% {
      width: 75%;
    }
    36.0% {
      width: 77%;
    }
    37.7% {
      width: 78%;
    }
    39.5% {
      width: 79%;
    }
    41.3% {
      width: 80%;
    }
    43.1% {
      width: 82%;
    }
    46.7% {
      width: 84%;
    }
    50.3% {
      width: 86%;
    }
    53.9% {
      width: 88%;
    }
    57.5% {
      width: 90%;
    }
    61.1% {
      width: 92%;
    }
    64.7% {
      width: 93%;
    }
    68.3% {
      width: 94%;
    }
    71.8% {
      width: 95%;
    }
    75.4% {
      width: 96%;
    }
    79.0% {
      width: 97%;
    }
    82.6% {
      width: 98%;
    }
    86.2% {
      width: 99%;
    }
    89.8% {
      width: 99.5%;
    }
    93.4% {
      width: 99.7%;
    }
    97.0% {
      width: 99.9%;
    }
    100% {
      width: 100%;
    }
  }
`;
