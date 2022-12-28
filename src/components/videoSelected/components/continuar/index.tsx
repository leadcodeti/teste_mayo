import { useVideoContext } from "../../../../contexts/useContext";
import { Container } from "./continuar";
import { BiPlayCircle } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";
import { useEffect, useState, useRef } from "react";
import { ClickToPlay } from "@vime/react";
import { useSideBarContext } from "../../../../contexts/thirdContext";

export function Continuar() {
  const {
    continuarProps,
    setContinuarProps,
    setFormatedTime,
    currentVideoTime,
    videoTime,
  } = useVideoContext();
  
  const [dnoneContainer, setDnoneContainer] = useState("flex");
  const{ keepWatching, restartVideo} = useSideBarContext()

  useEffect(() => {
    continuarProps;
    setContinuarProps;
  }, [continuarProps, setContinuarProps]);

  function closeContinuar() {
    setDnoneContainer("none");
    keepWatching()
  }

  function restartTime() {
    setDnoneContainer("none");
    restartVideo()
  }

  return (
    <Container
      background_color={continuarProps.background_color}
      text_color={continuarProps.text_color}
      isVisibleContainer={dnoneContainer}
    >
      <h2>{continuarProps.message}</h2>
      <div>
        <span onClick={closeContinuar}>
          <ClickToPlay />
          <BiPlayCircle />
          {continuarProps.restart_button_text}
        </span>
        <span onClick={restartTime}>
          <VscDebugRestart />
          {continuarProps.restart_button_text}
        </span>
      </div>
    </Container>
  );
}
