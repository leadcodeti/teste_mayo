import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { api } from "../../../../services/api";
import { videoPrppertyTypes } from "../../../../types/types";
import { DesignFunction } from "../../../../utils/designFunctions";
import styles from "./styles.module.scss";

export function Design() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<videoPrppertyTypes>();
  const { backgroundColor, 
          setBackgroundColor,bigPlay,
          fullScrean,playTime,nextBtn,progressBar,
          prevBtn,smalPlay,volume,getControls,getDesign } = usePlayeContext();
  const { videosId } = useVideoContext();
  const {
    activeSmalPlay,
    activeVolume,
    activePlayTime,
    activeFullScrean,
    activeProgressBar,
    activeNextBtn,
    activePrevBtn,
    activeBigPlay,
  } = DesignFunction();
  const { currentVideo } = useVideoContext();

  const onSubmit: SubmitHandler<videoPrppertyTypes> = (data) => {
    if (data) {
      const newDesignData = {
        background_color: data.backgroundColor,
      };

      const newControlersData = {
        has_big_play_button: data.activeBigPlaygroung,
        has_small_play_button: data.activeSmalPlayground,
        has_progress_bar: data.displayProgressBar,
        has_video_duration: data.displayPlayTime,
        has_back_10_seconds: data.displayPrevBtn,
        has_foward_10_seconds: data.displayNextBtn,
        has_volume: data.displayVolume,
        has_fullscreen: data.displayFullScrean,
      };
      // getControls();
      // getDesign()

      const res = api.put(`/designs/${videosId.currentVideoId}`, newDesignData);
      console.log(res);

      const res1 = api.put(`/controls/${videosId.currentVideoId}`, newControlersData);
      console.log(res1);
      
      console.log("DATA1:", res1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.design}>
        <span>
          <label htmlFor="corBackground">Cor background</label>
          <input
            className={styles.colors}
            type="color"
            id="corBackground"
            value={backgroundColor}
            {...register("backgroundColor")}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </span>
      </div>

      <div className={styles.controls}>
        <p>Controles</p>

        <label className={styles.checkContainer}>
          <input
            id="botaoPlayGrande"
            {...register("activeBigPlaygroung")}
            checked={bigPlay}
            type="checkbox"
            onClick={activeBigPlay}
          />
          <span className={styles.checkmark}></span>
          <p>Botão play grande</p>
        </label>

        <label className={styles.checkContainer}>
          <input
            id="botaoPlayPequeno"
            {...register("activeSmalPlayground")}
            checked={smalPlay}
            type="checkbox"
            onClick={activeSmalPlay}
          />
          <span className={styles.checkmark}></span>
          <p>Botão play pequeno</p>
        </label>

        <label className={styles.checkContainer}>
          <input
            id="botaoProgressBar"
            {...register("displayProgressBar")}
            checked={progressBar}
            type="checkbox"
            onClick={activeProgressBar}
          />
          <span className={styles.checkmark}></span>
          <p>Barra de progresso</p>
        </label>

        <label className={styles.checkContainer}>
          <input
            id="botaoDisplayTime"
            {...register("displayPlayTime")}
            checked={playTime}
            type="checkbox"
            onClick={activePlayTime}
          />
          <span className={styles.checkmark}></span>
          <p>Tempo de vídeo</p>
        </label>

        <label className={styles.checkContainer}>
          <input
            id="botaoPrev"
            {...register("displayPrevBtn")}
            checked={prevBtn}
            type="checkbox"
            onClick={activePrevBtn}
          />
          <span className={styles.checkmark}></span>
          <p>Voltar 10s</p>
        </label>

        <label className={styles.checkContainer}>
          <input
            id="botaoNext"
            {...register("displayNextBtn")}
            checked={nextBtn}
            type="checkbox"
            onClick={activeNextBtn}
          />
          <span className={styles.checkmark}></span>
          <p>Avançar 10s</p>
        </label> 

        <label className={styles.checkContainer}>
          <input
            id="botaoVolume"
            {...register("displayVolume")}
            checked={volume}
            type="checkbox"
            onClick={activeVolume}
          />
          <span className={styles.checkmark}></span>
          <p>Volume</p>
        </label>

        <label className={styles.checkContainer}>
          <input
            id="botaoFullScrean"
            {...register("displayFullScrean")}
            checked={fullScrean}
            type="checkbox"
            onClick={activeFullScrean}
          />
          <span className={styles.checkmark}></span>
          <p>Fullscreen</p>
        </label>

        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
}
