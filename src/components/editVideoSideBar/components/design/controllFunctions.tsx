import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { getControllers } from "../../../../pages/api/get_functions";
import { ControolerTypes, videoPrppertyTypes } from "../../../../types/types";

export function DesignFunction() {

  const [bigPlay, setBigPlay] = useState(true);
  const [smalPlay, setSmalPlay] = useState(true);
  const [volume, setVolume] = useState(true);
  const [progressBar, setProgessBar] = useState(true);
  const [playTime, setPlayTime] = useState(true);
  const [fullScrean, setFullScrean] = useState(true);
  const [nextBtn, setNextBtn] = useState(true);
  const [prevBtn, setPrevBtn] = useState(true);

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