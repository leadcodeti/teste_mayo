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
import { Switch } from "../editVideoSideBar/accordion/switchFunctions";
import { boolean } from "yup";
import parse from "html-react-parser";
import { InsideButton } from "../editVideoSideBar/components/botoes/InsideButtons";

export default function PlayerVideo() {
  const {
    setCurrentTimeVideo,
    getCurrentVideoTime,
    activeAccordion,
    playerRef,
  } = useSideBarContext();

  const [currentTime, setCurrentTime] = usePlayerContext(
    playerRef,
    "currentTime",
    0
  );
  const [duration] = usePlayerContext(playerRef, "duration", -1);

  const {
    backgroundColor,
    bigPlay,
    nextBtn,
    playTime,
    prevBtn,
    fullScrean,
    smalPlay,
    volume,
    progressBar,

    watchVideoTime,
    setWatchVideoTime,
    setTotalDuration,
    htmlCustom,
    setHtmlCustom,
    htmlCustomTimer,
    resultInsideProps,
    setChangeDuration,
  } = usePlayeContext();

  const {
    currentVideo,
    setButtonPosition,
    buttonPosition,
    buttonProps,
    videosId,
    setButtonProps,
    setVideoTime,

    isVisibleButtonInside,
    isVisibleButtonCustom,
  } = useVideoContext();

  useEffect(() => {
    setVideoTime(duration);
    setCurrentTimeVideo(currentTime);
    setTotalDuration(playerRef.current?.duration);
  }, [
    currentTime,
    duration,
    playerRef,
    setCurrentTimeVideo,
    setTotalDuration,
    setVideoTime,
  ]);

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
    display: `${bigPlay?.isActive ? "flex" : "none"}`,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "50%",
    "--vm-control-scale": "1.6",
  };

  useEffect(() => {
    api(`/cta_buttons/${videosId.currentVideoId}`).then((res) => {
      const data = res.data;
      const insideFiltered = data?.filter((e: any) => e.type === "inside");
      const insideResult = insideFiltered[0];

      if (data?.find((e: any) => e.type === "custom")) {
        const buttonCustom = data?.find((e: any) => e.type === "custom");
        setHtmlCustom(buttonCustom.html_content);
        // setHtmlCustomTimer({buttonCustom?.start, buttonCustom?.end})
      }

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



  setWatchVideoTime(playerRef.current?.currentTime);

    setWatchVideoTime(playerRef.current?.currentTime);
  }, [currentVideo.currentVideoId, setButtonProps, setButtonPosition,
     videosId.currentVideoId, setHtmlCustom, setWatchVideoTime, playerRef]);

 function onTimeUpdate(event: CustomEvent<number>) {
  setChangeDuration(event.detail);
}


  return (
    <div className={styles.player}>
      <Player
        theme="dark"
        style={playerTheme}
        ref={playerRef}
        volume={activeAccordion?.activeAutoPlay ? 0.01 : 30}
        onVmCurrentTimeChange={onTimeUpdate}
      >
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
          {activeAccordion?.activeContinue ? (
            <Continuar setCurrentTime={setCurrentTime} />
          ) : (
            ""
          )}
          {activeAccordion?.activeFakeBar ? <FakeBarInVideo /> : ""}
          {activeAccordion?.activeAutoPlay ? (
            <AutoPlay setCurrentTime={setCurrentTime} />
          ) : (
            ""
          )}
          {activeAccordion?.activeThumbNails ? <Thumbnails /> : ""}
          {isVisibleButtonInside ? <InsideButton /> : ""}
        </div>
        <Youtube videoId={videosId.currentPlayerId} />

        <Ui>
          <ClickToPlay />
          <DblClickFullscreen />
          <Spinner />

          <Controls fullWidth pin={"center"}>
            <PlaybackControl
              hideTooltip={true}
              style={centeredPlayBack}
              onClick={getCurrentVideoTime}
            />
          </Controls>

          <Controls fullWidth>
            <ControlGroup>
              <ScrubberControl
                style={{
                  display: `${progressBar?.isActive ? "flex" : "none"}`,
                }}
              />
            </ControlGroup>

            <ControlGroup
              space="top"
              style={{
                display: `${activeAccordion?.activeAutoPlay ? "none" : "flex"}`,
              }}
            >
              <PlaybackControl
                style={{ display: `${smalPlay?.isActive ? "flex" : "none"}` }}
                hideTooltip={true}
                onClick={getCurrentVideoTime}
              />

              <ButtonsContainer>
                <PrevButton
                  background={backgroundColor}
                  prevBtn={prevBtn?.isActive}
                  onClick={onSeekBackward}
                >
                  <MdSkipPrevious size={28} />
                </PrevButton>

                <NextButton
                  background={backgroundColor}
                  nextBtn={nextBtn?.isActive}
                  onClick={onSeekForward}
                >
                  <MdSkipNext size={28} />
                </NextButton>
              </ButtonsContainer>

              <VolumeControl
                style={{ display: `${volume?.isActive ? "block" : "none"}` }}
                hideTooltip={true}
              />
              <TimeProgress
                style={{ display: `${playTime?.isActive ? "flex" : "none"}` }}
                separator="/"
              />
              <ControlSpacer />
              <FullscreenControl
                style={{ display: `${fullScrean?.isActive ? "flex" : "none"}` }}
                hideTooltip={true}
              />
            </ControlGroup>
          </Controls>

          <Poster className={styles.thumbnail} />
        </Ui>
      </Player>
      {watchVideoTime
        ? watchVideoTime > htmlCustomTimer?.start &&
          watchVideoTime < htmlCustomTimer?.end
          ? isVisibleButtonCustom
            ? parse(htmlCustom)
            : ""
          : ""
        : ""}
    </div>
  );
}
