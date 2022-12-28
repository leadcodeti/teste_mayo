import { usePlayeContext } from "../contexts/usePlayerContext";

export function DesignFunction() {

  const {
    setBigPlay,
    setFullScrean,
    setPlayTime,
    setSmalPlay,
    setVolume,
    setNextBtn,
    setPrevBtn,
    setProgessBar,
    bigPlay,
    nextBtn,
    playTime,
    prevBtn,
    fullScrean,
    smalPlay,
    volume,
    progressBar
  } = usePlayeContext();

  function activeBigPlay() {
    setBigPlay(!bigPlay);
  }

  function activeSmalPlay() {
    setSmalPlay(!smalPlay);
  }

  function activeVolume() {
    setVolume(!volume);
  }

  function activePlayTime() {
    setPlayTime(!playTime);
  }

  function activeFullScrean() {
    setFullScrean(!fullScrean);
  }

  function activeProgressBar() {
    setProgessBar(!progressBar);
  }

  function activeNextBtn() {
    setNextBtn(!nextBtn);
  }

  function activePrevBtn() {
    setPrevBtn(!prevBtn);
  }

  return { 
    activeSmalPlay,
    activeVolume,
    activePlayTime,
    activeFullScrean,
    activeProgressBar,
    activeNextBtn,
    activePrevBtn,
    activeBigPlay,
  }

}