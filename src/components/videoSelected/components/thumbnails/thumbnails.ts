import styled from "styled-components";

interface ThumbnailsProps {
  pausedVideo: any;
  finishedVideo: any;
}

export const Container = styled.div<ThumbnailsProps>`
  z-index: ${(props) => (props.pausedVideo || props.finishedVideo ? 999 : "")};
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  span {
    position: absolute;

    svg {
      font-size: 1000%;
    }
  }
`;
