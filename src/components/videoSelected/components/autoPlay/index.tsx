
import { useVideoContext } from "../../../../contexts/useContext";
import { useEffect, useState, useRef } from "react";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { Container, Icon_Muted } from "./autoPlay";
import { IoVolumeMuteSharp } from "react-icons/io5";

interface AutoPlayProps {
  setCurrentTime: (value: number) => void
}

export function AutoPlay({setCurrentTime} : AutoPlayProps) {
  const { setActiveAccordion, autoPlayVideo, activeAccordion, autoPlayerColors } = useSideBarContext();


  useEffect(() => {
    autoPlayVideo()
  }) 

  function unMuted() {
    setActiveAccordion ({activeAutoPlay: false })
    setCurrentTime(1)
  }

  return (
    <Container
    >
    <Icon_Muted>
      <div className="screen-video">
        <div style={{backgroundColor: `${autoPlayerColors.autoplayBackgoundColor}`}} className="screen-video-2">

          <p style={{color: `${autoPlayerColors.autoplayTextColor}`}}>{autoPlayerColors.topText}</p>

         <IoVolumeMuteSharp color={autoPlayerColors.autoplayTextColor} onClick={unMuted} size={70} />

         <p style={{color: `${autoPlayerColors.autoplayTextColor}`}}>{autoPlayerColors.bottonText}</p>
        </div>
     </div> 
    </Icon_Muted>
    </Container>
  );
}
