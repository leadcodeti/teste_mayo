import { useEffect, useState } from "react";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { Container } from "./fakeBar";

export function FakeBarInVideo() {
  const {
    fakeBarData,
    currentVideoTime,
    videoTime,
    formatedTime,
    setFormatedTime,
    pausedVideoThumb,
    fakebarProps,
  } = useVideoContext();
  const { backgroundColor, changeDuration } = usePlayeContext();

  setFormatedTime((currentVideoTime / videoTime) * 100);

  return (
    <Container
      background_color={backgroundColor}
      height={fakebarProps.height + "px"}
      formatedTime={formatedTime}
      animation={videoTime}
      pausedVideo={pausedVideoThumb}
      detailsDuration={changeDuration}
      id="bar"
    >
      <div className="barra"></div>
    </Container>
  );
}
