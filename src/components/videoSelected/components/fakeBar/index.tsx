import { useEffect, useState } from "react";
import { useSideBarContext } from "../../../../contexts/thirdContext";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { Container } from "./fakeBar";

export function FakeBarInVideo() {
  const {
    fakeBarData,
    currentVideoTime,
    videoTime,
    formatedTime,
    setFormatedTime,
  } = useVideoContext();
  const { backgroundColor } = usePlayeContext();
  const { currentTimeVideo } = useSideBarContext()
  setFormatedTime((currentVideoTime / videoTime) * 100);

  const [counter,setCounter] = useState(10);

  const conditionDelay = (videoTime * 50) / 100;

  useEffect(() => {

   if(currentTimeVideo === 0){
     setCounter(0)
   }
   if(currentTimeVideo > 0){
    setCounter(videoTime)
  }

  },[ currentTimeVideo, videoTime])

  // function reset_animation() {
  //   var el = document.getElementById('bar');
  //    el.style.animation = 'none';
  //    el.offsetHeight; /* trigger reflow */
  //    el.style.animation = null; 
  // }

  return (
    <>
         <Container
      background_color={backgroundColor}
      height={fakeBarData.height + "px"}
      formatedTime={currentTimeVideo}
      animation={counter}
      condictionDalay={conditionDelay}
      id="bar"
    >
      <div className="barra"></div>

      {/* <button onClick={() => reset_animation()}>
        testar
      </button> */}
    </Container>
    </>
  );
}
