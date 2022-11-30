import { SetStateAction, useState } from "react";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import styles from "./styles.module.scss";

export function Design() {
  const {
    backgroundColor,
    setBackgroundColor,
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
  const[activSmalPlayground,setActiveSmalPlayground] = useState(false);
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
    setActiveSmalPlayground(!activSmalPlayground);
    setSmalPlay(activSmalPlayground ? true : false);
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


  return (
    <>
      <div className={styles.design}>
        <span>
          <label htmlFor="corPrincipal">Cor principal</label>{" "}
          <input
            className={styles.colors}
            type="color"
            id="corPrincipal"
            value="#ffffff"
          />
        </span>
        <br />
        <span>
          <label htmlFor="corBackground">Cor background</label>{" "}
          <input
            className={styles.colors}
            type="color"
            id="corBackground"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </span>
      </div>
      <div className={styles.controls}>
        <p>Controles</p>
        <span>
          <label htmlFor="botaoPlayGrande">Botão play grande</label>
          <input
            id="botaoPlayGrande"
            checked={!activeBigPlaygroung}
            type="checkbox"
           onClick={activeBigPlay}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayPequeno">Botão play pequeno</label>
          <input id="botaoPlayPequeno"  
            checked={!activSmalPlayground}
            type="checkbox"
            onClick={activeSmalPlay}  />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Barra de progresso</label>
          <input id="botaoPlayGrande"
             checked={!displayProgressBar}
             type="checkbox"
             onClick={activeProgressBar}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Tempo de vídeo</label>
          <input id="botaoPlayGrande" 
             checked={!displayPlayTime}
             type="checkbox"
             onClick={activePlayTime}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Voltar 10s</label>
          <input id="botaoPlayGrande" 
            checked={!displayPrevBtn}
            type="checkbox"
            onClick={activePrevBtn}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Avançar 10s</label>
          <input id="botaoPlayGrande" 
            checked={!displayNextBtn}
            type="checkbox"
            onClick={activeNextBtn}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Volume</label>
          <input id="botaoPlayGrande"   
            checked={!displayVolume}
            type="checkbox"
            onClick={activeVolume}
           />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Fullscreen</label>
          <input id="botaoPlayGrande" 
             checked={!displayFullScrean}
             type="checkbox"
             onClick={activeFullScrean}
          />
        </span>
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button>Salvar</button>
        </div>
      </div>
    </>
  );
}
