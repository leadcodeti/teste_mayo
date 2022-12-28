import {
  Player,
  Ui,
  Controls,
  ControlGroup,
  ScrubberControl,
  PlaybackControl,
  VolumeControl,
  Video,
  Poster,
  ClickToPlay,
  DblClickFullscreen,
  TimeProgress,
  Spinner,
  FullscreenControl,
  ControlSpacer,
  Youtube,
  usePlayerContext,
} from "@vime/react";
import { usePlayeContext } from "../../contexts/usePlayerContext";
import styles from "./styles.module.scss";
import "@vime/core/themes/default.css";
import { useEffect, useRef, useState } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { ButtonsContainer, NextButton, PrevButton } from "./nextAndPrevButtons";
import { useVideoContext } from "../../contexts/useContext";
import { ButtonInsideVideo } from "../editVideoSideBar/components/botoes/buttons";
import { api } from "../../services/api";
import { Continuar } from "./components/continuar";
import { FakeBarInVideo } from "./components/fakeBar";
import { AutoPlay } from "./components/autoPlay";
import { Thumbnails } from "./components/thumbnails";
import { useSideBarContext } from "../../contexts/thirdContext";


export default function PlayerVideo() {
  const {
    backgroundColor,
    bigPlay,
    fullScrean,
    playTime,
    progressBar,
    volume,
    smalPlay,
    nextBtn,
    prevBtn,
  } = usePlayeContext();
  const {getCurrentVideoTime,setCurrentTimeVideo,lastTimeWacth,playerRef } = useSideBarContext()
  const [currentTime, setCurrentTime] = usePlayerContext(playerRef,"currentTime", 0);

  const [duration] = usePlayerContext(playerRef, "duration", -1);

  
  // console.log("DURATION", duration);

  const {
    currentVideo,
    setButtonPosition,
    buttonPosition,
    buttonProps,
    videosId,
    setButtonProps,
    hasContinue,
    setHasContinue,
    setVideoTime,
    hasFakeBar,
    setHasFakeBar,
    setCurrentVideoTime,
    hasAutoPlay,
    setPausedVideoThumb,
    hasThumbNails,
    setFinalVideoThumb,
  } = useVideoContext();


  useEffect(() => {
    setVideoTime(duration);
    setCurrentTimeVideo(currentTime);
    // setCurrentTime(lastTimeWacth)
  }, [currentTime, duration, lastTimeWacth, setCurrentTime, setCurrentTimeVideo, setVideoTime]);

  const onSeekBackward = () => {
    if (currentTime < 5) return;
    setCurrentTime(currentTime - 10);
  };

  const onSeekForward = () => {
    if (currentTime > duration - 10) return;
    setCurrentTime(currentTime + 10);
  };

  const playerTheme: {} = {
    "--vm-player-theme": `${backgroundColor}`,
    position: "relative",
    zIndex: "0",
  };

  const centeredPlayBack: {} = {
    background: `${backgroundColor}`,
    zIndex: "-1",
    width: "80px",
    height: "80px",
    margin: "0 auto",
    display: `${bigPlay ? "flex" : "none"}`,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "50%",
    "--vm-control-scale": "1.6",
  };

  useEffect(() => {
    api(`/cta_buttons/${videosId.currentVideoId}`).then((res) => {
      const data = res.data;
      console.log(data);
      const insideFiltered = data.filter((e: any) => e.type === "inside");
      const insideResult = insideFiltered[0];

      setButtonProps({
        background_color: insideResult.background_color,
        bacgrkound_hover: insideResult.background_hover,
        size: insideResult.size,
        text: insideResult.text,
        text_color: insideResult.text_color,
        link: insideResult.link,
        position: insideResult.position,
      });
      setButtonPosition(insideResult.position);
    });
  }, [
    currentVideo.currentVideoId,
    setButtonProps,
    buttonPosition,
    setButtonPosition,
    videosId.currentVideoId,
  ]);

  setCurrentVideoTime(playerRef.current?.currentTime);

  setPausedVideoThumb(playerRef.current?.paused);

  let variavel = playerRef.current?.currentTime == playerRef.current?.duration;

  setFinalVideoThumb(variavel);

  useEffect(() => {
    api(`/videos`).then((res) => {
      console.log("resposta", res.data);
      const fakeBar = res.data[3].has_progress_bar;
      setHasFakeBar(fakeBar);
      const continuar = res.data[3].has_continue_options;
      setHasContinue(continuar);
    });
  }, [videosId.currentVideoId, setHasFakeBar, setHasContinue]);

  return (
    <div className={styles.player}>

      <Player theme="dark" style={playerTheme} ref={playerRef}>
        <div
          className={`${styles.insideVideoButton}
              ${
                buttonPosition == "start-top"
                  ? styles.startTop
                  : buttonPosition == "center-top"
                  ? styles.centerTop
                  : buttonPosition == "end-top"
                  ? styles.endTop
                  : buttonPosition == "start-center"
                  ? styles.startCenter
                  : buttonPosition == "center-center"
                  ? styles.centerCenter
                  : buttonPosition == "end-center"
                  ? styles.endCenter
                  : buttonPosition == "start-bottom"
                  ? styles.startBottom
                  : buttonPosition == "center-bottom"
                  ? styles.centerBottom
                  : buttonPosition == "end-bottom"
                  ? styles.endBottom
                  : styles.centerCenter
              }
            `}
        >
          {hasContinue ? <Continuar /> : ""}
          {hasFakeBar ? <FakeBarInVideo /> : ""}
          {hasAutoPlay ? <AutoPlay /> : ""}
          {hasThumbNails ? <Thumbnails /> : ""}

        </div>
        <Youtube videoId={videosId.currentPlayerId} />

        <Ui>
          <ClickToPlay />
          <DblClickFullscreen />
          <Spinner />

          <Controls fullWidth pin={"center"} onClick={getCurrentVideoTime}>
            <PlaybackControl hideTooltip={true} style={centeredPlayBack} />
          </Controls>

          <Controls fullWidth>
            <ControlGroup>
              <ScrubberControl
                style={{ display: `${progressBar ? "flex" : "none"}` }}
              />
            </ControlGroup>

            <ControlGroup space="top">
              <PlaybackControl
                style={{ display: `${smalPlay ? "flex" : "none"}` }}
                hideTooltip={true}
                onClick={getCurrentVideoTime}
              />

              <ButtonsContainer>
                <PrevButton
                  background={backgroundColor}
                  prevBtn={prevBtn}
                  onClick={onSeekBackward}
                >
                  <MdSkipPrevious size={28} />
                </PrevButton>

                <NextButton
                  background={backgroundColor}
                  nextBtn={nextBtn}
                  onClick={onSeekForward}
                >
                  <MdSkipNext size={28} />
                </NextButton>
              </ButtonsContainer>

              <VolumeControl
                style={{ display: `${volume ? "block" : "none"}` }}
                hideTooltip={true}
              />
              <TimeProgress
                style={{ display: `${playTime ? "flex" : "none"}` }}
                separator="/"
              />
              <ControlSpacer />
              <FullscreenControl
                style={{ display: `${fullScrean ? "flex" : "none"}` }}
                hideTooltip={true}
              />
            </ControlGroup>
          </Controls>

          <Poster className={styles.thumbnail} />
        </Ui>
      </Player>
    </div>
  );
}
