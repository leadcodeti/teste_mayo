import { useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UseMutateAsyncFunction, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { PutDesignTypes } from "../../../../pages/api/post_put_functions";
import { api } from "../../../../services/api";
import { BackgroundProps, ControllsTypes} from "../../../../types/types";
import { DesignFunction } from "./controllFunctions";
import { InputsController } from "./inputsControllers";
import styles from "./styles.module.scss";

interface DesignProps {
  design: BackgroundProps | undefined;
  designMutation: UseMutateAsyncFunction<BackgroundProps | undefined, unknown, PutDesignTypes, unknown>
}

export function Design({ design,designMutation }:DesignProps) {

  const methods = useForm<ControllsTypes>();

  const { backgroundColor, setBackgroundColor, controller} = usePlayeContext();

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

    bigPlay,
    nextBtn,
    playTime,
    prevBtn,
    fullScrean,
    smalPlay,
    volume,
    progressBar,
  } = DesignFunction();

  const [currentBackgroundColor, setCurrentBackgroundColor] = useState("");
  const [newBackgroundColor, setnewBackgroundColor] = useState<string | undefined>("");
  const colorRef = useRef<HTMLInputElement>(null);

  console.log("CONTROLLER_2", controller);

  function backgroundHandleClick() {
    colorRef.current?.click();
  }

  useEffect(() => {

    setnewBackgroundColor(design?.background_color);
  
    if (currentBackgroundColor) {
      setBackgroundColor(currentBackgroundColor);
    } else {
      setBackgroundColor(newBackgroundColor);
    }
  }, [currentBackgroundColor, design?.background_color, newBackgroundColor, setBackgroundColor]);


  const onSubmit: SubmitHandler<ControllsTypes> = async (data) => {

    const currentVideoId = videosId.currentVideoId
    if (data) {
       
      if(currentBackgroundColor) {
        const newDesignData = {
          background_color: currentBackgroundColor,
        };
       await designMutation({newDesignData,currentVideoId})
        
      } else if(!currentBackgroundColor) {
        const newDesignData = {
          background_color: newBackgroundColor,
        };
        await designMutation({newDesignData,currentVideoId})
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
      };
          
      api.put(`/controls/${videosId.currentVideoId}`, newControlersData);
      toast.success("Alterações salvas!")
    }
  };

  return (
    <FormProvider {...methods}>
       <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div className={styles.design}>
        <label>Cor background</label>
        <label
          className={styles.inputColor}
          style={{ background: `${backgroundColor}` }}
          onClick={backgroundHandleClick}
        ></label>

        <div className={styles.inputDisabled}>
          <input
            className={styles.colors}
            type="color"
            ref={colorRef}
            value={backgroundColor}
            onChange={(e) => setCurrentBackgroundColor(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <p>Controles</p>

        <InputsController 
         checked={bigPlay ? controller.bigPlay : bigPlay}
         handleClick={activeBigPlay} 
         inputName="activeBigPlaygroung" 
         inputText="Botão play grande"  
        />

        <InputsController 
         checked={smalPlay ? controller.smalPlay : bigPlay}
         handleClick={activeSmalPlay} 
         inputName="activeSmalPlayground" 
         inputText="Botão play pequeno"  
        />

        <InputsController 
         checked={controller.progressBar}
         handleClick={activeProgressBar} 
         inputName="displayProgressBar" 
         inputText="Barra de progresso"  
        />

        <InputsController 
         checked={controller.playTime}
         handleClick={activePlayTime} 
         inputName="displayPlayTime" 
         inputText="Tempo de vídeo"  
        />

        <InputsController 
         checked={controller.prevBtn}
         handleClick={activePrevBtn} 
         inputName="displayPrevBtn" 
         inputText="Voltar 10s"  
       />

        <InputsController 
         checked={controller.nextBtn}
         handleClick={activeNextBtn} 
         inputName="displayNextBtn" 
         inputText="Avançar 10s"  
       />

       <InputsController 
         checked={controller.volume}
         handleClick={activeVolume} 
         inputName="displayVolume" 
         inputText="volume"  
       />

        <InputsController 
         checked={controller.fullScrean}
         handleClick={activeFullScrean} 
         inputName="displayFullScrean" 
         inputText="Fullscreen"  
        />
      
        <div className={styles.saveOrCancel}>
          <button type="reset">Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </div>
    </form>
    </FormProvider>
   
  );
}
