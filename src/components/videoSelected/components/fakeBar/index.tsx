import { useEffect } from "react";
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

  console.log("tempo atual do video", currentVideoTime);

  setFormatedTime((currentVideoTime / videoTime) * 100);

  const final = formatedTime * 2;

  const teste1 = videoTime;

  const teste = formatedTime / 2;

  return (
    <Container
      background_color={backgroundColor}
      height={fakeBarData.height + "px"}
      formatedTime={formatedTime}
      animation={videoTime}
      final={final}
      teste={teste}
      teste1={teste1}
      id="bar"
    >
      <div className="barra"></div>
    </Container>
  );
}
