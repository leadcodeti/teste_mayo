import { useVideoContext } from "../../../../contexts/useContext";
import { Container } from "./thumbnails";
import { ClickToPlay } from "@vime/react";
import { BsPlayCircle } from "react-icons/bs";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import Image from "next/image";

export function Thumbnails() {
  const {
    pausedVideoThumb,
    finalVideoThumb,
    thumbnailsProps,
    startVideoThumb,
  } = useVideoContext();
  const { backgroundColor } = usePlayeContext();

  return (
    <Container
      startVideo={startVideoThumb}
      pausedVideo={pausedVideoThumb}
      finishedVideo={finalVideoThumb}
    >
      {startVideoThumb ? (
        <>
          <ClickToPlay />
          <Image
            src={
              thumbnailsProps?.start_image ? thumbnailsProps.start_image : ""
            }
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

      {pausedVideoThumb && !startVideoThumb && !finalVideoThumb ? (
        <>
          <ClickToPlay />
          <Image
            src={
              thumbnailsProps?.pause_image ? thumbnailsProps.pause_image : ""
            }
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
      {finalVideoThumb ? (
        <>
          <ClickToPlay />
          <Image
            src={
              thumbnailsProps?.final_image ? thumbnailsProps.final_image : ""
            }
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
