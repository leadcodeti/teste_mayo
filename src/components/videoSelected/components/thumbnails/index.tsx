/* eslint-disable @next/next/no-img-element */
import { useVideoContext } from "../../../../contexts/useContext";
import { Container } from "./thumbnails";
import { ClickToPlay } from "@vime/react";
import { BsPlayCircle } from "react-icons/bs";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import Image from "next/image";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { useEffect } from "react";


export function Thumbnails() {
  const {pausedVideoThumb,finalVideoThumb,startVideoThumb,  setCurrentVideoTime,
    setPausedVideoThumb,setFinalVideoThumb,setStartVideoThumb, } = useVideoContext();

  const { backgroundColor } = usePlayeContext();
  const { thumbnailsProps, playerRef } = useSideBarContext()

  useEffect(() => {
    setCurrentVideoTime(playerRef.current?.currentTime);
  
    let finalThumb = playerRef.current?.currentTime == playerRef.current?.duration;
  
    setPausedVideoThumb(
      playerRef.current?.paused && playerRef.current?.currentTime > 1
    );
    setFinalVideoThumb(finalThumb);
    setStartVideoThumb(playerRef.current?.currentTime == 0);
  
   })
  

  return (
    <Container
      startVideo={startVideoThumb}
      pausedVideo={pausedVideoThumb}
      finishedVideo={finalVideoThumb}
    >
      {startVideoThumb ? (
        <>
          <ClickToPlay />

          {thumbnailsProps.start_image && (
            <>
              <Image
                src={thumbnailsProps?.start_image}
                height={180}
                width={600}
                alt=""
              />
              <span>
                <BsPlayCircle style={{ color: backgroundColor }} />
              </span>{" "}
            </>
          )}
        </>
      ) : (
        ""
      )}

      {pausedVideoThumb && !startVideoThumb && !finalVideoThumb ? (
        <>
          <ClickToPlay />
          {thumbnailsProps.pause_image && (
            <>
              <Image
                src={thumbnailsProps?.pause_image}
                height={180}
                width={600}
                alt=""
              />
              <span>
                <BsPlayCircle style={{ color: backgroundColor }} />
              </span>{" "}
            </>
          )}
        </>
      ) : (
        ""
      )}
      {finalVideoThumb ? (
        <>
          <ClickToPlay />
          {thumbnailsProps.final_image && (
            <>
              <Image
                src={thumbnailsProps?.final_image}
                height={180}
                width={600}
                alt=""
              />
              <span>
                <BsPlayCircle style={{ color: backgroundColor }} />
              </span>{" "}
            </>
          )}
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
