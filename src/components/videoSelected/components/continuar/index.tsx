import { useVideoContext } from "../../../../contexts/useContext";
import { Container } from "./continuar";
import { BiPlayCircle } from "react-icons/bi";
import { VscDebugRestart } from "react-icons/vsc";
import { useEffect } from "react";

export function Continuar() {
  const { continuarProps, setContinuarProps, currentVideo } = useVideoContext();
  useEffect(() => {
    continuarProps;
    setContinuarProps;
  }, [continuarProps, setContinuarProps]);

  return (
    <Container
      background_color={continuarProps.background_color}
      text_color={continuarProps.text_color}
    >
      <h2>{continuarProps.message}</h2>
      <div>
        <span>
          <BiPlayCircle />
          {continuarProps.restart_button_text}
        </span>
        <span>
          <VscDebugRestart />
          {continuarProps.restart_button_text}
        </span>
      </div>
    </Container>
  );
}
