import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { api } from "../../../../services/api";
import { videoPrppertyTypes } from "../../../../types/types";
import { DesignFunction } from "../../../../utils/designFunctions";
import styles from "./styles.module.scss";

export function Design() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<videoPrppertyTypes>();
  const { backgroundColor,setBackgroundColor,} = usePlayeContext();
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
  
    activeBigPlaygroung,
    activeSmalPlayground,
    displayVolume,
    displayFullScrean,
    displayProgressBar,
    displayPlayTime,
    displayNextBtn,
    displayPrevBtn
  } = DesignFunction();
  const { currentVideo } = useVideoContext();

  const onSubmit: SubmitHandler<videoPrppertyTypes> = data => {
      if (data) {

        const newDesignData = {
          background_color: data.backgroundColor,
        }

        const newControlersData = {
          has_big_play_button: data.activeBigPlaygroung,
          has_small_play_button: data.activeSmalPlayground,
          has_progress_bar: data.displayProgressBar,
          has_video_duration: data.displayPlayTime,
          has_back_10_seconds: data.displayPrevBtn,
          has_foward_10_seconds: data.displayNextBtn,
          has_volume: data.displayVolume,
          has_fullscreen: data.displayFullScrean,
        }

        const res=api.put(`/designs/${videosId.currentVideoId}`,newDesignData)
        console.log(res)
        api.put(`/controls/${videosId.currentVideoId}`,newControlersData)

      }
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.design}>
        <span>
          <label htmlFor="corBackground">Cor background</label>{" "}
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
        <span>
          <label htmlFor="botaoPlayGrande">Botão play grande</label>
          <input
            id="botaoPlayGrande"
            {...register("activeBigPlaygroung")}
            checked={!activeBigPlaygroung}
            type="checkbox"
           onClick={activeBigPlay}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayPequeno">Botão play pequeno</label>
          <input id="botaoPlayPequeno"  
             {...register("activeSmalPlayground")}
            checked={!activeSmalPlayground}
            type="checkbox"
            onClick={activeSmalPlay}  />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Barra de progresso</label>
          <input id="botaoPlayGrande"
            {...register("displayProgressBar")}
             checked={!displayProgressBar}
             type="checkbox"
             onClick={activeProgressBar}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Tempo de vídeo</label>
          <input id="botaoPlayGrande" 
           {...register("displayPlayTime")}
             checked={!displayPlayTime}
             type="checkbox"
             onClick={activePlayTime}
          />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Voltar 10s</label>
          <input id="botaoPlayGrande" 
           {...register("displayPrevBtn")}
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
            {...register("displayVolume")}  
            checked={!displayVolume}
            type="checkbox"
            onClick={activeVolume}
           />
        </span>

        <span>
          <label htmlFor="botaoPlayGrande">Fullscreen</label>
          <input id="botaoPlayGrande" 
            {...register("displayFullScrean")}  
             checked={!displayFullScrean}
             type="checkbox"
             onClick={activeFullScrean}
          />
        </span>
        <div className={styles.saveOrCancel}>
          <button>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
  );
}
