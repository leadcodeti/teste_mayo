import { useVideoContext } from "../../../../contexts/useContext";
import { Container } from "./continuar";
import { BiPlayCircle } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";
import { useEffect, useState, useRef } from "react";
import { ClickToPlay } from "@vime/react";
import { useSideBarContext } from "../../../../contexts/thirdContext";

interface ContinueProps {
  setCurrentTime: (value: number) => void
}

export function Continuar({setCurrentTime} : ContinueProps) {
  const {continuarProps, setContinuarProps,} = useVideoContext();
  
  const [dnoneContainer, setDnoneContainer] = useState("flex");
  const { restartVideo,lastTimeWacth } = useSideBarContext()


  useEffect(() => {
    continuarProps;
    setContinuarProps;
  }, [continuarProps, setContinuarProps]);

  function closeContinuar() {
    setDnoneContainer("none");
    setCurrentTime(lastTimeWacth.currentTimeVideo);
  }

  function restartTime() {
    setDnoneContainer("none");
    setCurrentTime(1)
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
          {continuarProps.continue_button_text}
        </span>
        <span onClick={restartTime}>
          <VscDebugRestart />
          {continuarProps.restart_button_text}
        </span>
      </div>
    </Container>
  );
}
