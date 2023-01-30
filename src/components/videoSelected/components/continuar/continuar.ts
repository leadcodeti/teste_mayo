import styled from "styled-components";

interface containerContinuarProps {
  background_color: string | undefined;
  text_color: string | undefined;
  isVisibleContainer: string;
}

export const Container = styled.div<containerContinuarProps>`
  width: 100%;
  height: 100%;
  background: ${(props) => props.background_color};
  color: ${(props) => props.text_color};
  position: absolute;
  z-index: 999;
  display: ${(props) => props.isVisibleContainer};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    margin-top: 1.3rem;
    display: flex;
    gap: 20px;

    span {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.2rem;
      position: relative;

      svg {
        font-size: 50px;
      }
    }
  }
`;
