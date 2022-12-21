import { useVideoContext } from "../../../../contexts/useContext";
import { Container } from "./thumbnails";
import { ClickToPlay } from "@vime/react";
import { BsPlayCircle } from "react-icons/bs";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import Image from "next/image";

export function Thumbnails() {
  const { pausedVideoThumb, setPausedVideoThumb, finalVideoThumb, thumbnails } =
    useVideoContext();
  const { backgroundColor } = usePlayeContext();

  return (
    <Container pausedVideo={pausedVideoThumb} finishedVideo={finalVideoThumb}>
      {pausedVideoThumb ? (
        <>
          <ClickToPlay />
          {/* <img src="/images/thumbVideo.jpg" />{" "} */}
          <Image
            src={thumbnails?.pause_image ? thumbnails.pause_image : ""}
            height={180}
            width={600}
            alt=""
          />
          <span>
            <BsPlayCircle style={{ color: backgroundColor }} />
          </span>{" "}
        </>
      ) : (
        ""
      )}
      {finalVideoThumb && !pausedVideoThumb ? (
        <>
          <ClickToPlay />
          <Image
            src={thumbnails?.final_image ? thumbnails.final_image : ""}
            height={180}
            width={600}
            alt=""
          />{" "}
          <span>
            <BsPlayCircle style={{ color: backgroundColor }} />
          </span>{" "}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
