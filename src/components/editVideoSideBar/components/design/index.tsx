import { useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UseMutateAsyncFunction, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useVideoContext } from "../../../../contexts/useContext";
import { usePlayeContext } from "../../../../contexts/usePlayerContext";
import { PutControllersTypes, PutDesignTypes } from "../../../../pages/api/post_put_functions";
import { api } from "../../../../services/api";
import { BackgroundProps, ControllerProps } from "../../../../types/types";
import { DesignFunction } from "./controllFunctions";
import { InputsController } from "./inputsControllers";
import styles from "./styles.module.scss";

interface DesignProps {
  design: BackgroundProps | undefined;
  designMutation: UseMutateAsyncFunction<BackgroundProps | undefined, unknown, PutDesignTypes, unknown>;
  controllersMutation: UseMutateAsyncFunction<PutControllersTypes | undefined, unknown, PutControllersTypes, unknown>
}

export function Design({ design,designMutation, controllersMutation }:DesignProps) {

  const methods = useForm<ControllerProps>();

  const { backgroundColor, setBackgroundColor } = usePlayeContext();

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


  const onSubmit: SubmitHandler<ControllerProps> = async (data) => {

    const currentVideoId = videosId.currentVideoId
    if (data) {
       
      if(currentBackgroundColor) {
        const newDesignData = {
          background_color: currentBackgroundColor,
        };
        //put background function:
       await designMutation({newDesignData,currentVideoId})
        
      } else if(!currentBackgroundColor) {
        const newDesignData = {
          background_color: newBackgroundColor,
        };
        await designMutation({newDesignData,currentVideoId})
      }

      const newControlersData = {
        has_big_play_button: bigPlay.isActive,
        has_small_play_button: smalPlay.isActive,
        has_progress_bar: progressBar.isActive,
        has_video_duration: playTime.isActive,
        has_back_10_seconds: prevBtn.isActive,
        has_foward_10_seconds: nextBtn.isActive,
        has_volume: volume.isActive,
        has_fullscreen: fullScrean.isActive,
      };
      
       //put controll function:
      await controllersMutation({newControlersData,currentVideoId})
          
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
         checked={bigPlay?.isActive}
         handleClick={activeBigPlay} 
         inputText="Botão play grande"  
        />

        <InputsController 
         checked={smalPlay?.isActive}
         handleClick={activeSmalPlay} 
         inputText="Botão play pequeno"  
        />

        <InputsController 
         checked={progressBar?.isActive}
         handleClick={activeProgressBar} 
         inputText="Barra de progresso"  
        />

        <InputsController 
         checked={playTime?.isActive}
         handleClick={activePlayTime} 
         inputText="Tempo de vídeo"  
        />

        <InputsController 
         checked={prevBtn?.isActive}
         handleClick={activePrevBtn} 
         inputText="Voltar 10s"  
       />

        <InputsController 
         checked={nextBtn?.isActive}
         handleClick={activeNextBtn} 
         inputText="Avançar 10s"  
       />

       <InputsController 
         checked={volume?.isActive}
         handleClick={activeVolume} 
         inputText="volume"  
       />

        <InputsController 
         checked={fullScrean?.isActive}
         handleClick={activeFullScrean} 
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
