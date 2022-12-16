import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { useVideoContext } from "../../../../contexts/useContext";
import { Container, VideoPlayingMuted } from "./autoPlay";

export function AutoPlay() {
  const { register, watch } = useForm();
  const { autoPLayProps, setAutoPlayProps, autoPlayIsVisible, videosId } =
    useVideoContext();

  function hexToRGB(hex: any, alpha: any) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  //

  useEffect(() => {
    autoPLayProps;
    setAutoPlayProps;
  }, [autoPLayProps, setAutoPlayProps]);

  return (
    <Container>
      <video src="video-teste.mp4" muted autoPlay loop></video>
      <VideoPlayingMuted
        onClick={() => autoPlayIsVisible()}
        text_color={autoPLayProps.text_color}
        background={hexToRGB(autoPLayProps.background_color, 0.9)}
      >
        <span className="textTop">{autoPLayProps.top_text}</span>
        <span>
          <BsFillVolumeMuteFill color={autoPLayProps.text_color} />
        </span>
        <span className="textFooter">{autoPLayProps.bottom_text}</span>
      </VideoPlayingMuted>
    </Container>
  );
}
