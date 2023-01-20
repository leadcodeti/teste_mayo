import { usePlayeContext } from "../../../../contexts/usePlayerContext";

export function DesignFunction() {

  const { 
    bigPlay,
    nextBtn,
    playTime,
    fullScrean,
    prevBtn,
    progressBar,
    volume,
    smalPlay,

    setBigPlay,
    setFullScrean,
    setNextBtn,
    setPlayTime,
    setPrevBtn,
    setProgessBar,
    setSmalPlay,
    setVolume
  } = usePlayeContext()


  function activeBigPlay() {
    setBigPlay({
      isActive: !bigPlay.isActive
    })
  }

  function activeSmalPlay() {
    setSmalPlay({
      isActive: !smalPlay.isActive
    });
  }

  function activeVolume() {
    setVolume({
      isActive: !volume.isActive
    });
  }

  function activePlayTime() {
    setPlayTime({
      isActive: !playTime.isActive
    });
  }

  function activeFullScrean() {
    setFullScrean({
      isActive: !fullScrean.isActive
    });
  }

  function activeProgressBar() {
    setProgessBar({
      isActive: !progressBar.isActive
    });
  }

  function activeNextBtn() {
    setNextBtn({
      isActive: !nextBtn.isActive
    });
  }

  function activePrevBtn() {
    setPrevBtn({
      isActive: !prevBtn.isActive
    });
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

    bigPlay,
    nextBtn,
    playTime,
    prevBtn,
    fullScrean,
    smalPlay,
    volume,
    progressBar,
  }

}