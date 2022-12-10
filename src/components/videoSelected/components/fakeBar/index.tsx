import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { Container } from "./fakeBar";

export function FakeBarInVideo() {
  const { fakeBarData } = useVideoContext();
  const { backgroundColor } = usePlayeContext();
  return (
    <Container
      background_color={backgroundColor}
      height={fakeBarData.height + "px"}
    ></Container>
  );
}
