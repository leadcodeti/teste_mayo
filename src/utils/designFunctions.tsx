import { useState } from "react";
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
    setProgessBar
  } = usePlayeContext();

  const[activeBigPlaygroung,setActivePlayground] = useState(false);
  const[activeSmalPlayground,setActiveSmalPlayground] = useState(false);
  const[displayVolume,setDisplayVolume] = useState(false);
  const[displayFullScrean,setDisplayFullScrean] = useState(false);
  const[displayProgressBar,setDisplayProgressBar] = useState(false);
  const[displayPlayTime,setDisplayPlayTime] = useState(false);
  const[displayNextBtn,setDisplayNextBtn] = useState(false);
  const[displayPrevBtn,setDisplayPrevBtn] = useState(false);


  function activeBigPlay() {
    setActivePlayground(!activeBigPlaygroung);
    setBigPlay(activeBigPlaygroung ? true : false);
  }

  function activeSmalPlay() {
    setActiveSmalPlayground(!activeSmalPlayground);
    setSmalPlay(activeSmalPlayground ? true : false);
  }

  function activeVolume() {
    setDisplayVolume(!displayVolume);
    setVolume(displayVolume ? true : false);
  }

  function activePlayTime() {
    setDisplayPlayTime(!displayPlayTime);
    setPlayTime(displayPlayTime ? true : false);
  }

  function activeFullScrean() {
    setDisplayFullScrean(!displayFullScrean);
    setFullScrean(displayFullScrean ? true : false);
  }

  function activeProgressBar() {
    setDisplayProgressBar(!displayProgressBar);
    setProgessBar(displayProgressBar ? true : false);
  }

  function activeNextBtn() {
    setDisplayNextBtn(!displayNextBtn);
    setNextBtn(displayNextBtn ? true : false);
  }

  function activePrevBtn() {
    setDisplayPrevBtn(!displayPrevBtn);
    setPrevBtn(displayPrevBtn ? true : false);
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
  
    activeBigPlaygroung,
    activeSmalPlayground,
    displayVolume,
    displayFullScrean,
    displayProgressBar,
    displayPlayTime,
    displayNextBtn,
    displayPrevBtn
  }

}