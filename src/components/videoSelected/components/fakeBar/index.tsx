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
    getHeight,
  } = useVideoContext();
  const { backgroundColor, changeDuration } = usePlayeContext();

  setFormatedTime((currentVideoTime / videoTime) * 100);



  // function reset_animation() {
  //   var el = document.getElementById('bar');
  //    el.style.animation = 'none';
  //    el.offsetHeight; /* trigger reflow */
  //    el.style.animation = null; 
  // }

  return (
    <Container
      background_color={backgroundColor}
      height={getHeight + "px"}
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
