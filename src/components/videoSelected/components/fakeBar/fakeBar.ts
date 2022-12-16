import styled from "styled-components";

interface containerFakeBarProps {
  background_color: string;
  height: string;
  formatedTime: number;
  animation: number;
  final: number;
  teste: number;
  teste1: number;
}

export const Container = styled.div<containerFakeBarProps>`
  background: ${(props) => props.background_color};
  min-width: ${(props) => props.formatedTime}%;

  height: ${(props) => props.height};
  z-index: 999;
  position: absolute;
  left: 0;
  bottom: 0;
  /* animation: animationBar ${(props) => props.formatedTime}s infinite; */
  /* animation-delay: 1s; */

  /* @keyframes animationBar {
    0% {
      width: calc(${(props) => props.formatedTime}%);
    }

    2% {
      width: calc(${(props) => props.formatedTime}% + 5%);
    }

    3% {
      width: calc(${(props) => props.formatedTime}% + 5.5%);
    }

    3% {
      width: calc(${(props) => props.formatedTime}% + 6%);
    }

    5% {
      width: calc(${(props) => props.formatedTime}% + 6.5%);
    }
    10% {
      width: calc(${(props) => props.formatedTime}% + 7%);
    }
    15% {
      width: calc(${(props) => props.formatedTime}% + 7.5%);
    }
    20% {
      width: calc(${(props) => props.formatedTime}% + 7.8%);
    }
    25% {
      width: calc(${(props) => props.formatedTime}% + 8%);
    }
    30% {
      width: calc(${(props) => props.formatedTime}% + 8.5%);
    }
    35% {
      width: calc(${(props) => props.formatedTime}% + 9%);
    }
    40% {
      width: calc(${(props) => props.formatedTime}% + 9.5%);
    }
    45% {
      width: calc(${(props) => props.formatedTime}% + 10%);
    }
    50% {
      width: calc(${(props) => props.formatedTime}% + 10.5%);
    }
    55% {
      width: calc(${(props) => props.formatedTime}% + 11%);
    }
    60% {
      width: calc(${(props) => props.formatedTime}% + 11.5%);
    }
    65% {
      width: calc(${(props) => props.formatedTime}% + 12%);
    }
    70% {
      width: calc(${(props) => props.formatedTime}% + 12.5%);
    }
    75% {
      width: calc(${(props) => props.formatedTime}% + 13%);
    }
    80% {
      width: calc(${(props) => props.formatedTime}% + 12%);
    }
    85% {
      width: calc(${(props) => props.formatedTime}% + 11%);
    }
    90% {
      width: calc(${(props) => props.formatedTime}% + 10%);
    }
    95% {
      width: calc(${(props) => props.formatedTime}% + 7%);
    }

    100% {
      width: calc(${(props) => props.formatedTime}% + 3%);
    }
  } */
`;
