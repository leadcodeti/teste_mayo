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

  const [dnoneContainer, setDnoneContainer] = useState("flex");
  const { restartVideo,lastTimeWacth, continueColors } = useSideBarContext()

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
      background_color={continueColors.continueBackgoundColor}
      text_color={continueColors.continueTextColor}
      isVisibleContainer={dnoneContainer}
    >
      <h2>{continueColors.message}</h2>
      <div>
        <span onClick={closeContinuar}>
          <ClickToPlay />
          <BiPlayCircle />
          {continueColors.topText}
        </span>
        
        <span onClick={restartTime}>
          <VscDebugRestart />
          {continueColors.bottonText}
        </span>
      </div>
    </Container>
  );
}
