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
  Icon,
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
  const { backgroundColor, controller} = usePlayeContext();
  const player = useRef<HTMLVmPlayerElement>(null);
  const [currentTime, setCurrentTime] = usePlayerContext( player, "currentTime",0);
  const [duration] = usePlayerContext(player, "duration", -1);
  const { setCurrentTimeVideo, getCurrentVideoTime } = useSideBarContext()

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
    setStartVideoThumb,
  } = useVideoContext();

  useEffect(() => {
    setVideoTime(duration);
    setCurrentTimeVideo(currentTime)
  }, [currentTime, duration, setCurrentTimeVideo, setVideoTime]);

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
    display: `${controller.bigPlay ? "flex" : "none"}`,
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
      const insideFiltered = data?.filter((e: any) => e.type === "inside");
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

 useEffect(() => {
  setCurrentVideoTime(player.current?.currentTime);

  let finalThumb = player.current?.currentTime == player.current?.duration;

  console.log("resultado da varivavel", finalThumb);
  setPausedVideoThumb(
    player.current?.paused && player.current?.currentTime > 1
  );
  setFinalVideoThumb(finalThumb);
  setStartVideoThumb(player.current?.currentTime == 0);

 })

  // useEffect(() => {
  //   api(`/videos`).then((res) => {
  //     const fakeBar = res.data[3].has_progress_bar;
  //     setHasFakeBar(fakeBar);
  //     const continuar = res.data[3].has_continue_options;
  //     setHasContinue(continuar);
  //   });
  // }, [videosId.currentVideoId, setHasFakeBar, setHasContinue]);

  return (
    <div className={styles.player}>
      <Player theme="dark" style={playerTheme} ref={player}>
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
          {hasContinue ? <Continuar setCurrentTime={setCurrentTime} /> : ""}
          {hasFakeBar ? <FakeBarInVideo /> : ""}
          {hasAutoPlay ? <AutoPlay /> : ""}
          {hasThumbNails ? <Thumbnails /> : ""}
         
        </div>
        <Youtube videoId={videosId.currentPlayerId} />

        <Ui>
          <ClickToPlay />
          <DblClickFullscreen />
          <Spinner />

          <Controls fullWidth pin={"center"}>
            <PlaybackControl hideTooltip={true} style={centeredPlayBack} onClick={getCurrentVideoTime} />
          </Controls>

          <Controls fullWidth>
            <ControlGroup>
              <ScrubberControl
                style={{ display: `${controller.progressBar ? "flex" : "none"}` }}
              />
            </ControlGroup>

            <ControlGroup space="top">
              <PlaybackControl
                style={{ display: `${controller.smalPlay ? "flex" : "none"}` }}
                hideTooltip={true}
                onClick={getCurrentVideoTime} 
              />

              <ButtonsContainer>
                <PrevButton
                  background={backgroundColor}
                  prevBtn={controller.prevBtn}
                  onClick={onSeekBackward}
                >
                  <MdSkipPrevious size={28} />
                </PrevButton>

                <NextButton
                  background={backgroundColor}
                  nextBtn={controller.nextBtn}
                  onClick={onSeekForward}
                >
                  <MdSkipNext size={28} />
                </NextButton>
              </ButtonsContainer>

              <VolumeControl
                style={{ display: `${controller.volume ? "block" : "none"}` }}
                hideTooltip={true}
              />
              <TimeProgress
                style={{ display: `${controller.playTime ? "flex" : "none"}` }}
                separator="/"
              />
              <ControlSpacer />
              <FullscreenControl
                style={{ display: `${controller.fullScrean ? "flex" : "none"}` }}
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

          // <ButtonInsideVideo
          //   href={"#"}
          //   target="_blank"
          //   background={buttonProps.background_color}
          //   background_hover={buttonProps.bacgrkound_hover}
          //   text_color={buttonProps.text_color}
          //   sizeWidth={
          //     buttonProps.size === "125"
          //       ? "180px"
          //       : buttonProps.size === "150"
          //       ? "250px"
          //       : buttonProps.size === "250"
          //       ? "350px"
          //       : ""
          //   }
          //   sizeFont={
          //     buttonProps.size === "125"
          //       ? "100%"
          //       : buttonProps.size === "150"
          //       ? "150%"
          //       : buttonProps.size === "250"
          //       ? "200%"
          //       : ""
          //   }
          //   className={`${buttonProps.text == "" ? styles.button : ""} ${
          //     styles.buttonSize
          //   }`}
          // >
          //   {/* zindez do botão - ver no embed */}
          //   {buttonProps.text}
          // </ButtonInsideVideo>